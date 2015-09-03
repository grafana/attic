define([
  'angular',
  'lodash',
],
function (angular, _) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('GnocchiQueryCtrl', function($scope, $timeout) {

    $scope.init = function() {
      // TODO(sileht): Allows custom
      $scope.aggregators = ['mean', 'sum', 'min', 'max',
                            'std', 'median', 'first', 'last', 'count'].concat(
                                _.range(1, 100).map(function (i) { return i + "pct"; }));

      if (!$scope.target.aggregator) {
        $scope.target.aggregator = 'mean';
      }

      $scope.$on('typeahead-updated', function() {
        $timeout($scope.targetBlur);
      });

      if (!$scope.target.queryMode) {
        //$scope.target.queryMode = "resource_search";
        $scope.target.queryMode = "resource_aggregation";
      }
      validateTarget($scope.target);
    };

    $scope.suggestMetrics = function(query, callback) {
      $scope.datasource
        .performSuggestQuery(query, 'metrics')
        .then(callback);
    };

    $scope.targetBlur = function() {
      validateTarget($scope.target);

      // this does not work so good
      if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
        $scope.oldTarget = angular.copy($scope.target);
        $scope.get_data();
      }
    };

    $scope.toggleQueryMode = function () {
      var mode = [
        "resource_search", "resource_aggregation",
        "resource", "metric",
      ];
      var index = mode.indexOf($scope.target.queryMode) + 1;
      if (index === mode.length) {
        index = 0;
      }
      $scope.target.queryMode = mode[index];
    };

    function validateTarget(target) {
      switch(target.queryMode) {
        case "resource_aggregation":
        case "resource_search":
          $scope.datasource.validateSearchTarget(target).then(function(result) {
            switch(result.status) {
              case 401:
                target.errors = "Datasource authentification failed";
                break;
              case 400:
                target.errors = 'Client error: ' + result;
                break;
              case 200:
                target.errors = null;
                break;
              default:
                target.errors = "Unknown errors: " + result.data;
                break;
            }
          });
          break;
        default:
          break;
      }
    }

  });

});
