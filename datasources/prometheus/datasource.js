define([
  'angular',
  'lodash',
  'kbn',
  'moment',
  './queryCtrl',
],
function (angular, _, kbn) {
  'use strict';

  var module = angular.module('grafana.services');

  module.factory('PrometheusDatasource', function($q, $http, templateSrv) {

    function PrometheusDatasource(datasource) {
      this.type = 'prometheus';
      this.editorSrc = 'app/features/prometheus/partials/query.editor.html';
      this.url = datasource.url;
      this.name = datasource.name;
      this.supportMetrics = true;
    }

    // Called once per panel (graph)
    PrometheusDatasource.prototype.query = function(options) {
      var end = convertToPrometheusTime(options.range.to);
      var range = convertToPrometheusRange(options.range.from, options.range.to);

      var queries = [];
      var groupByLabels = {};
      _.each(options.targets, function(target) {
        if (!target.expr || target.hide) {
          return;
        }

        var query = {};
        query.expr = templateSrv.replace(target.expr);

        var maxDataPoints = parseInt(options.maxDataPoints, 10);
        if (_.isNaN(maxDataPoints)) {
          throw "max data points is not number";
        }
        query.maxDataPoints = maxDataPoints;

        queries.push(query);
        groupByLabels = _.extend(groupByLabels, target.labels);
      });

      // No valid targets, return the empty result to save a round trip.
      if (_.isEmpty(queries)) {
        var d = $q.defer();
        d.resolve({ data: [] });
        return d.promise;
      }

      var allQueryPromise = _.map(queries, _.bind(function(query) {
        return this.performTimeSeriesQuery(query, range, end);
      }, this));

      return $q.all(allQueryPromise)
        .then(function(allResponse) {
          var result = [];

          _.each(allResponse, function(response, index) {
            if (response.data.type === "error") {
              throw response.data.value;
            }

            _.each(response.data.value, function(metricData) {
              result.push(transformMetricData(metricData, groupByLabels, options.targets[index]));
            });
          });

          return { data: result };
        });
    };

    PrometheusDatasource.prototype.performTimeSeriesQuery = function(query, range, end) {
      var url = this.url + '/api/query_range?expr=' + encodeURIComponent(query.expr) + '&range=' + range + '&end=' + end;

      var step = Math.ceil(range / query.maxDataPoints);
      // Prometheus drop query if range/step > 11000
      // calibrate step if it is too big
      if (step !== 0 && range / step > 11000) {
        step = Math.floor(range / 11000);
      }
      url += '&step=' + step;

      var options = {
        method: 'GET',
        url: url,
      };

      return $http(options);
    };

    PrometheusDatasource.prototype.performSuggestQuery = function(query) {
      var options = {
        method: 'GET',
        url: this.url + '/api/metrics',
      };

      return $http(options).then(function(result) {
        var suggestData = _.filter(result.data, function(metricName) {
          return metricName.indexOf(query) !==  1;
        });

        return suggestData;
      });
    };

    function transformMetricData(md, groupByLabels, options) {
      var dps = [],
          metricLabel = null;

      var metricName = md.metric.__name__;
      var labelData = md.metric;
      delete labelData.__name__;

      metricLabel = createMetricLabel(metricName, labelData, options);

      dps = _.map(md.values, function(value) {
        return [parseInt(value[1]), value[0] * 1000];
      });

      return { target: metricLabel, datapoints: dps };
    }

    function createMetricLabel(metricName, labelData, options) {
      if (_.isUndefined(options) || _.isEmpty(options.alias)) {
        var labelPart = _.map(_.pairs(labelData), function(label) {
          return label[0] + '="' + label[1] + '"';
        }).join(',');
        return metricName + '{' + labelPart + '}';
      }

      var originalSettings = _.templateSettings;
      _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
      };

      var template = _.template(options.alias);
      metricName = template(labelData);

      _.templateSettings = originalSettings;

      return metricName;
    }

    function convertToPrometheusRange(from, to) {
      return Math.floor(convertToPrometheusTime(to) - convertToPrometheusTime(from));
    }

    function convertToPrometheusTime(date) {
      date = kbn.parseDate(date);
      return date.getTime() / 1000;
    }

    return PrometheusDatasource;
  });

});
