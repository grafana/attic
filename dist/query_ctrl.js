///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, sdk_1;
    var AzureMonitorQueryCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            AzureMonitorQueryCtrl = (function (_super) {
                __extends(AzureMonitorQueryCtrl, _super);
                /** @ngInject **/
                function AzureMonitorQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    this.defaultDropdownValue = 'select';
                    this.defaults = {
                        queryType: 'Azure Monitor',
                        azureMonitor: {
                            resourceGroup: this.defaultDropdownValue,
                            metricDefinition: this.defaultDropdownValue,
                            resourceName: this.defaultDropdownValue,
                            metricName: this.defaultDropdownValue,
                            timeGrain: 1,
                            timeGrainUnit: 'hour'
                        }
                    };
                    lodash_1.default.defaultsDeep(this.target, this.defaults);
                }
                AzureMonitorQueryCtrl.prototype.getResourceGroups = function (query) {
                    return this.datasource.metricFindQuery('?api-version=2017-06-01');
                };
                AzureMonitorQueryCtrl.prototype.getMetricDefinitions = function (query) {
                    if (!this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue) {
                        return;
                    }
                    return this.datasource.getMetricDefinitions(this.target.azureMonitor.resourceGroup);
                };
                AzureMonitorQueryCtrl.prototype.getResourceNames = function (query) {
                    if (!this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue
                        || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue) {
                        return;
                    }
                    return this.datasource.getResourceNames(this.target.azureMonitor.resourceGroup, this.target.azureMonitor.metricDefinition);
                };
                AzureMonitorQueryCtrl.prototype.getMetricNames = function (query) {
                    if (!this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue
                        || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue
                        || !this.target.azureMonitor.resourceName || this.target.azureMonitor.resourceName === this.defaultDropdownValue) {
                        return;
                    }
                    return this.datasource.getMetricNames(this.target.azureMonitor.resourceGroup, this.target.azureMonitor.metricDefinition, this.target.azureMonitor.resourceName);
                };
                AzureMonitorQueryCtrl.prototype.onResourceGroupChange = function () {
                    this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
                    this.target.azureMonitor.resourceName = this.defaultDropdownValue;
                    this.target.azureMonitor.metricName = this.defaultDropdownValue;
                };
                AzureMonitorQueryCtrl.prototype.onMetricDefinitionChange = function () {
                    this.target.azureMonitor.resourceName = this.defaultDropdownValue;
                    this.target.azureMonitor.metricName = this.defaultDropdownValue;
                };
                AzureMonitorQueryCtrl.prototype.onResourceNameChange = function () {
                    this.target.azureMonitor.metricName = this.defaultDropdownValue;
                };
                AzureMonitorQueryCtrl.prototype.onMetricNameChange = function () {
                    if (this.target.azureMonitor.resourceGroup && this.target.azureMonitor.resourceGroup !== this.defaultDropdownValue
                        && this.target.azureMonitor.metricDefinition && this.target.azureMonitor.metricDefinition !== this.defaultDropdownValue
                        && this.target.azureMonitor.resourceName && this.target.azureMonitor.resourceName !== this.defaultDropdownValue) {
                        this.refresh();
                    }
                };
                AzureMonitorQueryCtrl.templateUrl = 'partials/query.editor.html';
                return AzureMonitorQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("AzureMonitorQueryCtrl", AzureMonitorQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map