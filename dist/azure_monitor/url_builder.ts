///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

export default class UrlBuilder {
  static buildAzureMonitorQueryUrl(baseUrl: string, resourceGroup: string, metricDefinition: string,
    resourceName: string, apiVersion: string, filter: string) {

    if (metricDefinition === 'Microsoft.Sql/servers/databases') {
      const rn = resourceName.split('/');
      return `${baseUrl}/${resourceGroup}/providers/Microsoft.Sql/servers/${rn[0]}/databases/${rn[1]}` +
        `/providers/microsoft.insights/metrics?api-version=${apiVersion}&${filter}`;
    }

    return `${baseUrl}/${resourceGroup}/providers/${metricDefinition}/${resourceName}` +
    `/providers/microsoft.insights/metrics?api-version=${apiVersion}&${filter}`;
  }

  static buildAzureMonitorGetMetricNamesUrl(baseUrl: string, resourceGroup: string, metricDefinition: string,
    resourceName: string, apiVersion: string ) {
    if (metricDefinition === 'Microsoft.Sql/servers/databases') {
      const rn = resourceName.split('/');
      return `${baseUrl}/${resourceGroup}/providers/Microsoft.Sql/servers/${rn[0]}/databases/${rn[1]}` +
        `/providers/microsoft.insights/metricdefinitions?api-version=${apiVersion}`;
    }

    return `${baseUrl}/${resourceGroup}/providers/${metricDefinition}/${resourceName}` +
    `/providers/microsoft.insights/metricdefinitions?api-version=${apiVersion}`;
  }
}
