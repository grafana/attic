///<reference path="app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var AzureMonitorFilterBuilder;
    return {
        setters:[],
        execute: function() {
            AzureMonitorFilterBuilder = (function () {
                function AzureMonitorFilterBuilder(filter, from, to) {
                    this.filter = filter;
                    this.from = from;
                    this.to = to;
                }
                AzureMonitorFilterBuilder.prototype.generateFilter = function () {
                    var dateTimeCondition = "startTime eq " + this.from.utc().format() + " and endTime eq " + this.to.utc().format();
                    if (this.filter.trim().length === 0) {
                        return dateTimeCondition;
                    }
                    return dateTimeCondition + " and " + this.filter;
                };
                return AzureMonitorFilterBuilder;
            })();
            exports_1("default", AzureMonitorFilterBuilder);
        }
    }
});
//# sourceMappingURL=azure_monitor_filter_builder.js.map