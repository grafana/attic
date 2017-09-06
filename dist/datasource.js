///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', './azure_monitor/azure_monitor_query_builder', './app_insights/app_insights_query_builder'], function(exports_1) {
    var lodash_1, azure_monitor_query_builder_1, app_insights_query_builder_1;
    var AzureMonitorDatasource;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (azure_monitor_query_builder_1_1) {
                azure_monitor_query_builder_1 = azure_monitor_query_builder_1_1;
            },
            function (app_insights_query_builder_1_1) {
                app_insights_query_builder_1 = app_insights_query_builder_1_1;
            }],
        execute: function() {
            AzureMonitorDatasource = (function () {
                /** @ngInject */
                function AzureMonitorDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.azureMonitorQueryBuilder = new azure_monitor_query_builder_1.default(instanceSettings, this.backendSrv, this.templateSrv, this.$q);
                    this.appInsightsQueryBuilder = new app_insights_query_builder_1.default(instanceSettings, this.backendSrv, this.templateSrv, this.$q);
                }
                AzureMonitorDatasource.prototype.query = function (options) {
                    var promises = [];
                    var azureMonitorOptions = options;
                    var appInsightsTargets = lodash_1.default.cloneDeep(options);
                    azureMonitorOptions.targets = lodash_1.default.filter(azureMonitorOptions.targets, ['queryType', 'Azure Monitor']);
                    appInsightsTargets.targets = lodash_1.default.filter(appInsightsTargets.targets, ['queryType', 'Application Insights']);
                    if (azureMonitorOptions.targets.length > 0) {
                        promises.push(this.azureMonitorQueryBuilder.query(azureMonitorOptions));
                    }
                    if (appInsightsTargets.targets.length > 0) {
                        promises.push(this.appInsightsQueryBuilder.query(appInsightsTargets));
                    }
                    return this.$q.all(promises).then(function (results) {
                        return { data: lodash_1.default.flatten(results) };
                    });
                };
                AzureMonitorDatasource.prototype.annotationQuery = function (options) {
                    return this.azureMonitorQueryBuilder.annotationQuery(options);
                };
                AzureMonitorDatasource.prototype.metricFindQuery = function (query) {
                    return this.azureMonitorQueryBuilder.metricFindQuery(query);
                };
                AzureMonitorDatasource.prototype.testDatasource = function () {
                    var promises = [];
                    if (this.azureMonitorQueryBuilder.isConfigured()) {
                        promises.push(this.azureMonitorQueryBuilder.testDatasource());
                    }
                    if (this.appInsightsQueryBuilder.isConfigured()) {
                        promises.push(this.appInsightsQueryBuilder.testDatasource());
                    }
                    if (promises.length === 0) {
                        return {
                            status: 'error',
                            message: "Nothing configured. At least one of the API's must be configured.",
                            title: 'Error'
                        };
                    }
                    return this.$q.all(promises).then(function (results) {
                        var status = 'success';
                        var message = '';
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].status !== 'success') {
                                status = results[i].status;
                            }
                            message += (i + 1) + ". " + results[i].message + " ";
                        }
                        return {
                            status: status,
                            message: message,
                            title: lodash_1.default.upperFirst(status)
                        };
                    });
                };
                AzureMonitorDatasource.prototype.getMetricDefinitions = function (resourceGroup) {
                    return this.azureMonitorQueryBuilder.getMetricDefinitions(resourceGroup);
                };
                AzureMonitorDatasource.prototype.getResourceNames = function (resourceGroup, metricDefinition) {
                    return this.azureMonitorQueryBuilder.getResourceNames(resourceGroup, metricDefinition);
                };
                AzureMonitorDatasource.prototype.getMetricNames = function (resourceGroup, metricDefinition, resourceName) {
                    return this.azureMonitorQueryBuilder.getMetricNames(resourceGroup, metricDefinition, resourceName);
                };
                return AzureMonitorDatasource;
            })();
            exports_1("default", AzureMonitorDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map