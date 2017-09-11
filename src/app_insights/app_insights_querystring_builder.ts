///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';

export default class AppInsightsQuerystringBuilder {
  aggregation = '';
  groupBy = '';

  constructor(private from, private to) {
  }

  setAggregation(aggregation) {
    this.aggregation = aggregation;
  }

  setGroupBy(groupBy) {
    this.groupBy = groupBy;
  }

  generate() {
    let querystring = `timespan=${this.from.utc().format()}/${this.to.utc().format()}`;

    if (this.aggregation && this.aggregation.length > 0) {
      querystring += `&aggregation=${this.aggregation}`;
    }

    if (this.groupBy && this.groupBy.length > 0) {
      querystring += `&segment=${this.groupBy}`;
    }
    return querystring;
  }
}
