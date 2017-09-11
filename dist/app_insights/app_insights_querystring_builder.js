///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var AppInsightsQuerystringBuilder;
    return {
        setters:[],
        execute: function() {
            AppInsightsQuerystringBuilder = (function () {
                function AppInsightsQuerystringBuilder(from, to) {
                    this.from = from;
                    this.to = to;
                    this.aggregation = '';
                    this.groupBy = '';
                }
                AppInsightsQuerystringBuilder.prototype.setAggregation = function (aggregation) {
                    this.aggregation = aggregation;
                };
                AppInsightsQuerystringBuilder.prototype.setGroupBy = function (groupBy) {
                    this.groupBy = groupBy;
                };
                AppInsightsQuerystringBuilder.prototype.generate = function () {
                    var querystring = "timespan=" + this.from.utc().format() + "/" + this.to.utc().format();
                    if (this.aggregation && this.aggregation.length > 0) {
                        querystring += "&aggregation=" + this.aggregation;
                    }
                    if (this.groupBy && this.groupBy.length > 0) {
                        querystring += "&segment=" + this.groupBy;
                    }
                    return querystring;
                };
                return AppInsightsQuerystringBuilder;
            })();
            exports_1("default", AppInsightsQuerystringBuilder);
        }
    }
});
//# sourceMappingURL=app_insights_querystring_builder.js.map