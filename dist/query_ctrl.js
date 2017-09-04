///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1;
    var AzureMonitorQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            AzureMonitorQueryCtrl = (function (_super) {
                __extends(AzureMonitorQueryCtrl, _super);
                /** @ngInject **/
                function AzureMonitorQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    this.target.timeGrain = 1;
                    this.target.timeGrainUnit = 'hour';
                }
                AzureMonitorQueryCtrl.prototype.getResourceGroups = function (query) {
                    return this.datasource.metricFindQuery('?api-version=2017-06-01');
                };
                AzureMonitorQueryCtrl.prototype.getMetricDefinitions = function (query) {
                    return this.datasource.getMetricDefinitions(this.target.resourceGroup);
                };
                AzureMonitorQueryCtrl.prototype.getResourceNames = function (query) {
                    return this.datasource.getResourceNames(this.target.resourceGroup, this.target.metricDefinition);
                };
                AzureMonitorQueryCtrl.templateUrl = 'partials/query.editor.html';
                return AzureMonitorQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("AzureMonitorQueryCtrl", AzureMonitorQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map