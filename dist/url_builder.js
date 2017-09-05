System.register([], function(exports_1) {
    var UrlBuilder;
    return {
        setters:[],
        execute: function() {
            UrlBuilder = (function () {
                function UrlBuilder() {
                }
                UrlBuilder.buildAzureMonitorQueryUrl = function (baseUrl, resourceGroup, metricDefinition, resourceName, apiVersion, filter) {
                    return (baseUrl + "/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName) +
                        ("/providers/microsoft.insights/metrics?api-version=" + apiVersion + "&$filter=" + filter);
                };
                UrlBuilder.buildAzureMonitorGetMetricNamesUrl = function (baseUrl, resourceGroup, metricDefinition, resourceName) {
                    return (baseUrl + "/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName) +
                        "/providers/microsoft.insights/metricdefinitions?api-version=2016-03-01";
                };
                return UrlBuilder;
            })();
            exports_1("default", UrlBuilder);
        }
    }
});
//# sourceMappingURL=url_builder.js.map