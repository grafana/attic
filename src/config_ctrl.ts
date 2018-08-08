import AzureLogAnalyticsDatasource from './azure_log_analytics/azure_log_analytics_datasource';

export class AzureMonitorConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;
  azureLogAnalyticsDatasource: any;
  workspaces: any[];

  /** @ngInject **/
  constructor($scope, backendSrv, $q) {
    this.current.jsonData.cloudName = this.current.jsonData.cloudName || 'azuremonitor';
    this.current.jsonData.azureLogAnalyticsSameAs = this.current.jsonData.azureLogAnalyticsSameAs || false;

    if (this.current.id) {
      this.current.url = '/api/datasources/proxy/' + this.current.id;
      this.azureLogAnalyticsDatasource = new AzureLogAnalyticsDatasource(this.current, backendSrv, null, $q);
      this.getWorkspaces();
    }
  }

  getWorkspaces() {
    if (!this.azureLogAnalyticsDatasource.isConfigured()) {
      return;
    }

    return this.azureLogAnalyticsDatasource.getWorkspaces().then(workspaces => {
      this.workspaces = workspaces;
      if (this.workspaces.length > 0) {
        this.current.jsonData.logAnalyticsDefaultWorkspace =
          this.current.jsonData.logAnalyticsDefaultWorkspace || this.workspaces[0].value;
      }
    });
  }
}
