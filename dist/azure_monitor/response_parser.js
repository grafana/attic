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
                        for (var j = 0; j < result.data[i].data.value.length; j++) {
                            for (var k = 0; k < result.data[i].data.value[j].timeseries.length; k++) {
                                data.push({
                                    target: ResponseParser.createTarget(result.data[i].data.value[j]),
                                    datapoints: ResponseParser.convertDataToPoints(result.data[i].data.value[j].timeseries[k].data)
                                });
                            }
                        }
                    }
                    return data;
                };
                ResponseParser.createTarget = function (data) {
                    var endIndex = data.id.lastIndexOf('/providers');
                    var startIndex = data.id.slice(0, endIndex).lastIndexOf('/') + 1;
                    var resourceName = data.id.substring(startIndex, endIndex);
                    return resourceName + "." + data.name.value;
                };
                ResponseParser.convertDataToPoints = function (timeSeriesData) {
                    var dataPoints = [];
                    for (var k = 0; k < timeSeriesData.length; k++) {
                        var epoch = ResponseParser.dateTimeToEpoch(timeSeriesData[k].timeStamp);
                        var aggKey = ResponseParser.getKeyForAggregationField(timeSeriesData[k]);
                        if (aggKey) {
                            dataPoints.push([timeSeriesData[k][aggKey], epoch]);
                        }
                    }
                    return dataPoints;
                };
                ResponseParser.dateTimeToEpoch = function (dateTime) {
                    return moment_1.default(dateTime).valueOf();
                };
                ResponseParser.getKeyForAggregationField = function (dataObj) {
                    var keys = lodash_1.default.keys(dataObj);
                    if (keys.length < 2) {
                        return;
                    }
                    return lodash_1.default.intersection(keys, ['total', 'average', 'maximum', 'minimum', 'count']);
                };
                ResponseParser.parseResponseValues = function (result, textFieldName, valueFieldName) {
                    var list = [];
                    for (var i = 0; i < result.data.value.length; i++) {
                        if (!lodash_1.default.find(list, ['value', lodash_1.default.get(result.data.value[i], valueFieldName)])) {
                            list.push({
                                text: lodash_1.default.get(result.data.value[i], textFieldName),
                                value: lodash_1.default.get(result.data.value[i], valueFieldName)
                            });
                        }
                    }
                    return list;
                };
                ResponseParser.parseAggregations = function (result, metricName) {
                    var metricData = lodash_1.default.find(result.data.value, function (o) {
                        return lodash_1.default.get(o, 'name.value') === metricName;
                    });
                    return {
                        primaryAggType: metricData.primaryAggregationType,
                        supportedAggTypes: metricData.supportedAggregationTypes
                    };
                };
                return ResponseParser;
            })();
            exports_1("default", ResponseParser);
        }
    }
});
//# sourceMappingURL=response_parser.js.map