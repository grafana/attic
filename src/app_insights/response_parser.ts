///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import moment from 'moment';
import _ from 'lodash';

export default class ResponseParser {
  static parseQueryResult(result) {
    const data = [];
    const dataPoints = [];

    for (let i = 0; i < result.data[0].data.value.segments.length; i++) {
      const epoch = moment(result.data[0].data.value.segments[i].end).valueOf();
      dataPoints.push([result.data[0].data.value.segments[i]['exceptions/server'].sum, epoch]);
    }

    data.push({target: 'exceptions/server', datapoints: dataPoints});

    return data;
  }
}
