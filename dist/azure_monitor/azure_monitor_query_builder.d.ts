/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AzureMonitorQueryBuilder {
    private instanceSettings;
    private backendSrv;
    private templateSrv;
    private $q;
    apiVersion: string;
    id: number;
    subscriptionId: string;
    baseUrl: string;
    resourceGroup: string;
    resourceName: string;
    url: string;
    defaultDropdownValue: string;
    supportedMetricNamespaces: string[];
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    isConfigured(): boolean;
    query(options: any): any;
    doQueries(queries: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): any;
    getMetricDefinitions(resourceGroup: string): any;
    getResourceNames(resourceGroup: string, metricDefinition: string): any;
    getMetricNames(resourceGroup: string, metricDefinition: string, resourceName: string): any;
    getMetricMetadata(resourceGroup: string, metricDefinition: string, resourceName: string, metricName: string): any;
    testDatasource(): any;
    isValidConfigField(field: string): boolean;
    doRequest(url: any, maxRetries?: number): any;
}
