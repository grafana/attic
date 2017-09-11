/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AppInsightsQueryBuilder {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    url: string;
    baseUrl: string;
    version: string;
    applicationId: string;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    isConfigured(): boolean;
    query(options: any): any;
    doQueries(queries: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
    doRequest(url: any, maxRetries?: number): any;
    getMetricNames(): any;
    getMetricMetadata(metricName: string): any;
}
