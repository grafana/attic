///<reference path="app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var AzureMonitorFilterBuilder;
    return {
        setters:[],
        execute: function() {
            AzureMonitorFilterBuilder = (function () {
                function AzureMonitorFilterBuilder(filter, from, to, timeGrain, timeGrainUnit) {
                    this.filter = filter;
                    this.from = from;
                    this.to = to;
                    this.timeGrain = timeGrain;
                    this.timeGrainUnit = timeGrainUnit;
                }
                AzureMonitorFilterBuilder.prototype.generateFilter = function () {
                    var dateTimeCondition = "startTime eq " + this.from.utc().format() + " and endTime eq " + this.to.utc().format();
                    var timeGrainCondition = " and timeGrain eq duration'" + this.createISO8601Duration() + "'";
                    var timeCondition = dateTimeCondition + timeGrainCondition;
                    if (!this.filter || this.filter.trim().length === 0) {
                        return timeCondition;
                    }
                    return timeCondition + " and " + this.filter;
                };
                AzureMonitorFilterBuilder.prototype.createISO8601Duration = function () {
                    var timeGrainUnit = this.timeGrainUnit || 'hour';
                    var timeGrain = this.timeGrain || 1;
                    if (timeGrainUnit === 'hour' || timeGrainUnit === 'minute') {
                        return "PT" + timeGrain + timeGrainUnit[0].toUpperCase();
                    }
                    return "P" + timeGrain + timeGrainUnit[0].toUpperCase();
                };
                return AzureMonitorFilterBuilder;
            })();
            exports_1("default", AzureMonitorFilterBuilder);
        }
    }
});
//# sourceMappingURL=azure_monitor_filter_builder.js.map