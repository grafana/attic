///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';
import TimegrainConverter from '../time_grain_converter';

export default class AzureMonitorFilterBuilder {
  aggregation: string;

  constructor(private metricName: string, private from, private to, private timeGrain: number, private timeGrainUnit: string) {
  }

  setAggregation(agg) {
    this.aggregation = agg;
  }

  generateFilter() {
    const dateTimeCondition = `startTime eq ${this.from.utc().format()} and endTime eq ${this.to.utc().format()}`;
    const timeGrain = TimegrainConverter.createISO8601Duration(this.timeGrain, this.timeGrainUnit);
    const timeGrainCondition = ` and timeGrain eq duration'${timeGrain}'`;
    const timeCondition = dateTimeCondition + timeGrainCondition;
    let filter = timeCondition;

    if (this.aggregation) {
      filter += ` and aggregationType eq '${this.aggregation}'`;
    }

    if (this.metricName && this.metricName.trim().length > 0) {
      filter += ` and (name.value eq '${this.metricName}')`;
    }

    return filter;
  }
}
