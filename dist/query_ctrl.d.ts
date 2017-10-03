/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export declare class AzureMonitorQueryCtrl extends QueryCtrl {
    private templateSrv;
    static templateUrl: string;
    defaultDropdownValue: string;
    defaults: {
        queryType: string;
        azureMonitor: {
            resourceGroup: string;
            metricDefinition: string;
            resourceName: string;
            metricName: string;
            timeGrain: string;
            timeGrainUnit: string;
            dimensionFilter: string;
        };
        appInsights: {
            metricName: string;
            groupBy: string;
            timeGrainType: string;
        };
    };
    /** @ngInject **/
    constructor($scope: any, $injector: any, templateSrv: any);
    replace(variable: string): any;
    getResourceGroups(query: any): any;
    getMetricDefinitions(query: any): any;
    getResourceNames(query: any): any;
    getMetricNames(query: any): any;
    onResourceGroupChange(): void;
    onMetricDefinitionChange(): void;
    onResourceNameChange(): void;
    onMetricNameChange(): any;
    getAutoInterval(): any;
    getAppInsightsAutoInterval(): any;
    getAppInsightsMetricNames(): any;
    onAppInsightsMetricNameChange(): any;
    getAppInsightsGroupBySegments(query: any): any;
    resetAppInsightsGroupBy(): void;
    updateTimeGrainType(): void;
}
