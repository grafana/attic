/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular",
        "lodash",
        "app/core/utils/datemath",
        "app/core/utils/kbn",
        "./queryCtrl",
        "./directives"
    ],
    function (angular, _, dateMath, kbn) {
        "use strict";
        var module = angular.module('grafana.services');
        module.factory('AtlasDatasource', function ($q, backendSrv) {
            function AtlasDatasource(datasource) {
                this.name = datasource.name;
                this.url = datasource.url;
                this.type = datasource.type;
                this.atlasFormat = datasource.meta.atlasFormat || 'std.json';
                this.supportMetrics = true;

                this.minimumInterval = datasource.minimumInterval || 1000;
            }

            AtlasDatasource.prototype.query = function (options) {
                var queries = [];
                options.targets.forEach(function (target, index) {
                    if (target.hide || !(target.rawQuery || target.metric)) {
                        return;
                    }
                    if (target.rawQueryInput) {
                        if (!target.rawQuery) {
                            return;
                        }
                        queries.push(target.rawQuery);
                    } else {
                        if (!target.metric) {
                            return;
                        }
                        var queryParts = [];
                        queryParts.push("name," + target.metric + ",:eq");
                        if (target.tags) {
                            var logicals = [];
                            target.tags.forEach(function (tag, tagIndex) {
                                queryParts.push(tag.name);
                                queryParts.push(tag.value);
                                queryParts.push(":" + tag.matcher);
                                if ("not" === tag.notCondition) {
                                    queryParts.push(":not");
                                }
                                logicals.push(":" + tag.logical);
                            });
                            queryParts = queryParts.concat(logicals);
                        }
                        if (target.aggregation) {
                            queryParts.push(":" + target.aggregation);
                        }
                        if (target.groupBys && target.groupBys.length > 0) {
                            queryParts.push("(");
                            target.groupBys.forEach(function (groupBy, tagIndex) {
                                queryParts.push(groupBy.name);
                            });
                            queryParts.push(")");
                            queryParts.push(":by");
                        }
                        queries.push(queryParts.join(','));
                    }
                });
                // Atlas can take multiple concatenated stack queries
                var fullQuery = queries.join(',');

                var interval = options.interval;

                if (kbn.interval_to_ms(interval) < this.minimumInterval) {
                    interval = kbn.secondsToHms(this.minimumInterval / 1000);
                }

                var params = {
                    q: fullQuery,
                    step: interval,
                    s: new Date(options.range.from).getTime(),
                    e: new Date(options.range.to).getTime(),
                    format: this.atlasFormat
                };

                var httpOptions = {
                    method: 'GET',
                    url: this.url + '/api/v1/graph',
                    params: params,
                    inspect: {type: 'atlas'}
                };

                var deferred = $q.defer();
                backendSrv.datasourceRequest(httpOptions).then(function (response) {
                    if (!response.data) {
                        var error = new Error("No data");
                        deferred.reject(error);
                    }
                    deferred.resolve(convertToTimeseries(response.data))
                });
                return deferred.promise;
            };

            function convertToTimeseries(result) {
                var timeseriesData = _.map(result.legend, function (legend, index) {
                    var series = {target: legend, datapoints: []};
                    var values = _.pluck(result.values, index);

                    for (var i = 0; i < values.length; i++) {
                        var value = values[i];
                        var timestamp = result.start + (i * result.step);
                        series.datapoints.push([value, timestamp]);
                    }

                    return series;
                });

                return {data: timeseriesData};
            }

            return AtlasDatasource;
        });
    });