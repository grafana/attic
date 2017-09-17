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
                function AzureMonitorFilterBuilder(metricName, from, to, timeGrain, timeGrainUnit, grafanaInterval) {
                    this.metricName = metricName;
                    this.from = from;
                    this.to = to;
                    this.timeGrain = timeGrain;
                    this.timeGrainUnit = timeGrainUnit;
                    this.grafanaInterval = grafanaInterval;
                    this.timeGrainInterval = '';
                }
                AzureMonitorFilterBuilder.prototype.setAggregation = function (agg) {
                    this.aggregation = agg;
                };
                AzureMonitorFilterBuilder.prototype.generateFilter = function () {
                    var filter = this.createDatetimeAndTimeGrainConditions();
                    if (this.aggregation) {
                        filter += "&aggregation=" + this.aggregation;
                    }
                    if (this.metricName && this.metricName.trim().length > 0) {
                        filter += "&metric=" + this.metricName;
                    }
                    return filter;
                };
                AzureMonitorFilterBuilder.prototype.createDatetimeAndTimeGrainConditions = function () {
                    var dateTimeCondition = "timespan=" + this.from.utc().format() + "/" + this.to.utc().format();
                    if (this.timeGrain > 0) {
                        this.timeGrainInterval = time_grain_converter_1.default.createISO8601Duration(this.timeGrain, this.timeGrainUnit);
                    }
                    else {
                        this.timeGrainInterval = this.calculateAutoTimeGrain();
                    }
                    var timeGrainCondition = "&interval=" + this.timeGrainInterval;
                    return dateTimeCondition + timeGrainCondition;
                };
                AzureMonitorFilterBuilder.prototype.calculateAutoTimeGrain = function () {
                    return time_grain_converter_1.default.createISO8601DurationFromInterval(this.grafanaInterval);
                };
                return AzureMonitorFilterBuilder;
            })();
            exports_1("default", AzureMonitorFilterBuilder);
        }
    }
});
//# sourceMappingURL=azure_monitor_filter_builder.js.map