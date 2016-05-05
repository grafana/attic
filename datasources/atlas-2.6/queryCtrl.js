define([
        'angular',
        'lodash'
    ],
    function (angular, _) {
        'use strict';

        var module = angular.module('grafana.controllers');

        module.controller('AtlasTargetCtrl', function ($scope) {
            $scope.init = function () {
                $scope.atlas = {};

                $scope.atlas.aggregations = [
                    "sum",
                    "avg",
                    "count"
                ];

                $scope.atlas.logical = [
                    "and",
                    "or"
                ];

                $scope.atlas.notCondition = [
                    " ",
                    "not"
                ];

                $scope.atlas.matchers = [
                    "eq",
                    "ge",
                    "gt",
                    "le",
                    "lt",
                    "has",
                    "in"
                ];
            };

            $scope.moveMetricQuery = function (fromIndex, toIndex) {
                _.move($scope.panel.targets, fromIndex, toIndex);
                $scope.get_data();
            };

            $scope.duplicate = function () {
                var clone = angular.copy($scope.target);
                $scope.panel.targets.push(clone);
                $scope.get_data();
            };

            $scope.toggleRawQuery = function () {
                $scope.target.rawQueryInput = !$scope.target.rawQueryInput;
                $scope.get_data();
            };

            $scope.removeTag = function (tag) {
                if ($scope.target.tags) {
                    $scope.target.tags.splice($scope.target.tags.indexOf(tag), 1);
                    $scope.get_data();
                }
            };

            $scope.addTag = function () {
                if (!$scope.target.tags) {
                    $scope.target.tags = [];
                }
                $scope.target.tags.push({
                    name: null,
                    value: null,
                    notCondition: $scope.atlas.notCondition[0],
                    logical: $scope.atlas.logical[0],
                    matcher: $scope.atlas.matchers[0]
                });
            };

            $scope.removeGroupBy = function (groupBy) {
                if ($scope.target.groupBys) {
                    $scope.target.groupBys.splice($scope.target.groupBys.indexOf(groupBy), 1);
                    $scope.get_data();
                }
            };

            $scope.addGroupBy = function () {
                if (!$scope.target.groupBys) {
                    $scope.target.groupBys = [];
                }
                $scope.target.groupBys.push({});
            };


            $scope.init();
        });

    });
