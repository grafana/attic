///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['./azure_monitor_query_builder'], function(exports_1) {
    var azure_monitor_query_builder_1;
    var AzureMonitorDatasource;
    return {
        setters:[
            function (azure_monitor_query_builder_1_1) {
                azure_monitor_query_builder_1 = azure_monitor_query_builder_1_1;
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
                }
                AzureMonitorDatasource.prototype.query = function (options) {
                    return this.azureMonitorQueryBuilder.query(options);
                };
                AzureMonitorDatasource.prototype.annotationQuery = function (options) {
                    return this.azureMonitorQueryBuilder.annotationQuery(options);
                };
                AzureMonitorDatasource.prototype.metricFindQuery = function (query) {
                    return this.azureMonitorQueryBuilder.metricFindQuery(query);
                };
                AzureMonitorDatasource.prototype.testDatasource = function () {
                    return this.azureMonitorQueryBuilder.testDatasource();
                };
                return AzureMonitorDatasource;
            })();
            exports_1("default", AzureMonitorDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map