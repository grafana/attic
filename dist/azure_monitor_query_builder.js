///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'moment', './azure_monitor_filter_builder'], function(exports_1) {
    var lodash_1, moment_1, azure_monitor_filter_builder_1;
    var AzureMonitorQueryBuilder;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (azure_monitor_filter_builder_1_1) {
                azure_monitor_filter_builder_1 = azure_monitor_filter_builder_1_1;
            }],
        execute: function() {
            AzureMonitorQueryBuilder = (function () {
                function AzureMonitorQueryBuilder(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.id = instanceSettings.id;
                    this.subscriptionId = instanceSettings.jsonData.subscriptionId;
                    this.baseUrl = "/azuremonitor/subscriptions/" + this.subscriptionId + "/resourceGroups";
                    this.url = instanceSettings.url;
                }
                AzureMonitorQueryBuilder.prototype.query = function (options) {
                    var _this = this;
                    var queries = lodash_1.default.filter(options.targets, function (item) {
                        return item.hide !== true;
                    }).map(function (item) {
                        var resourceGroup = _this.templateSrv.replace(item.resourceGroup, options.scopedVars);
                        var resourceName = _this.templateSrv.replace(item.resourceName, options.scopedVars);
                        var resourceProviderNamespace = _this.templateSrv.replace(item.resourceProviderNamespace, options.scopedVars);
                        var resourceType = _this.templateSrv.replace(item.resourceType, options.scopedVars);
                        var apiVersion = _this.templateSrv.replace(item.apiVersion, options.scopedVars);
                        var filterBuilder = new azure_monitor_filter_builder_1.default(item.filter, options.range.from, options.range.to, item.timeGrain, item.timeGrainUnit);
                        var filter = _this.templateSrv.replace(filterBuilder.generateFilter(), options.scopedVars);
                        var url = (_this.baseUrl + "/" + resourceGroup + "/providers/" + resourceProviderNamespace + "/" + resourceType + "/" + resourceName) +
                            ("/providers/microsoft.insights/metrics?api-version=" + apiVersion + "&$filter=" + filter);
                        return {
                            refId: item.refId,
                            intervalMs: options.intervalMs,
                            maxDataPoints: options.maxDataPoints,
                            datasourceId: _this.id,
                            url: url,
                            format: options.format,
                        };
                    });
                    if (queries.length === 0) {
                        return this.$q.when({ data: [] });
                    }
                    var promises = this.doQueries(queries);
                    return this.$q.all(promises).then(function (results) {
                        return { data: lodash_1.default.flatten(results) };
                    }).then(this.processQueryResult);
                };
                AzureMonitorQueryBuilder.prototype.doQueries = function (queries) {
                    var _this = this;
                    return lodash_1.default.map(queries, function (query) {
                        return _this.doRequest({ url: query.url, method: 'GET' });
                    });
                };
                AzureMonitorQueryBuilder.prototype.processQueryResult = function (result) {
                    var data = [];
                    for (var i = 0; i < result.data.length; i++) {
                        var dataPoints = [];
                        for (var j = 0; j < result.data[i].data.value[0].data.length; j++) {
                            var epoch = moment_1.default(result.data[i].data.value[0].data[j].timeStamp).valueOf();
                            dataPoints.push([result.data[i].data.value[0].data[j].average, epoch]);
                        }
                        data.push({ target: result.data[i].data.value[0].name.value, datapoints: dataPoints });
                    }
                    return { data: data };
                };
                AzureMonitorQueryBuilder.prototype.annotationQuery = function (options) {
                };
                AzureMonitorQueryBuilder.prototype.metricFindQuery = function (query) {
                    var url = "" + this.baseUrl + query;
                    var list = [];
                    return this.doRequest({
                        url: url,
                        method: 'GET'
                    }).then(function (result) {
                        for (var i = 0; i < result.data.value.length; i++) {
                            list.push({
                                text: result.data.value[i].name,
                                value: result.data.value[i].name
                            });
                        }
                        return list;
                    });
                };
                AzureMonitorQueryBuilder.prototype.testDatasource = function () {
                    var url = this.baseUrl + "?api-version=2017-06-01";
                    return this.doRequest({
                        url: url,
                        method: 'GET'
                    }).then(function (response) {
                        if (response.status === 200) {
                            return {
                                status: 'success',
                                message: 'Successfully queried the Azure Monitor service.',
                                title: 'Success'
                            };
                        }
                    })
                        .catch(function (error) {
                        var message = error.statusText ? error.statusText + ': ' : '';
                        if (error.data && error.data.error && error.data.error.code) {
                            message += error.data.error.code + '. ' + error.data.error.message;
                        }
                        else if (error.data && error.data.error) {
                            message += error.data.error;
                        }
                        else if (error.data) {
                            message += error.data;
                        }
                        else {
                            message = "Cannot connect to Azure Monitor REST API.";
                        }
                        return {
                            status: "error",
                            message: message,
                            title: "Error"
                        };
                    });
                };
                AzureMonitorQueryBuilder.prototype.doRequest = function (options) {
                    options.url = this.url + options.url;
                    return this.backendSrv.datasourceRequest(options);
                };
                return AzureMonitorQueryBuilder;
            })();
            exports_1("default", AzureMonitorQueryBuilder);
        }
    }
});
//# sourceMappingURL=azure_monitor_query_builder.js.map