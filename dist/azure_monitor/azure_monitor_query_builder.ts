///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import AzureMonitorFilterBuilder from './azure_monitor_filter_builder';
import UrlBuilder from './url_builder';
import ResponseParser from './response_parser';

export default class AzureMonitorQueryBuilder {
  id: number;
  subscriptionId: string;
  baseUrl: string;
  resourceGroup: string;
  resourceName: string;
  url: string;
  defaultDropdownValue = 'select';

  constructor(private instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.id = instanceSettings.id;
    this.subscriptionId = instanceSettings.jsonData.subscriptionId;
    this.baseUrl = `/azuremonitor/subscriptions/${this.subscriptionId}/resourceGroups`;
    this.url = instanceSettings.url;
  }

  isConfigured() {
    return this.subscriptionId && this.subscriptionId.length > 0;
  }

  query(options) {
    const queries = _.filter(options.targets, item => {
      return item.hide !== true
        && item.azureMonitor.resourceGroup && item.azureMonitor.resourceGroup !== this.defaultDropdownValue
        && item.azureMonitor.resourceName && item.azureMonitor.resourceName !== this.defaultDropdownValue
        && item.azureMonitor.metricDefinition && item.azureMonitor.metricDefinition !== this.defaultDropdownValue
        && item.azureMonitor.metricName && item.azureMonitor.metricName !== this.defaultDropdownValue;
    }).map(target => {
      const item = target.azureMonitor;
      const resourceGroup = this.templateSrv.replace(item.resourceGroup, options.scopedVars);
      const resourceName = this.templateSrv.replace(item.resourceName, options.scopedVars);
      const metricDefinition = this.templateSrv.replace(item.metricDefinition, options.scopedVars);
      const metricName = this.templateSrv.replace(item.metricName, options.scopedVars);
      const apiVersion = '2016-09-01';
      const filterBuilder = new AzureMonitorFilterBuilder(
        item.metricName,
        options.range.from,
        options.range.to,
        item.timeGrain,
        item.timeGrainUnit
      );

      const filter = this.templateSrv.replace(filterBuilder.generateFilter(), options.scopedVars);

      const url = UrlBuilder.buildAzureMonitorQueryUrl(
        this.baseUrl,
        resourceGroup,
        metricDefinition,
        resourceName,
        apiVersion,
        filter
      );

      return {
        refId: target.refId,
        intervalMs: options.intervalMs,
        maxDataPoints: options.maxDataPoints,
        datasourceId: this.id,
        url: url,
        format: options.format,
      };
    });

    if (queries.length === 0) {
      return this.$q.when({data: []});
    }

    const promises = this.doQueries(queries);

    return this.$q.all(promises).then(results => {
      return { data: _.flatten(results) };
    }).then(ResponseParser.parseQueryResult);
  }

  doQueries(queries) {
    return _.map(queries, query => {
      return this.doRequest(query.url);
    });
  }

  annotationQuery(options) {
  }

  metricFindQuery(query: string) {
    const url = `${this.baseUrl}${query}`;
    return this.doRequest(url).then(result => {
      return ResponseParser.parseResponseValues(result, 'name', 'name');
    });
  }

  getMetricDefinitions(resourceGroup: string) {
    const url = `${this.baseUrl}/${resourceGroup}/resources?api-version=2017-06-01`;
    return this.doRequest(url).then(result => {
      return ResponseParser.parseResponseValues(result, 'type', 'type');
    });
  }

  getResourceNames(resourceGroup: string, metricDefinition: string) {
    const url = `${this.baseUrl}/${resourceGroup}/resources?api-version=2017-06-01`;
    const list = [];

    return this.doRequest(url).then(result => {
      for (let i = 0; i < result.data.value.length; i++) {
        if (result.data.value[i].type === metricDefinition) {
          list.push({
            text: result.data.value[i].name,
            value: result.data.value[i].name
          });
        }
      }
      return list;
    });
  }

  getMetricNames(resourceGroup: string, metricDefinition: string, resourceName: string) {
    const url = UrlBuilder.buildAzureMonitorGetMetricNamesUrl(
      this.baseUrl,
      resourceGroup,
      metricDefinition,
      resourceName
    );

    return this.doRequest(url).then(result => {
      return ResponseParser.parseResponseValues(result, 'name.localizedValue', 'name.value');
    });
  }

  testDatasource() {
    const url = `${this.baseUrl}?api-version=2017-06-01`;
    return this.doRequest(url).then(response => {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Successfully queried the Azure Monitor service.',
          title: 'Success'
        };
      }
    })
    .catch(error => {
      let message = 'Azure Monitor: ';
      message += error.statusText ? error.statusText + ': ' : '';

      if (error.data && error.data.error && error.data.error.code) {
        message += error.data.error.code + '. ' + error.data.error.message;
      } else if (error.data && error.data.error) {
        message += error.data.error;
      } else if (error.data) {
        message += error.data;
      } else {
        message += 'Cannot connect to Azure Monitor REST API.';
      }
      return {
        status: 'error',
        message: message
      };
    });
  }

  doRequest(url, maxRetries = 1) {
    return this.backendSrv.datasourceRequest({
      url: this.url + url,
      method: 'GET'
    }).catch(error => {
      if (maxRetries > 0) {
        return this.doRequest(url, maxRetries - 1);
      }

      throw error;
    });
  }
}
