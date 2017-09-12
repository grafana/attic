/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AzureMonitorFilterBuilder {
    private metricName;
    private from;
    private to;
    timeGrain: number;
    timeGrainUnit: string;
    grafanaInterval: string;
    aggregation: string;
    timeGrainInterval: string;
    constructor(metricName: string, from: any, to: any, timeGrain: number, timeGrainUnit: string, grafanaInterval: string);
    setAggregation(agg: any): void;
    generateFilter(): string;
    createDatetimeAndTimeGrainConditions(): string;
    calculateAutoTimeGrain(): string;
}
