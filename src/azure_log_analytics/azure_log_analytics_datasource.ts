///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import AzureLogAnalyticsQuerystringBuilder from './azure_log_analytics_querystring_builder';
import ResponseParser from './response_parser';

export default class AzureLogAnalyticsDatasource {
  id: number;
  url: string;
  baseUrl: string;
  applicationId: string;
  azureMonitorUrl: string;

  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.id = instanceSettings.id;
    this.baseUrl = `/loganalyticsazure`;
    this.url = instanceSettings.url;

    const azureSubscription = instanceSettings.jsonData.subscriptionId;
    const azureCloud = instanceSettings.jsonData.cloudName || 'azuremonitor';
    this.azureMonitorUrl = `/${azureCloud}/subscriptions/${azureSubscription}`;
  }

  getWorkspaces() {
    const workspaceListUrl =
      this.azureMonitorUrl + '/providers/Microsoft.OperationalInsights/workspaces?api-version=2017-04-26-preview';
    return this.doRequest(workspaceListUrl).then(response => {
      return (
        _.map(response.data.value, val => {
          return { text: val.name, value: val.properties.customerId };
        }) || []
      );
    });
  }

  getSchema(workspace) {
    const url = `${this.baseUrl}/${workspace}/query/schema`;

    return this.doRequest(url).then(response => {
      return new ResponseParser(response.data).parseSchemaResult();
    });
  }

  query(options) {
    const queries = _.filter(options.targets, item => {
      return item.hide !== true;
    }).map(target => {
      const item = target.azureLogAnalytics;

      const querystringBuilder = new AzureLogAnalyticsQuerystringBuilder(item.query, options);
      const generated = querystringBuilder.generate();
      const querystring = this.templateSrv.replace(generated.uriString, options.scopedVars);

      const url = `${this.baseUrl}/${item.workspace}/query?${querystring}`;

      return {
        refId: target.refId,
        intervalMs: options.intervalMs,
        maxDataPoints: options.maxDataPoints,
        datasourceId: this.id,
        url: url,
        query: generated.rawQuery,
        format: options.format,
        resultFormat: item.resultFormat,
      };
    });

    if (queries.length === 0) {
      return this.$q.when({ data: [] });
    }

    const promises = this.doQueries(queries);

    return this.$q.all(promises).then(results => {
      return new ResponseParser(results).parseQueryResult();
    });
  }

  doQueries(queries) {
    return _.map(queries, query => {
      return this.doRequest(query.url)
        .then(result => {
          return {
            result: result,
            query: query,
          };
        })
        .catch(err => {
          throw {
            error: err,
            query: query,
          };
        });
    });
  }

  doRequest(url, maxRetries = 1) {
    return this.backendSrv
      .datasourceRequest({
        url: this.url + url,
        method: 'GET',
      })
      .catch(error => {
        if (maxRetries > 0) {
          return this.doRequest(url, maxRetries - 1);
        }

        throw error;
      });
  }
}
