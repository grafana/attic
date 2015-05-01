define([
  'angular',
  'lodash'
],
function (angular, _) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('ZabbixAPITargetCtrl', function($scope) {

    $scope.init = function() {
      $scope.targetLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
      $scope.metric = {
        hostlist: ["Loading..."],
        itemlist: ["Loading..."]
      };

      $scope.updateHostList();
      if ($scope.target.host.hostid) {
        $scope.updateItemList($scope.target.host.hostid);
      }

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
      // Update item list
      $scope.updateItemList($scope.target.host.hostid);
      $scope.target.errors = validateTarget($scope.target);
      if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
        $scope.oldTarget = angular.copy($scope.target);
        $scope.get_data();
      }
    };


    // Call when item selected
    $scope.selectItem = function() {
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

    // Update list of hosts
    $scope.updateHostList = function() {
      $scope.datasource.performHostSuggestQuery().then(function (series) {
        $scope.metric.hostlist = series;
        $scope.target.host = $scope.metric.hostlist.filter(function (item, index, array) {
            // Find selected host in metric.hostlist
            return (item.hostid == $scope.target.host.hostid);
          }).pop();
      });
    };

    // Update list of items
    $scope.updateItemList = function(hostid) {
      // Update only if host selected
      if (hostid) {
        $scope.datasource.performItemSuggestQuery(hostid).then(function (series) {
          $scope.metric.itemlist = series;
          $scope.target.item = $scope.metric.itemlist.filter(function (item, index, array) {
            // Find selected item in metric.hostlist
            return (item.itemid == $scope.target.item.itemid);
          }).pop();
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
