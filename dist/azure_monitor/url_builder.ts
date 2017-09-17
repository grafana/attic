///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

export default class UrlBuilder {
  static buildAzureMonitorQueryUrl(baseUrl: string, resourceGroup: string, metricDefinition: string,
    resourceName: string, apiVersion: string, filter: string) {
    return `${baseUrl}/${resourceGroup}/providers/${metricDefinition}/${resourceName}` +
    `/providers/microsoft.insights/metrics?api-version=${apiVersion}&${filter}`;
  }

  static buildAzureMonitorGetMetricNamesUrl(baseUrl: string, resourceGroup: string, metricDefinition: string, resourceName: string ) {
    return `${baseUrl}/${resourceGroup}/providers/${metricDefinition}/${resourceName}` +
    `/providers/microsoft.insights/metricdefinitions?api-version=2016-03-01`;
  }
}
