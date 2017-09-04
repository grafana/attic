///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import AzureMonitorQueryBuilder from './azure_monitor_query_builder';

export default class AzureMonitorDatasource {
  id: number;
  name: string;
  azureMonitorQueryBuilder: AzureMonitorQueryBuilder;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.azureMonitorQueryBuilder = new AzureMonitorQueryBuilder(instanceSettings, this.backendSrv, this.templateSrv, this.$q);
  }

  query(options) {
   return this.azureMonitorQueryBuilder.query(options);
  }

  annotationQuery(options) {
    return this.azureMonitorQueryBuilder.annotationQuery(options);
  }

  metricFindQuery(query: string) {
    return this.azureMonitorQueryBuilder.metricFindQuery(query);
  }

  testDatasource() {
    return this.azureMonitorQueryBuilder.testDatasource();
  }

  getMetricDefinitions(resourceGroup: string) {
    return this.azureMonitorQueryBuilder.getMetricDefinitions(resourceGroup);
  }
}
