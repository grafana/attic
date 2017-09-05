/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import AzureMonitorQueryBuilder from './azure_monitor_query_builder';
export default class AzureMonitorDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    name: string;
    azureMonitorQueryBuilder: AzureMonitorQueryBuilder;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): any;
    testDatasource(): any;
    getMetricDefinitions(resourceGroup: string): any;
    getResourceNames(resourceGroup: string, metricDefinition: string): any;
    getMetricNames(resourceGroup: string, metricDefinition: string, resourceName: string): any;
}
