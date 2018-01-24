import _ from 'lodash';
import moment from 'moment';
import TimegrainConverter from '../time_grain_converter';

export default class AzureMonitorFilterBuilder {
  aggregation: string;
  timeGrainInterval = '';
  dimension: string;
  dimensionFilter: string;
  allowedTimeGrains = ['1m', '5m', '15m', '30m', '1h', '6h', '12h', '1d'];

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

  setDimensionFilter(dimension, dimensionFilter) {
    this.dimension = dimension;
    this.dimensionFilter = dimensionFilter;
  }

  generateFilter() {
    let filter = this.createDatetimeAndTimeGrainConditions();

    if (this.aggregation) {
      filter += `&aggregation=${this.aggregation}`;
    }

    if (this.metricName && this.metricName.trim().length > 0) {
      filter += `&metric=${this.metricName}`;
    }

    if (this.dimension && this.dimensionFilter && this.dimensionFilter.trim().length > 0) {
      filter += `&$filter=${this.dimension} eq '${this.dimensionFilter}'`;
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
    const roundedInterval = TimegrainConverter.findClosestTimeGrain(this.grafanaInterval, this.allowedTimeGrains);

    return TimegrainConverter.createISO8601DurationFromInterval(roundedInterval);
  }
}
