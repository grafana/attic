import _ from 'lodash';
import LogAnalyticsQuerystringBuilder from '../log_analytics/querystring_builder';
import ResponseParser from './response_parser';

export default class AzureLogAnalyticsDatasource {
  id: number;
  url: string;
  baseUrl: string;
  applicationId: string;
  azureMonitorUrl: string;
  firstWorkspace: string;

  /** @ngInject **/
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
    if (!workspace) {
      return Promise.resolve();
    }
    const url = `${this.baseUrl}/${workspace}/metadata`;

    return this.doRequest(url).then(response => {
      return new ResponseParser(response.data).parseSchemaResult();
    });
  }

  query(options) {
    const queries = _.filter(options.targets, item => {
      return item.hide !== true;
    }).map(target => {
      const item = target.azureLogAnalytics;

      const querystringBuilder = new LogAnalyticsQuerystringBuilder(
        this.templateSrv.replace(item.query, options.scopedVars, this.interpolateVariable),
        options,
        'TimeGenerated'
      );
      const generated = querystringBuilder.generate();

      const url = `${this.baseUrl}/${item.workspace}/query?${generated.uriString}`;

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

    if (!queries || queries.length === 0) {
      return;
    }

    const promises = this.doQueries(queries);

    return this.$q.all(promises).then(results => {
      return new ResponseParser(results).parseQueryResult();
    });
  }

  metricFindQuery(query: string) {
    return this.getFirstWorkspace().then(workspace => {
      const queries: any[] = this.buildQuery(query, null, workspace);

      const promises = this.doQueries(queries);

      return this.$q.all(promises).then(results => {
        return new ResponseParser(results).parseToVariables();
      });
    });
  }

  private buildQuery(query: string, options: any, workspace: any) {
    const querystringBuilder = new LogAnalyticsQuerystringBuilder(
      this.templateSrv.replace(query, {}, this.interpolateVariable),
      options,
      'TimeGenerated'
    );
    const querystring = querystringBuilder.generate().uriString;
    const url = `${this.baseUrl}/${workspace}/query?${querystring}`;
    const queries: any[] = [];
    queries.push({
      datasourceId: this.id,
      url: url,
      resultFormat: 'table',
    });
    return queries;
  }

  interpolateVariable(value, variable) {
    if (typeof value === 'string') {
      if (variable.multi || variable.includeAll) {
        return "'" + value + "'";
      } else {
        return value;
      }
    }

    if (typeof value === 'number') {
      return value;
    }

    var quotedValues = _.map(value, function(val) {
      if (typeof value === 'number') {
        return value;
      }

      return "'" + val + "'";
    });
    return quotedValues.join(',');
  }

  getFirstWorkspace() {
    if (this.firstWorkspace) {
      return Promise.resolve(this.firstWorkspace);
    }

    return this.getWorkspaces().then(workspaces => {
      this.firstWorkspace = workspaces[0].value;
      return this.firstWorkspace;
    });
  }

  annotationQuery(options) {
    if (!options.annotation.rawQuery) {
      return this.$q.reject({
        message: 'Query missing in annotation definition',
      });
    }

    const queries: any[] = this.buildQuery(options.annotation.rawQuery, options, options.annotation.workspace);

    const promises = this.doQueries(queries);

    return this.$q.all(promises).then(results => {
      const annotations = new ResponseParser(results).transformToAnnotations(options);
      return annotations;
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
