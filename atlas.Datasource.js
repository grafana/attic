define([
  'angular',
  'lodash',
  'kbn'
],
function (angular, _, kbn) {
  'use strict';

  var module = angular.module('grafana.services');

  module.factory('AtlasDatasource', function($q, $http) {

    function AtlasDatasource(datasource) {
      this.name = datasource.name;
      this.type = 'AtlasDatasource';
      this.url = datasource.url;
      this.supportMetrics = true;
      this.minimumInterval = datasource.minimumInterval || 1000;
    }

    AtlasDatasource.prototype.query = function(options) {
      var deferred = $q.defer();

      // Atlas can take multiple concatenated stack queries
      var fullQuery = _.pluck(options.targets, 'query').join(',');

      var interval = options.interval;

      if (kbn.interval_to_ms(interval) < this.minimumInterval) {
        interval = kbn.secondsToHms(this.minimumInterval / 1000);
      }

      var params = {
        q: fullQuery,
        step: interval,
        s: options.range.from,
        e: options.range.to,
        format: options.format
      };

      var httpOptions = {
        method: 'GET',
        url:    this.url + '/api/v1/graph',
        params: params,
        inspect: { type: 'atlas' }
      };

      // Note: while Atlas supports PNGs, Grafana can only provide graphite-specific dimension params
      // See https://github.com/grafana/grafana/issues/1273 for status
      if (options.format === "png") {
        var encodedParams = _.map(httpOptions.params, function (v, k) {
          return [k, encodeURIComponent(v)].join("=");
        });
        deferred.resolve(httpOptions.url + "?" + encodedParams.join("&"));
      } else {
        $http(httpOptions).success(function (data) {
          deferred.resolve({
            data: makeTimeSeries(data)
          });
        });
      }



      return deferred.promise;
    };

    function makeTimeSeries (result) {
      return _.map(result.legend, function (legend, index) {
        var series = {target: legend, datapoints: []};
        var values = _.pluck(result.values, index);

        for (var i = 0; i < values.length; i++) {
          var value = values[i];
          var timestamp = result.start + (i * result.step);
          series.datapoints.push([value, timestamp]);
        }

        return series;
      });
    }

    return AtlasDatasource;
  });
});
