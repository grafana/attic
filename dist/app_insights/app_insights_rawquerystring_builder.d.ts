/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AppInsightsRawQuerystringBuilder {
    rawQueryString: any;
    options: any;
    constructor(rawQueryString: any, options: any);
    generate(): string;
    getFrom(options: any): string;
    getUntil(options: any): string;
    getTimeFilter(options: any): string;
}
