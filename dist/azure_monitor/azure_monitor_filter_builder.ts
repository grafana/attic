///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';
import TimegrainConverter from '../time_grain_converter';

export default class AzureMonitorFilterBuilder {
  aggregation: string;
  timeGrainInterval = '';

  constructor(
    private metricName: string,
    private from,
    private to,
    public timeGrain: number,
    public timeGrainUnit: string,
    public grafanaInterval: string) {
  }

  setAggregation(agg) {
    this.aggregation = agg;
  }

  generateFilter() {
    let filter = this.createDatetimeAndTimeGrainConditions();

    if (this.aggregation) {
      filter += `&aggregation=${this.aggregation}`;
    }

    if (this.metricName && this.metricName.trim().length > 0) {
      filter += `&metric=${this.metricName}`;
    }

    return filter;
  }

  createDatetimeAndTimeGrainConditions() {
    const dateTimeCondition = `timespan=${this.from.utc().format()}/${this.to.utc().format()}`;

    if (this.timeGrain > 0) {
      this.timeGrainInterval = TimegrainConverter.createISO8601Duration(this.timeGrain, this.timeGrainUnit);
    } else {
      this.timeGrainInterval = this.calculateAutoTimeGrain();
    }
    const timeGrainCondition = `&interval=${this.timeGrainInterval}`;

    return dateTimeCondition + timeGrainCondition;
  }

  calculateAutoTimeGrain() {
    return TimegrainConverter.createISO8601DurationFromInterval(this.grafanaInterval);
  }
}
