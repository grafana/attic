///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import AzureMonitorQueryBuilder from './azure_monitor/azure_monitor_query_builder';
import AppInsightsQueryBuilder from './app_insights/app_insights_query_builder';

export default class AzureMonitorDatasource {
  id: number;
  name: string;
  azureMonitorQueryBuilder: AzureMonitorQueryBuilder;
  appInsightsQueryBuilder: AppInsightsQueryBuilder;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.azureMonitorQueryBuilder = new AzureMonitorQueryBuilder(instanceSettings, this.backendSrv, this.templateSrv, this.$q);
    this.appInsightsQueryBuilder = new AppInsightsQueryBuilder(instanceSettings, this.backendSrv, this.templateSrv, this.$q);
  }

  query(options) {
    const promises = [];
    const azureMonitorOptions = _.cloneDeep(options);
    const appInsightsTargets = _.cloneDeep(options);

    azureMonitorOptions.targets = _.filter(azureMonitorOptions.targets, ['queryType', 'Azure Monitor']);
    appInsightsTargets.targets = _.filter(appInsightsTargets.targets, ['queryType', 'Application Insights']);

    if (azureMonitorOptions.targets.length > 0) {
      promises.push(this.azureMonitorQueryBuilder.query(azureMonitorOptions));
    }

    if (appInsightsTargets.targets.length > 0) {
      promises.push(this.appInsightsQueryBuilder.query(appInsightsTargets));
    }

    return this.$q.all(promises).then(results => {
      return { data: _.flatten(results) };
    });
  }

  annotationQuery(options) {
    return this.azureMonitorQueryBuilder.annotationQuery(options);
  }

  metricFindQuery(query: string) {
    return this.azureMonitorQueryBuilder.metricFindQuery(query);
  }

  testDatasource() {
    const promises = [];

    if (this.azureMonitorQueryBuilder.isConfigured()) {
      promises.push(this.azureMonitorQueryBuilder.testDatasource());
    }

    if (this.appInsightsQueryBuilder.isConfigured()) {
      promises.push(this.appInsightsQueryBuilder.testDatasource());
    }

    if (promises.length === 0) {
      return {
        status: 'error',
        message: `Nothing configured. At least one of the API's must be configured.`,
        title: 'Error'
      };
    }

    return this.$q.all(promises).then(results => {
      let status = 'success';
      let message = '';

      for (let i = 0; i < results.length; i++) {
        if (results[i].status !== 'success') {
          status = results[i].status;
        }
        message += `${i+1}. ${results[i].message} `;
      }

      return {
        status: status,
        message: message,
        title: _.upperFirst(status)
      };
    });
  }

  getMetricDefinitions(resourceGroup: string) {
    return this.azureMonitorQueryBuilder.getMetricDefinitions(resourceGroup);
  }

  getResourceNames(resourceGroup: string, metricDefinition: string) {
    return this.azureMonitorQueryBuilder.getResourceNames(resourceGroup, metricDefinition);
  }

  getMetricNames(resourceGroup: string, metricDefinition: string, resourceName: string) {
    return this.azureMonitorQueryBuilder.getMetricNames(resourceGroup, metricDefinition, resourceName);
  }
}
