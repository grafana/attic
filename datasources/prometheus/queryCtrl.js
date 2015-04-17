define([
  'angular',
  'lodash',
],
function (angular, _) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('PrometheusQueryCtrl', function($scope) {

    $scope.init = function() {
      $scope.target.errors = validateTarget($scope.target);

      if (!$scope.target.expr) {
        $scope.target.expr = "";
      }
      if (!$scope.target.labels) {
        $scope.target.labels = {};
      }
      $scope.target.metric = "";

      $scope.$on('typeahead-updated', function() {
        $scope.$apply($scope.inputMetric);
        $scope.refreshMetricData();
      });
    };

    $scope.refreshMetricData = function() {
      $scope.target.errors = validateTarget($scope.target);

      // this does not work so good
      if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
        $scope.oldTarget = angular.copy($scope.target);
        $scope.get_data();
      }
    };

    $scope.inputMetric = function() {
      $scope.target.expr += $scope.target.metric;
      $scope.target.metric = "";
    };

    $scope.moveMetricQuery = function(fromIndex, toIndex) {
      _.move($scope.panel.targets, fromIndex, toIndex);
    };

    $scope.duplicate = function() {
      var clone = angular.copy($scope.target);
      $scope.panel.targets.push(clone);
    };

    $scope.suggestMetrics = function(query, callback) {
      $scope.datasource
        .performSuggestQuery(query)
        .then(callback);
    };

    $scope.addLabel = function() {
      if (!$scope.addLabelMode) {
        $scope.addLabelMode = true;
        return;
      }

      if (!$scope.target.labels) {
        $scope.target.labels = {};
      }

      $scope.target.errors = validateTarget($scope.target);

      if (!$scope.target.errors.labels) {
        $scope.target.labels[$scope.target.currentLabelKey] = true;
        $scope.target.currentLabelKey = '';
        $scope.refreshMetricData();
      }

      $scope.addLabelMode = false;
    };

    $scope.removeLabel = function(key) {
      delete $scope.target.labels[key];
      $scope.refreshMetricData();
    };

    function validateTarget(target) {
      var errs = {};

      if (target.labels && _.has(target.labels, target.currentLabelKey)) {
        errs.labels = "Duplicate label key '" + target.currentLabelKey + "'.";
      }

      return errs;
    }

  });

});
