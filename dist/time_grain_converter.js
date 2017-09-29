///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'app/core/utils/kbn'], function(exports_1) {
    var lodash_1, kbn;
    var TimeGrainConverter;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1) {
                kbn = kbn_1;
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
                    if (interval.indexOf('ms') > -1) {
                        return TimeGrainConverter.createISO8601Duration(1, 'm');
                    }
                    if (interval[interval.length - 1] === 's') {
                        var toMinutes = (timeGrain * 60) % 60;
                        if (toMinutes < 1) {
                            toMinutes = 1;
                        }
                        return TimeGrainConverter.createISO8601Duration(toMinutes, 'm');
                    }
                    return TimeGrainConverter.createISO8601Duration(timeGrain, unit);
                };
                TimeGrainConverter.findClosestTimeGrain = function (interval, allowedTimeGrains) {
                    var closest = allowedTimeGrains[0];
                    var intervalMs = kbn.interval_to_ms(interval);
                    for (var i = 0; i < allowedTimeGrains.length; i++) {
                        // abs (num - val) < abs (num - curr):
                        if (intervalMs > kbn.interval_to_ms(allowedTimeGrains[i])) {
                            if ((i + 1) < allowedTimeGrains.length) {
                                closest = allowedTimeGrains[i + 1];
                            }
                            else {
                                closest = allowedTimeGrains[i];
                            }
                        }
                    }
                    return closest;
                };
                return TimeGrainConverter;
            })();
            exports_1("default", TimeGrainConverter);
        }
    }
});
//# sourceMappingURL=time_grain_converter.js.map