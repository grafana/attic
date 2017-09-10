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
                }
                AppInsightsQuerystringBuilder.prototype.generate = function () {
                    var dateTimeCondition = "timespan=" + this.from.utc().format() + "/" + this.to.utc().format();
                    return "" + dateTimeCondition;
                };
                return AppInsightsQuerystringBuilder;
            })();
            exports_1("default", AppInsightsQuerystringBuilder);
        }
    }
});
//# sourceMappingURL=app_insights_querystring_builder.js.map