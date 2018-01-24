export default class AzureMonitorFilterBuilder {
    private metricName;
    private from;
    private to;
    timeGrain: number;
    timeGrainUnit: string;
    grafanaInterval: string;
    aggregation: string;
    timeGrainInterval: string;
    dimension: string;
    dimensionFilter: string;
    allowedTimeGrains: string[];
    constructor(metricName: string, from: any, to: any, timeGrain: number, timeGrainUnit: string, grafanaInterval: string);
    setAggregation(agg: any): void;
    setDimensionFilter(dimension: any, dimensionFilter: any): void;
    generateFilter(): string;
    createDatetimeAndTimeGrainConditions(): string;
    calculateAutoTimeGrain(): string;
}
