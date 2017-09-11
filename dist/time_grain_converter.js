///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var TimeGrainConverter;
    return {
        setters:[],
        execute: function() {
            TimeGrainConverter = (function () {
                function TimeGrainConverter() {
                }
                TimeGrainConverter.createISO8601Duration = function (timeGrain, timeGrainUnit) {
                    var timeGrainUnitOrDefault = timeGrainUnit || 'hour';
                    var timeGrainOrDefault = timeGrain || 1;
                    if (timeGrainUnitOrDefault === 'hour' || timeGrainUnitOrDefault === 'minute') {
                        return "PT" + timeGrainOrDefault + timeGrainUnitOrDefault[0].toUpperCase();
                    }
                    return "P" + timeGrainOrDefault + timeGrainUnitOrDefault[0].toUpperCase();
                };
                return TimeGrainConverter;
            })();
            exports_1("default", TimeGrainConverter);
        }
    }
});
//# sourceMappingURL=time_grain_converter.js.map