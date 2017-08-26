///<reference path="app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';

export default class AzureMonitorFilterBuilder {
  constructor(private filter: string, private from, private to) {
  }

  generateFilter() {
    const dateTimeCondition = `startTime eq ${this.from.utc().format()} and endTime eq ${this.to.utc().format()}`;

    if (this.filter.trim().length === 0) {
      return dateTimeCondition;
    }
    return `${dateTimeCondition} and ${this.filter}`;
  }
}
