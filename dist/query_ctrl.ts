///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';

export class AzureMonitorQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);

    this.target.timeGrain = 1;
    this.target.timeGrainUnit = 'hour';
  }

  getOptions(query) {
    return this.datasource.metricFindQuery('?api-version=2017-06-01');
  }
}
