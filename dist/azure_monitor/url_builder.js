///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var UrlBuilder;
    return {
        setters:[],
        execute: function() {
            UrlBuilder = (function () {
                function UrlBuilder() {
                }
                UrlBuilder.buildAzureMonitorQueryUrl = function (baseUrl, resourceGroup, metricDefinition, resourceName, apiVersion, filter) {
                    if (metricDefinition === 'Microsoft.Sql/servers/databases') {
                        var rn = resourceName.split('/');
                        return (baseUrl + "/" + resourceGroup + "/providers/Microsoft.Sql/servers/" + rn[0] + "/databases/" + rn[1]) +
                            ("/providers/microsoft.insights/metrics?api-version=" + apiVersion + "&" + filter);
                    }
                    return (baseUrl + "/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName) +
                        ("/providers/microsoft.insights/metrics?api-version=" + apiVersion + "&" + filter);
                };
                UrlBuilder.buildAzureMonitorGetMetricNamesUrl = function (baseUrl, resourceGroup, metricDefinition, resourceName, apiVersion) {
                    if (metricDefinition === 'Microsoft.Sql/servers/databases') {
                        var rn = resourceName.split('/');
                        return (baseUrl + "/" + resourceGroup + "/providers/Microsoft.Sql/servers/" + rn[0] + "/databases/" + rn[1]) +
                            ("/providers/microsoft.insights/metricdefinitions?api-version=" + apiVersion);
                    }
                    return (baseUrl + "/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName) +
                        ("/providers/microsoft.insights/metricdefinitions?api-version=" + apiVersion);
                };
                return UrlBuilder;
            })();
            exports_1("default", UrlBuilder);
        }
    }
});
//# sourceMappingURL=url_builder.js.map