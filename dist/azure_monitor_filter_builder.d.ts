/// <reference path="app/headers/common.d.ts" />
export default class AzureMonitorFilterBuilder {
    private filter;
    private from;
    private to;
    private timeGrain;
    private timeGrainUnit;
    constructor(filter: string, from: any, to: any, timeGrain: number, timeGrainUnit: string);
    generateFilter(): string;
    createISO8601Duration(): string;
}
