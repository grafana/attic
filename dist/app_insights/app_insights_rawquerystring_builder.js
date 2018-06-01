///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var AppInsightsRawQuerystringBuilder;
    return {
        setters:[],
        execute: function() {
            AppInsightsRawQuerystringBuilder = (function () {
                function AppInsightsRawQuerystringBuilder(rawQueryString, options) {
                    this.rawQueryString = rawQueryString;
                    this.options = options;
                }
                AppInsightsRawQuerystringBuilder.prototype.generate = function () {
                    var queryString = this.rawQueryString;
                    queryString = queryString.replace(/\$__interval/gi, this.options.interval);
                    queryString = queryString.replace(/\$timeFilter/gi, this.getTimeFilter(this.options));
                    queryString = queryString.replace(/\$from/gi, this.getFrom(this.options));
                    queryString = queryString.replace(/\$until/gi, this.getUntil(this.options));
                    queryString = encodeURIComponent(queryString);
                    var uriString = "query=" + queryString;
                    return uriString;
                };
                AppInsightsRawQuerystringBuilder.prototype.getFrom = function (options) {
                    var from = options.range.from;
                    return "datetime(" + from.toISOString() + ")";
                };
                AppInsightsRawQuerystringBuilder.prototype.getUntil = function (options) {
                    if (options.rangeRaw.to === 'now') {
                        return "now()";
                    }
                    else {
                        var until = options.range.to;
                        return "datetime(" + until.toISOString() + ")";
                    }
                };
                AppInsightsRawQuerystringBuilder.prototype.getTimeFilter = function (options) {
                    if (options.rangeRaw.to === 'now') {
                        return "timestamp >= " + this.getFrom(options);
                    }
                    else {
                        return "timestamp >= " + this.getFrom(options) + " and timestamp <= " + this.getUntil(options);
                    }
                };
                return AppInsightsRawQuerystringBuilder;
            })();
            exports_1("default", AppInsightsRawQuerystringBuilder);
        }
    }
});
//# sourceMappingURL=app_insights_rawquerystring_builder.js.map