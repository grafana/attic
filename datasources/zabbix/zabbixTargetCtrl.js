define([
  'angular',
  'lodash'
],
function (angular, _) {
  'use strict';

  var module = angular.module('grafana.controllers');

  var metricList = null;
  var hostList = null;
  var itemList = null;

  module.controller('ZabbixAPITargetCtrl', function($scope) {

    $scope.init = function() {
      $scope.metric = {
        hostlist: ["Loading..."],
        itemlist: ["Loading..."],
        host: "Loading...",
        item: "Loading..."
      };

      $scope.updateHostList();
      $scope.updateItemList($scope.target.host.hostid);

      $scope.target.errors = validateTarget($scope.target);
    };

    $scope.targetBlur = function() {
      $scope.target.errors = validateTarget($scope.target);
      if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
        $scope.oldTarget = angular.copy($scope.target);
        $scope.get_data();
      }
    };


    // Call when host selected
    $scope.selectHost = function() {
      $scope.target.host = $scope.metric.host;
      $scope.updateItemList($scope.metric.host.hostid);
      $scope.target.errors = validateTarget($scope.target);
      if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
        $scope.oldTarget = angular.copy($scope.target);
        $scope.get_data();
      }
    };


    // Call when item selected
    $scope.selectItem = function() {
      $scope.target.item = $scope.metric.item;
      $scope.target.errors = validateTarget($scope.target);
      if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
        $scope.oldTarget = angular.copy($scope.target);
        $scope.get_data();
      }
    };


    $scope.duplicate = function() {
      var clone = angular.copy($scope.target);
      $scope.panel.targets.push(clone);
    };


    $scope.moveMetricQuery = function(fromIndex, toIndex) {
      _.move($scope.panel.targets, fromIndex, toIndex);
    };

    //////////////////////////////
    // SUGGESTION QUERIES
    //////////////////////////////

    $scope.updateHostList = function() {
      $scope.metricListLoading = true;
      hostList = [];
      $scope.datasource.performHostSuggestQuery().then(function (series) {
        hostList = series;
        $scope.metric.hostlist = series;
        if ($scope.target.host)
          // Set selected host
          $scope.metric.host = $scope.metric.hostlist.filter(function (item, index, array) {
            // Find selected host in metric.hostlist
            return (item.hostid == $scope.target.host.hostid);
          }).pop();
        else
          $scope.metric.host = "";
        $scope.metricListLoading = false;
        return hostList;
      });
    };


    $scope.updateItemList = function(hostid) {
      $scope.metricListLoading = true;
      itemList = [];
      if (hostid) {
        $scope.datasource.performItemSuggestQuery(hostid).then(function (series) {
          itemList = series;
          $scope.metric.itemlist = series;
          if ($scope.target.item)
            // Set selected item
            $scope.metric.item = $scope.metric.itemlist.filter(function (item, index, array) {
              // Find selected item in metric.hostlist
              return (item.itemid == $scope.target.item.itemid);
            }).pop();
          else
            $scope.metric.item = "";
          $scope.metricListLoading = false;
          return itemList;
        });
      }
    };


    //////////////////////////////
    // VALIDATION
    //////////////////////////////

    function validateTarget(target) {
      var errs = {};

      return errs;
    }

  });

});
