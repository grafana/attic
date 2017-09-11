/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AzureMonitorFilterBuilder {
    private metricName;
    private from;
    private to;
    private timeGrain;
    private timeGrainUnit;
    aggregation: string;
    constructor(metricName: string, from: any, to: any, timeGrain: number, timeGrainUnit: string);
    setAggregation(agg: any): void;
    generateFilter(): string;
}
