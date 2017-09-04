/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export declare class AzureMonitorQueryCtrl extends QueryCtrl {
    static templateUrl: string;
    /** @ngInject **/
    constructor($scope: any, $injector: any);
    getResourceGroups(query: any): any;
    getMetricDefinitions(query: any): any;
}
