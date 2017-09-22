///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'app/plugins/sdk', './css/query_editor.css!'], function(exports_1) {
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
            },
            function (_1) {}],
        execute: function() {
            AzureMonitorQueryCtrl = (function (_super) {
                __extends(AzureMonitorQueryCtrl, _super);
                /** @ngInject **/
                function AzureMonitorQueryCtrl($scope, $injector, templateSrv) {
                    _super.call(this, $scope, $injector);
                    this.templateSrv = templateSrv;
                    this.defaultDropdownValue = 'select';
                    this.defaults = {
                        queryType: 'Azure Monitor',
                        azureMonitor: {
                            resourceGroup: this.defaultDropdownValue,
                            metricDefinition: this.defaultDropdownValue,
                            resourceName: this.defaultDropdownValue,
                            metricName: this.defaultDropdownValue,
                            timeGrain: 1,
                            timeGrainUnit: 'minute'
                        },
                        appInsights: {
                            metricName: this.defaultDropdownValue,
                            groupBy: 'none',
                            timeGrainType: 'auto'
                        }
                    };
                    lodash_1.default.defaultsDeep(this.target, this.defaults);
                }
                AzureMonitorQueryCtrl.prototype.replace = function (variable) {
                    return this.templateSrv.replace(variable, this.panelCtrl.panel.scopedVars);
                };
                /* Azure Monitor Section */
                AzureMonitorQueryCtrl.prototype.getResourceGroups = function (query) {
                    if (this.target.queryType !== 'Azure Monitor' || !this.datasource.azureMonitorQueryBuilder.isConfigured()) {
                        return;
                    }
                    return this.datasource.getResourceGroups();
                };
                AzureMonitorQueryCtrl.prototype.getMetricDefinitions = function (query) {
                    if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup
                        || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue) {
                        return;
                    }
                    return this.datasource.getMetricDefinitions(this.replace(this.target.azureMonitor.resourceGroup));
                };
                AzureMonitorQueryCtrl.prototype.getResourceNames = function (query) {
                    if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup
                        || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition
                        || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue) {
                        return;
                    }
                    var rg = this.templateSrv.replace(this.target.azureMonitor.resourceGroup, this.panelCtrl.panel.scopedVars);
                    return this.datasource.getResourceNames(this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition));
                };
                AzureMonitorQueryCtrl.prototype.getMetricNames = function (query) {
                    if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup
                        || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition
                        || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue || !this.target.azureMonitor.resourceName
                        || this.target.azureMonitor.resourceName === this.defaultDropdownValue) {
                        return;
                    }
                    return this.datasource.getMetricNames(this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName));
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
                    var _this = this;
                    if (!this.target.azureMonitor.metricName || this.target.azureMonitor.metricName === this.defaultDropdownValue) {
                        return;
                    }
                    return this.datasource.getAggregations(this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName), this.replace(this.target.azureMonitor.metricName)).then(function (aggData) {
                        _this.target.azureMonitor.aggOptions = aggData.supportedAggTypes || [aggData.primaryAggType];
                        _this.target.azureMonitor.aggregation = aggData.primaryAggType;
                        return _this.refresh();
                    });
                };
                AzureMonitorQueryCtrl.prototype.getAutoInterval = function () {
                    if (this.panelCtrl.interval[this.panelCtrl.interval.length - 1] === 's') {
                        return '1m';
                    }
                    return this.panelCtrl.interval;
                };
                /* Application Insights Section */
                AzureMonitorQueryCtrl.prototype.getAppInsightsMetricNames = function () {
                    return this.datasource.getAppInsightsMetricNames();
                };
                AzureMonitorQueryCtrl.prototype.onAppInsightsMetricNameChange = function () {
                    var _this = this;
                    if (!this.target.appInsights.metricName || this.target.appInsights.metricName === this.defaultDropdownValue) {
                        return;
                    }
                    return this.datasource.getAppInsightsMetricMetadata(this.replace(this.target.appInsights.metricName))
                        .then(function (aggData) {
                        _this.target.appInsights.aggOptions = aggData.supportedAggTypes;
                        _this.target.appInsights.groupByOptions = aggData.supportedGroupBy;
                        _this.target.appInsights.aggregation = aggData.primaryAggType;
                        return _this.refresh();
                    });
                };
                AzureMonitorQueryCtrl.prototype.getAppInsightsGroupBySegments = function (query) {
                    return lodash_1.default.map(this.target.appInsights.groupByOptions, function (option) {
                        return { text: option, value: option };
                    });
                };
                AzureMonitorQueryCtrl.prototype.resetAppInsightsGroupBy = function () {
                    this.target.appInsights.groupBy = 'none';
                    this.refresh();
                };
                AzureMonitorQueryCtrl.prototype.updateTimeGrainType = function () {
                    if (this.target.appInsights.timeGrainType === 'specific') {
                        this.target.appInsights.timeGrain = 1;
                        this.target.appInsights.timeGrainUnit = 'minute';
                    }
                    else {
                        this.target.appInsights.timeGrain = '';
                    }
                    this.refresh();
                };
                AzureMonitorQueryCtrl.templateUrl = 'partials/query.editor.html';
                return AzureMonitorQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("AzureMonitorQueryCtrl", AzureMonitorQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map