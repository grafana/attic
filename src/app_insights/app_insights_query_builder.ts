///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import AppInsightsQuerystringBuilder from './app_insights_querystring_builder';
import ResponseParser from './response_parser';

export default class AppInsightsQueryBuilder {
  id: number;
  url: string;
  baseUrl: string;
  version = 'beta';
  applicationId: string;

  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.id = instanceSettings.id;
    this.applicationId = instanceSettings.jsonData.appInsightsAppId;
    this.baseUrl = `/appinsights/${this.version}/apps/${this.applicationId}/metrics`;
    this.url = instanceSettings.url;
  }

  isConfigured() {
    return this.applicationId && this.applicationId.length > 0;
  }

  query(options) {
    const queries = _.filter(options.targets, item => {
      return item.hide !== true;
    }).map(target => {
      const item = target.appInsights;
      const querystringBuilder = new AppInsightsQuerystringBuilder(
        options.range.from,
        options.range.to,
        options.interval
      );
      debugger;

      if (item.groupBy !== 'none') {
        querystringBuilder.setGroupBy(item.groupBy);
      }
      querystringBuilder.setAggregation(item.aggregation);
      querystringBuilder.setInterval(item.timeGrainType, item.timeGrain, item.timeGrainUnit);

      const url = `${this.baseUrl}/${item.metricName}?${querystringBuilder.generate()}`;

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
  }

  testDatasource() {
    const url = `${this.baseUrl}/metadata`;
    return this.doRequest(url).then(response => {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Successfully queried the Application Insights service.',
          title: 'Success'
        };
      }
    }).catch(error => {
      let message = 'Application Insights: ';
      message += error.statusText ? error.statusText + ': ' : '';

      if (error.data && error.data.error && error.data.error.code === 'PathNotFoundError') {
        message += 'Invalid Application Id for Application Insights service.';
      } else if (error.data && error.data.error) {
        message += error.data.error.code + '. ' + error.data.error.message;
      } else {
        message += 'Cannot connect to Application Insights REST API.';
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

  getMetricNames() {
    const url = `${this.baseUrl}/metadata`;
    return this.doRequest(url).then(ResponseParser.parseMetricNames);
  }

  getMetricMetadata(metricName: string) {
    const url = `${this.baseUrl}/metadata`;
    return this.doRequest(url).then(result => {
      return ResponseParser.parseMetadata(result, metricName);
    });
  }
}
