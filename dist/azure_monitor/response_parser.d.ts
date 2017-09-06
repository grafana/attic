/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class ResponseParser {
    static parseQueryResult(result: any): any[];
    static convertDataToPoints(timeSeriesData: any): any[];
    static dateTimeToEpoch(dateTime: any): any;
    static getKeyForAggregationField(dataObj: any): any;
    static parseResponseValues(result: any, textFieldName: string, valueFieldName: string): any[];
}
