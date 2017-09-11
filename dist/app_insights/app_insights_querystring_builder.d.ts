/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AppInsightsQuerystringBuilder {
    private from;
    private to;
    aggregation: string;
    groupBy: string;
    constructor(from: any, to: any);
    setAggregation(aggregation: any): void;
    setGroupBy(groupBy: any): void;
    generate(): string;
}
