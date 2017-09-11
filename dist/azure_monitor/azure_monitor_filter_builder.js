///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['../time_grain_converter'], function(exports_1) {
    var time_grain_converter_1;
    var AzureMonitorFilterBuilder;
    return {
        setters:[
            function (time_grain_converter_1_1) {
                time_grain_converter_1 = time_grain_converter_1_1;
            }],
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
                    var timeGrain = time_grain_converter_1.default.createISO8601Duration(this.timeGrain, this.timeGrainUnit);
                    var timeGrainCondition = " and timeGrain eq duration'" + timeGrain + "'";
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
                return AzureMonitorFilterBuilder;
            })();
            exports_1("default", AzureMonitorFilterBuilder);
        }
    }
});
//# sourceMappingURL=azure_monitor_filter_builder.js.map