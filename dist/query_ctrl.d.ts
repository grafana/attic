/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export declare class AzureMonitorQueryCtrl extends QueryCtrl {
    static templateUrl: string;
    defaultDropdownValue: string;
    defaults: {
        queryType: string;
        azureMonitor: {
            resourceGroup: string;
            metricDefinition: string;
            resourceName: string;
            metricName: string;
            timeGrain: number;
            timeGrainUnit: string;
        };
    };
    /** @ngInject **/
    constructor($scope: any, $injector: any);
    getResourceGroups(query: any): any;
    getMetricDefinitions(query: any): any;
    getResourceNames(query: any): any;
    getMetricNames(query: any): any;
    onResourceGroupChange(): void;
    onMetricDefinitionChange(): void;
    onResourceNameChange(): void;
    onMetricNameChange(): void;
}
