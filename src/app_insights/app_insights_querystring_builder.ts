///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';

export default class AppInsightsQuerystringBuilder {
  constructor(private from, private to) {
  }

  generate() {
    const dateTimeCondition = `timespan=${this.from.utc().format()}/${this.to.utc().format()}`;

    return `${dateTimeCondition}`;
  }
}
