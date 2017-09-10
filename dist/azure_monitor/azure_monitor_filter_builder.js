///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var AzureMonitorFilterBuilder;
    return {
        setters:[],
        execute: function() {
            AzureMonitorFilterBuilder = (function () {
                function AzureMonitorFilterBuilder(metricName, from, to, timeGrain, timeGrainUnit) {
                    this.metricName = metricName;
                    this.from = from;
                    this.to = to;
                    this.timeGrain = timeGrain;
                    this.timeGrainUnit = timeGrainUnit;
                }
                AzureMonitorFilterBuilder.prototype.setAggregation = function (agg) {
                    this.aggregation = agg;
                };
                AzureMonitorFilterBuilder.prototype.generateFilter = function () {
                    var dateTimeCondition = "startTime eq " + this.from.utc().format() + " and endTime eq " + this.to.utc().format();
                    var timeGrainCondition = " and timeGrain eq duration'" + this.createISO8601Duration() + "'";
                    var timeCondition = dateTimeCondition + timeGrainCondition;
                    var filter = timeCondition;
                    if (this.aggregation) {
                        filter += " and aggregationType eq '" + this.aggregation + "'";
                    }
                    if (this.metricName && this.metricName.trim().length > 0) {
                        filter += " and (name.value eq '" + this.metricName + "')";
                    }
                    return filter;
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