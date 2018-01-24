import AzureMonitorQueryBuilder from './azure_monitor/azure_monitor_query_builder';
import AppInsightsQueryBuilder from './app_insights/app_insights_query_builder';
export default class AzureMonitorDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    name: string;
    azureMonitorQueryBuilder: AzureMonitorQueryBuilder;
    appInsightsQueryBuilder: AppInsightsQueryBuilder;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
    getResourceGroups(): any;
    getMetricDefinitions(resourceGroup: string): any;
    getResourceNames(resourceGroup: string, metricDefinition: string): any;
    getMetricNames(resourceGroup: string, metricDefinition: string, resourceName: string): any;
    getMetricMetadata(resourceGroup: string, metricDefinition: string, resourceName: string, metricName: string): any;
    getAppInsightsMetricNames(): any;
    getAppInsightsMetricMetadata(metricName: any): any;
}
