/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AzureMonitorQueryBuilder {
    private instanceSettings;
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    subscriptionId: string;
    baseUrl: string;
    resourceGroup: string;
    resourceName: string;
    url: string;
    defaultDropdownValue: string;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    isConfigured(): boolean;
    query(options: any): any;
    doQueries(queries: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): any;
    getMetricDefinitions(resourceGroup: string): any;
    getResourceNames(resourceGroup: string, metricDefinition: string): any;
    getMetricNames(resourceGroup: string, metricDefinition: string, resourceName: string): any;
    testDatasource(): any;
    doRequest(url: any): any;
}
