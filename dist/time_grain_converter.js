///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash'], function(exports_1) {
    var lodash_1;
    var TimeGrainConverter;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            TimeGrainConverter = (function () {
                function TimeGrainConverter() {
                }
                TimeGrainConverter.createISO8601Duration = function (timeGrain, timeGrainUnit) {
                    var timeIntervals = ['hour', 'minute', 'h', 'm'];
                    if (lodash_1.default.includes(timeIntervals, timeGrainUnit)) {
                        return "PT" + timeGrain + timeGrainUnit[0].toUpperCase();
                    }
                    return "P" + timeGrain + timeGrainUnit[0].toUpperCase();
                };
                TimeGrainConverter.createISO8601DurationFromInterval = function (interval) {
                    var timeGrain = +interval.slice(0, interval.length - 1);
                    var unit = interval[interval.length - 1];
                    if (interval[interval.length - 1] === 's') {
                        var toMinutes = (timeGrain * 60) % 60;
                        if (toMinutes < 1) {
                            toMinutes = 1;
                        }
                        return TimeGrainConverter.createISO8601Duration(toMinutes, 'm');
                    }
                    return TimeGrainConverter.createISO8601Duration(timeGrain, unit);
                };
                return TimeGrainConverter;
            })();
            exports_1("default", TimeGrainConverter);
        }
    }
});
//# sourceMappingURL=time_grain_converter.js.map