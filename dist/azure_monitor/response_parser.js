///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['moment', 'lodash'], function(exports_1) {
    var moment_1, lodash_1;
    var ResponseParser;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            ResponseParser = (function () {
                function ResponseParser() {
                }
                ResponseParser.parseQueryResult = function (result) {
                    var data = [];
                    for (var i = 0; i < result.data.length; i++) {
                        var dataPoints = [];
                        for (var j = 0; j < result.data[i].data.value[0].data.length; j++) {
                            var epoch = moment_1.default(result.data[i].data.value[0].data[j].timeStamp).valueOf();
                            dataPoints.push([result.data[i].data.value[0].data[j].average, epoch]);
                        }
                        data.push({ target: result.data[i].data.value[0].name.value, datapoints: dataPoints });
                    }
                    return { data: data };
                };
                ResponseParser.parseResponseValues = function (result, textFieldName, valueFieldName) {
                    var list = [];
                    for (var i = 0; i < result.data.value.length; i++) {
                        list.push({
                            text: lodash_1.default.get(result.data.value[i], textFieldName),
                            value: lodash_1.default.get(result.data.value[i], valueFieldName)
                        });
                    }
                    return list;
                };
                return ResponseParser;
            })();
            exports_1("default", ResponseParser);
        }
    }
});
//# sourceMappingURL=response_parser.js.map