///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var AppInsightsQueryBuilder;
    return {
        setters:[],
        execute: function() {
            AppInsightsQueryBuilder = (function () {
                function AppInsightsQueryBuilder(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.version = 'beta';
                    this.id = instanceSettings.id;
                    this.applicationId = instanceSettings.jsonData.appInsightsAppId;
                    this.baseUrl = "/appinsights/" + this.version + "/apps/" + this.applicationId;
                    this.url = instanceSettings.url;
                }
                AppInsightsQueryBuilder.prototype.isConfigured = function () {
                    return this.applicationId && this.applicationId.length > 0;
                };
                AppInsightsQueryBuilder.prototype.query = function (options) {
                };
                AppInsightsQueryBuilder.prototype.annotationQuery = function (options) {
                };
                AppInsightsQueryBuilder.prototype.metricFindQuery = function (query) {
                };
                AppInsightsQueryBuilder.prototype.testDatasource = function () {
                    var url = this.baseUrl + "/metrics/metadata";
                    return this.backendSrv.datasourceRequest({
                        url: this.url + url,
                        method: 'GET'
                    }).then(function (response) {
                        if (response.status === 200) {
                            return {
                                status: 'success',
                                message: 'Successfully queried the Application Insights service.',
                                title: 'Success'
                            };
                        }
                    }).catch(function (error) {
                        var message = 'Application Insights: ';
                        message += error.statusText ? error.statusText + ': ' : '';
                        if (error.data && error.data.error && error.data.error.code === 'PathNotFoundError') {
                            message += 'Invalid Application Id for Application Insights service.';
                        }
                        else if (error.data && error.data.error) {
                            message += error.data.error.code + '. ' + error.data.error.message;
                        }
                        else {
                            message += 'Cannot connect to Application Insights REST API.';
                        }
                        return {
                            status: 'error',
                            message: message
                        };
                    });
                };
                return AppInsightsQueryBuilder;
            })();
            exports_1("default", AppInsightsQueryBuilder);
        }
    }
});
//# sourceMappingURL=app_insights_query_builder.js.map