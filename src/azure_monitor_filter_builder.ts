///<reference path="app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';

export default class AzureMonitorFilterBuilder {
  constructor(private filter: string, private from, private to, private timeGrain: number, private timeGrainUnit: string) {
  }

  generateFilter() {
    const dateTimeCondition = `startTime eq ${this.from.utc().format()} and endTime eq ${this.to.utc().format()}`;
    const timeGrainCondition = ` and timeGrain eq duration'${this.createISO8601Duration()}'`;
    const timeCondition = dateTimeCondition + timeGrainCondition;

    if (!this.filter || this.filter.trim().length === 0) {
      return timeCondition;
    }
    return `${timeCondition} and ${this.filter}`;
  }

  createISO8601Duration() {
    const timeGrainUnit = this.timeGrainUnit || 'hour';
    const timeGrain = this.timeGrain || 1;

    if (timeGrainUnit === 'hour' || timeGrainUnit === 'minute') {
      return `PT${timeGrain}${timeGrainUnit[0].toUpperCase()}`;
    }

    return `P${timeGrain}${timeGrainUnit[0].toUpperCase()}`;
  }
}
