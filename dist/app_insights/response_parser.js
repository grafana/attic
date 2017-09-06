///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['moment'], function(exports_1) {
    var moment_1;
    var ResponseParser;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            ResponseParser = (function () {
                function ResponseParser() {
                }
                ResponseParser.parseQueryResult = function (result) {
                    var data = [];
                    var dataPoints = [];
                    for (var i = 0; i < result.data[0].data.value.segments.length; i++) {
                        var epoch = moment_1.default(result.data[0].data.value.segments[i].end).valueOf();
                        dataPoints.push([result.data[0].data.value.segments[i]['exceptions/server'].sum, epoch]);
                    }
                    data.push({ target: 'exceptions/server', datapoints: dataPoints });
                    return data;
                };
                return ResponseParser;
            })();
            exports_1("default", ResponseParser);
        }
    }
});
//# sourceMappingURL=response_parser.js.map