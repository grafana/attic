define([
  'angular',
  'lodash',
  'kbn',
  'moment'
],
function (angular, _, kbn) {
  'use strict';

  var module = angular.module('grafana.services');

  module.factory('ZabbixAPIDatasource', function($q, $http, templateSrv) {
    function ZabbixAPIDatasource(datasource) {
      this.name             = datasource.name;
      this.type             = 'ZabbixAPIDatasource';
      this.supportMetrics   = true;
      this.url              = datasource.url;
      this.auth             = datasource.auth;
      // TODO user/pass auth to get token

      this.partials = datasource.partials || 'plugins/grafana-plugins/datasources/zabbix';
      this.editorSrc = this.partials + '/editor.html';
    }


    ZabbixAPIDatasource.prototype.query = function(options) {
      // get from & to in seconds
      var from = kbn.parseDate(options.range.from).getTime();
      var to = kbn.parseDate(options.range.to).getTime();
      var items = _.indexBy(options.targets, 'itemid')

      from = Math.ceil(from/1000);
      to = Math.ceil(to/1000);

      return this.performTimeSeriesQuery(_.keys(items), from, to)
        .then(_.bind(function (response) {

          // Response should be in the format:
          //[{
          //  target: "Metric name",
          //  datapoints: [[<value>, <unixtime>], ...]
          //},]

          return {
            data: _.map(
              // Index returned datapoints by item/metric id
              _.groupBy(response.data.result, function (p) { return p.itemid }),
                // Foreach itemid index: iterate over the data points and
                //  normalize to Grafana response format.
                function (i, id) {
                  return {
                    // Lookup itemid:alias map
                    target: items[id].alias,
                    datapoints: _.map(i, function (p) { return [p.value, p.clock*1000];})
                  };
              })
          };
        },options));
    };

    ZabbixAPIDatasource.prototype.performTimeSeriesQuery = function(items, start, end) {
      var options = {
        method: 'POST',
        url: this.url + '',
        data: {
          jsonrpc: '2.0',
          method: 'history.get',
          params: {
              output: 'extend',
              history: 0, // TODO this needs to be exposed
              itemids: items,
              sortfield: 'clock',
              sortorder: 'DESC',
              limit: 1000, // Where do he defaults for this come from?
              time_from: start,
          },
          auth: this.auth,
          id: 1
        },
      };
      // Relative queries (e.g. last hour) don't include an end time
      if (end) {
        options.data.params.time_till = end;
      }

      return $http(options);
    };

    return ZabbixAPIDatasource;
  });
});
