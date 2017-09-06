///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';

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
      timeGrainUnit: 'hour'
    }
  };

  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);

    _.defaultsDeep(this.target, this.defaults);
  }

  getResourceGroups(query) {
    return this.datasource.metricFindQuery('?api-version=2017-06-01');
  }

  getMetricDefinitions(query) {
    if (!this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue) {
      return;
    }
    return this.datasource.getMetricDefinitions(this.target.azureMonitor.resourceGroup);
  }

  getResourceNames(query) {
    if (!this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue
      || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue) {
      return;
    }

    return this.datasource.getResourceNames(this.target.azureMonitor.resourceGroup, this.target.azureMonitor.metricDefinition);
  }

  getMetricNames(query) {
    if (!this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue
      || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue
      || !this.target.azureMonitor.resourceName || this.target.azureMonitor.resourceName === this.defaultDropdownValue) {
      return;
    }

    return this.datasource.getMetricNames(
      this.target.azureMonitor.resourceGroup,
      this.target.azureMonitor.metricDefinition,
      this.target.azureMonitor.resourceName
    );
  }

  onResourceGroupChange() {
    this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
    this.target.azureMonitor.resourceName = this.defaultDropdownValue;
    this.target.azureMonitor.metricName = this.defaultDropdownValue;
  }

  onMetricDefinitionChange() {
    this.target.azureMonitor.resourceName = this.defaultDropdownValue;
    this.target.azureMonitor.metricName = this.defaultDropdownValue;
  }

  onResourceNameChange() {
    this.target.azureMonitor.metricName = this.defaultDropdownValue;
  }

  onMetricNameChange() {
    if (this.target.azureMonitor.resourceGroup && this.target.azureMonitor.resourceGroup !== this.defaultDropdownValue
      && this.target.azureMonitor.metricDefinition && this.target.azureMonitor.metricDefinition !== this.defaultDropdownValue
      && this.target.azureMonitor.resourceName && this.target.azureMonitor.resourceName !== this.defaultDropdownValue){
      this.refresh();
    }
  }
}
