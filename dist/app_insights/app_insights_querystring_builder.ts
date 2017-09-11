///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';
import TimeGrainConverter from '../time_grain_converter';

export default class AppInsightsQuerystringBuilder {
  aggregation = '';
  groupBy = '';
  timeGrain = '';
  timeGrainUnit = '';

  constructor(private from, private to) {
  }

  setAggregation(aggregation) {
    this.aggregation = aggregation;
  }

  setGroupBy(groupBy) {
    this.groupBy = groupBy;
  }

  setInterval(timeGrain, timeGrainUnit) {
    this.timeGrain = timeGrain;
    this.timeGrainUnit = timeGrainUnit;
  }

  generate() {
    let querystring = `timespan=${this.from.utc().format()}/${this.to.utc().format()}`;

    if (this.aggregation && this.aggregation.length > 0) {
      querystring += `&aggregation=${this.aggregation}`;
    }

    if (this.groupBy && this.groupBy.length > 0) {
      querystring += `&segment=${this.groupBy}`;
    }

    if (this.timeGrain && this.timeGrainUnit) {
      querystring += `&interval=${TimeGrainConverter.createISO8601Duration(this.timeGrain, this.timeGrainUnit)}`;
    }
    return querystring;
  }
}
