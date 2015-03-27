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
      var queries = ""; // Derive from: options.targets, look at: convertTargetToQuery

      from = Math.ceil(from/1000);
      to = Math.ceil(to/1000);

      return this.performTimeSeriesQuery(queries, from, to)
        .then(_.bind(function (response) {
          return {data: [{datapoints: _.map(response.data.result, function (p) { return [p.value, p.clock*1000];}), target: "I1"}]};
        },options));
    };

    ZabbixAPIDatasource.prototype.performTimeSeriesQuery = function(queries, start, end) {
      var reqBody = {
        jsonrpc: '2.0',
        method: 'history.get',
        params: {
            output: 'extend',
            history: 0,
            itemids: 683,
            sortfield: 'clock',
            sortorder: 'DESC',
            limit: 1000,
            time_from: start,
        },
        auth: this.auth,
        id: 1
      };

      // Relative queries (e.g. last hour) don't include an end time
      if (end) {
        reqBody.params.time_till = end;
      }

      var options = {
        method: 'POST',
        url: this.url + '',
        data: reqBody
      };

      return $http(options);
    };

    return ZabbixAPIDatasource;
  });
});
