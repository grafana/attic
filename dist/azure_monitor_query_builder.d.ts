/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class AzureMonitorQueryBuilder {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    subscriptionId: string;
    baseUrl: string;
    resourceGroup: string;
    resourceName: string;
    url: string;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    doQueries(queries: any): any;
    processQueryResult(result: any): {
        data: any[];
    };
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
    doRequest(options: any): any;
}
