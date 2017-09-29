///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';
import './css/query_editor.css!';
import TimegrainConverter from './time_grain_converter';

export class AzureMonitorQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  defaultDropdownValue = 'select';

  defaults = {
    queryType: 'Azure Monitor',
    azureMonitor: {
      resourceGroup: this.defaultDropdownValue,
      metricDefinition: this.defaultDropdownValue,
      resourceName: this.defaultDropdownValue,
      metricName: this.defaultDropdownValue,
      timeGrain: 1,
      timeGrainUnit: 'minute',
      dimensionFilter: '*'
    },
    appInsights: {
      metricName: this.defaultDropdownValue,
      groupBy: 'none',
      timeGrainType: 'auto'
    }
  };

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv) {
    super($scope, $injector);

    _.defaultsDeep(this.target, this.defaults);
  }

  replace(variable: string) {
    return this.templateSrv.replace(variable, this.panelCtrl.panel.scopedVars);
  }

  /* Azure Monitor Section */
  getResourceGroups(query) {
    if (this.target.queryType !== 'Azure Monitor' || !this.datasource.azureMonitorQueryBuilder.isConfigured()) {
      return;
    }

    return this.datasource.getResourceGroups();
  }

  getMetricDefinitions(query) {
    if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup
      || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue) {
      return;
    }
    return this.datasource.getMetricDefinitions(this.replace(this.target.azureMonitor.resourceGroup));
  }

  getResourceNames(query) {
    if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup
      || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition
      || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue) {
      return;
    }

    const rg = this.templateSrv.replace(this.target.azureMonitor.resourceGroup, this.panelCtrl.panel.scopedVars);

    return this.datasource.getResourceNames(
      this.replace(this.target.azureMonitor.resourceGroup),
      this.replace(this.target.azureMonitor.metricDefinition)
    );
  }

  getMetricNames(query) {
    if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup
      || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition
      || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue || !this.target.azureMonitor.resourceName
      || this.target.azureMonitor.resourceName === this.defaultDropdownValue) {
      return;
    }

    return this.datasource.getMetricNames(
      this.replace(this.target.azureMonitor.resourceGroup),
      this.replace(this.target.azureMonitor.metricDefinition),
      this.replace(this.target.azureMonitor.resourceName)
    );
  }

  onResourceGroupChange() {
    this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
    this.target.azureMonitor.resourceName = this.defaultDropdownValue;
    this.target.azureMonitor.metricName = this.defaultDropdownValue;
    this.target.azureMonitor.dimensions = [];
    this.target.azureMonitor.dimension = '';
  }

  onMetricDefinitionChange() {
    this.target.azureMonitor.resourceName = this.defaultDropdownValue;
    this.target.azureMonitor.metricName = this.defaultDropdownValue;
    this.target.azureMonitor.dimensions = [];
    this.target.azureMonitor.dimension = '';
  }

  onResourceNameChange() {
    this.target.azureMonitor.metricName = this.defaultDropdownValue;
    this.target.azureMonitor.dimensions = [];
    this.target.azureMonitor.dimension = '';
  }

  onMetricNameChange() {
    if (!this.target.azureMonitor.metricName || this.target.azureMonitor.metricName === this.defaultDropdownValue) {
      return;
    }

    return this.datasource.getMetricMetadata(
      this.replace(this.target.azureMonitor.resourceGroup),
      this.replace(this.target.azureMonitor.metricDefinition),
      this.replace(this.target.azureMonitor.resourceName),
      this.replace(this.target.azureMonitor.metricName)
    ).then(metadata => {
      this.target.azureMonitor.aggOptions = metadata.supportedAggTypes || [metadata.primaryAggType];
      this.target.azureMonitor.aggregation = metadata.primaryAggType;
      this.target.azureMonitor.dimensions = metadata.dimensions;
      if (metadata.dimensions.length > 0) {
        this.target.azureMonitor.dimension = metadata.dimensions[0].value;
      }
      return this.refresh();
    });
  }

  getAutoInterval() {
    return TimegrainConverter.findClosestTimeGrain(this.panelCtrl.interval, ['1m', '5m', '15m', '30m', '1h', '6h', '12h', '1d']);
  }

  /* Application Insights Section */
  getAppInsightsMetricNames() {
    return this.datasource.getAppInsightsMetricNames();
  }

  onAppInsightsMetricNameChange() {
    if (!this.target.appInsights.metricName || this.target.appInsights.metricName === this.defaultDropdownValue) {
      return;
    }

    return this.datasource.getAppInsightsMetricMetadata(this.replace(this.target.appInsights.metricName))
      .then(aggData => {
        this.target.appInsights.aggOptions = aggData.supportedAggTypes;
        this.target.appInsights.groupByOptions = aggData.supportedGroupBy;
        this.target.appInsights.aggregation = aggData.primaryAggType;
        return this.refresh();
      });
  }

  getAppInsightsGroupBySegments(query) {
    return _.map(this.target.appInsights.groupByOptions, option => {
      return {text: option, value: option};
    });
  }

  resetAppInsightsGroupBy() {
    this.target.appInsights.groupBy = 'none';
    this.refresh();
  }

  updateTimeGrainType() {
    if (this.target.appInsights.timeGrainType === 'specific') {
      this.target.appInsights.timeGrain = 1;
      this.target.appInsights.timeGrainUnit = 'minute';
    } else {
      this.target.appInsights.timeGrain = '';
    }
    this.refresh();
  }
}
