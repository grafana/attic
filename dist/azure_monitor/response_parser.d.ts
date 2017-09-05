/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class ResponseParser {
    static parseQueryResult(result: any): {
        data: any[];
    };
    static parseResponseValues(result: any, textFieldName: string, valueFieldName: string): any[];
}
