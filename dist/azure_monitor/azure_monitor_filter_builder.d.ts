/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AzureMonitorFilterBuilder {
    private metricName;
    private from;
    private to;
    private timeGrain;
    private timeGrainUnit;
    constructor(metricName: string, from: any, to: any, timeGrain: number, timeGrainUnit: string);
    generateFilter(): string;
    createISO8601Duration(): string;
}
