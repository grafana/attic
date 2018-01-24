export class AzureMonitorConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;

  constructor($scope) {
    this.current.url = 'https://management.azure.com';
  }
}
