///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';
import AzureMonitorFilterBuilder from './azure_monitor_filter_builder';

export default class AzureMonitorQueryBuilder {
  id: number;
  subscriptionId: string;
  baseUrl: string;
  resourceGroup: string;
  resourceName: string;
  url: string;

  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.id = instanceSettings.id;
    this.subscriptionId = instanceSettings.jsonData.subscriptionId;
    this.baseUrl = `/azuremonitor/subscriptions/${this.subscriptionId}/resourceGroups`;

    this.url = instanceSettings.url;
  }

  query(options) {
    const queries = _.filter(options.targets, item => {
      return item.hide !== true;
    }).map(item => {
      const resourceGroup = this.templateSrv.replace(item.resourceGroup, options.scopedVars);
      const resourceName = this.templateSrv.replace(item.resourceName, options.scopedVars);
      const resourceProviderNamespace = this.templateSrv.replace(item.resourceProviderNamespace, options.scopedVars);
      const resourceType = this.templateSrv.replace(item.resourceType, options.scopedVars);
      const apiVersion = this.templateSrv.replace(item.apiVersion, options.scopedVars);
      const filterBuilder = new AzureMonitorFilterBuilder(
        item.filter,
        options.range.from,
        options.range.to,
        item.timeGrain,
        item.timeGrainUnit
      );
      const filter = this.templateSrv.replace(filterBuilder.generateFilter(), options.scopedVars);

      const url = `${this.baseUrl}/${resourceGroup}/providers/${resourceProviderNamespace}/${resourceType}/${resourceName}` +
        `/providers/microsoft.insights/metrics?api-version=${apiVersion}&$filter=${filter}`;

      return {
        refId: item.refId,
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
    }).then(this.processQueryResult);
  }

  doQueries(queries) {
    return _.map(queries, query => {
      return this.doRequest({url: query.url, method: 'GET'});
    });
  }

  processQueryResult(result) {
    const data = [];
    for (let i = 0; i < result.data.length; i++) {
      const dataPoints = [];
      for (let j = 0; j < result.data[i].data.value[0].data.length; j++) {
        const epoch = moment(result.data[i].data.value[0].data[j].timeStamp).valueOf();
        dataPoints.push([result.data[i].data.value[0].data[j].average, epoch]);
      }
      data.push({target: result.data[i].data.value[0].name.value, datapoints: dataPoints});
    }
    return {data: data};
  }

  annotationQuery(options) {
  }

  metricFindQuery(query: string) {
  }

  testDatasource() {
    const url = `${this.baseUrl}?api-version=2016-09-01`;
    return this.doRequest({
      url: url,
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Successfully queried the Azure Monitor service.',
          title: 'Success'
        };
      }
    })
    .catch(error => {
      let message = error.statusText ? error.statusText + ': ' : '';
      if (error.data && error.data.error && error.data.error.code) {
        message += error.data.error.code + '. ' + error.data.error.message;
      } else if (error.data && error.data.error) {
        message += error.data.error;
      } else if (error.data) {
        message += error.data;
      } else {
        message = "Cannot connect to Azure Monitor REST API.";
      }
      return {
        status: "error",
        message: message,
        title: "Error"
      };
    });
  }

  doRequest(options) {
    options.url = this.url + options.url;
    return this.backendSrv.datasourceRequest(options);
  }
}
