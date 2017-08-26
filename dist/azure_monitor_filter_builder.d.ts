/// <reference path="app/headers/common.d.ts" />
export default class AzureMonitorFilterBuilder {
    private filter;
    private from;
    private to;
    constructor(filter: string, from: any, to: any);
    generateFilter(): string;
}
