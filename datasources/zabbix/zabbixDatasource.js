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
      this.username         = datasource.username;
      this.password         = datasource.password;
      this.limitmetrics     = datasource.limitmetrics || 5000;

      this.partials = datasource.partials || 'plugins/datasources/zabbix';
      this.editorSrc = this.partials + '/editor.html';

      this.annotationEditorSrc = this.partials + '/annotation_editor.html';
      this.supportAnnotations = true;

      // Get authentication token
      var authRequestData = {
        jsonrpc: '2.0',
        method: 'user.login',
        params: {
            user: this.username,
            password: this.password
        },
        auth: null,
        id: 1
      };
      var zabbixDataSource = this;
      $http.post(this.url, authRequestData)
        .then(function (response) {
          zabbixDataSource.auth = response.data.result;
        });
    }


    ///////////////////////////////////////////////////////////////////////
    /// Query methods
    ///////////////////////////////////////////////////////////////////////


    ZabbixAPIDatasource.prototype.query = function(options) {
      // get from & to in seconds
      var from = kbn.parseDate(options.range.from).getTime();
      var to = kbn.parseDate(options.range.to).getTime();

      var targetsDefined = options.targets.every(function (target, index, array) {
        return target.item;
      });
      var targets = {};
      if (targetsDefined) {
        var targets = _.indexBy(options.targets, function (target) {
          return target.item.itemid;
        });
      } else {

        // TODO: return empty dataset if targets undefined
        return {};
      }

      from = Math.ceil(from/1000);
      to = Math.ceil(to/1000);

      return this.performTimeSeriesQuery(_.values(targets), from, to)
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
                    //target: items[id].alias,
                    target: targets[id].alias,
                    datapoints: _.map(i, function (p) { return [p.value, p.clock*1000];})
                  };
              })
          };
        },options));
    };


    ZabbixAPIDatasource.prototype.performTimeSeriesQuery = function(targets, start, end) {
      var item_ids = targets.map(function (target, index, array) {
        return target.item.itemid;
      });
      var hystory_type = targets.pop().item.value_type;
      var options = {
        method: 'POST',
        url: this.url,
        data: {
          jsonrpc: '2.0',
          method: 'history.get',
          params: {
              output: 'extend',
              history: hystory_type,
              itemids: item_ids,
              sortfield: 'clock',
              sortorder: 'DESC',
              limit: this.limitmetrics,
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


    // Get the list of host groups
    ZabbixAPIDatasource.prototype.performHostGroupSuggestQuery = function() {
      var options = {
        url : this.url,
        method : 'POST',
        data: {
          jsonrpc: '2.0',
          method: 'hostgroup.get',
          params: {
            output: ['name'],
            sortfield: 'name'
          },
          auth: this.auth,
          id: 1
        },
      };
      return $http(options).then(function (result) {
        if (!result.data) {
          return [];
        }
        return result.data.result;
      });
    };


    // Get the list of hosts
    ZabbixAPIDatasource.prototype.performHostSuggestQuery = function(groupid) {
      var options = {
        url : this.url,
        method : 'POST',
        data: {
          jsonrpc: '2.0',
          method: 'host.get',
          params: {
            output: ['name'],
            sortfield: 'name'
          },
          auth: this.auth,
          id: 1
        },
      };
      if (groupid) {
        options.data.params.groupids = groupid;
      }
      return $http(options).then(function (result) {
        if (!result.data) {
          return [];
        }
        return result.data.result;
      });
    };


    // Get the list of applications
    ZabbixAPIDatasource.prototype.performAppSuggestQuery = function(hostid) {
      var options = {
        url : this.url,
        method : 'POST',
        data: {
          jsonrpc: '2.0',
          method: 'application.get',
          params: {
            output: ['name'],
            sortfield: 'name',
            hostids: hostid
          },
          auth: this.auth,
          id: 1
        },
      };
      return $http(options).then(function (result) {
        if (!result.data) {
          return [];
        }
        return result.data.result;
      });
    };


    // Get the list of host items
    ZabbixAPIDatasource.prototype.performItemSuggestQuery = function(hostid, applicationid) {
      var options = {
        url : this.url,
        method : 'POST',
        data: {
          jsonrpc: '2.0',
          method: 'item.get',
          params: {
            output: ['name', 'key_', 'value_type'],
            sortfield: 'name',
            hostids: hostid
          },
          auth: this.auth,
          id: 1
        },
      };
      // If application selected return only relative items
      if (applicationid) {
        options.data.params.applicationids = applicationid;
      }
      return $http(options).then(function (result) {
        if (!result.data) {
          return [];
        }
        return result.data.result;
      });
    };


    ZabbixAPIDatasource.prototype.annotationQuery = function(annotation, rangeUnparsed) {
      var from = kbn.parseDate(rangeUnparsed.from).getTime();
      var to = kbn.parseDate(rangeUnparsed.to).getTime();
      var self = this;
      from = Math.ceil(from/1000);
      to = Math.ceil(to/1000);

      var tid_options = {
        method: 'POST',
        url: self.url + '',
        data: {
          jsonrpc: '2.0',
          method: 'trigger.get',
          params: {
              output: ['triggerid', 'description'],
              itemids: annotation.aids.split(','), // TODO: validate / pull automatically from dashboard.
              limit: self.limitmetrics,
          },
          auth: self.auth,
          id: 1
        },
      };

      return $http(tid_options).then(function(result) {
        var obs = {};
        obs = _.indexBy(result.data.result, 'triggerid');

        var options = {
          method: 'POST',
          url: self.url + '',
          data: {
            jsonrpc: '2.0',
            method: 'event.get',
            params: {
                output: 'extend',
                sortorder: 'DESC',
                time_from: from,
                time_till: to,
                objectids: _.keys(obs),
                limit: self.limitmetrics,
            },
            auth: self.auth,
            id: 1
          },
        };

        return $http(options).then(function(result2) {
          var list = [];
          _.each(result2.data.result, function(e) {
            list.push({
              annotation: annotation,
              time: e.clock * 1000,
              title: obs[e.objectid].description,
              text: e.eventid,
            });
          });
          return list;
        });
      });
    };

    return ZabbixAPIDatasource;
  });
});
