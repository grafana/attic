///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';

export default class AppInsightsQueryBuilder {
  id: number;
  url: string;
  baseUrl: string;
  version = 'beta';
  applicationId: string;

  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.id = instanceSettings.id;
    this.applicationId = instanceSettings.jsonData.appInsightsAppId;
    this.baseUrl = `/appinsights/${this.version}/apps/${this.applicationId}`;
    this.url = instanceSettings.url;
  }

  isConfigured() {
    return this.applicationId && this.applicationId.length > 0;
  }

  query(options) {
  }

  annotationQuery(options) {
  }

  metricFindQuery(query: string) {
  }

  testDatasource() {
    const url = `${this.baseUrl}/metrics/metadata`;
    return this.backendSrv.datasourceRequest({
      url: this.url + url,
      method: 'GET'
    }).then(response => {
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
}
