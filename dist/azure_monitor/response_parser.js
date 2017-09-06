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
                        for (var j = 0; j < result.data[i].data.value.length; j++) {
                            for (var k = 0; k < result.data[i].data.value[j].data.length; k++) {
                                var epoch = moment_1.default(result.data[i].data.value[j].data[k].timeStamp).valueOf();
                                var keys = lodash_1.default.keys(result.data[i].data.value[j].data[k]);
                                if (keys.length === 2) {
                                    dataPoints.push([result.data[i].data.value[j].data[k][keys[1]], epoch]);
                                }
                            }
                            data.push({ target: result.data[i].data.value[j].name.value, datapoints: dataPoints });
                        }
                    }
                    return data;
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