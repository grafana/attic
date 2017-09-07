///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import moment from 'moment';
import _ from 'lodash';

export default class ResponseParser {
  static parseQueryResult(result) {
    const data = [];
    const value = result.data[0].data.value;

    if (ResponseParser.isSingleValue(value)) {
      const metricName = ResponseParser.getMetricFieldKey(value);
      const aggField = ResponseParser.getKeyForAggregationField(value[metricName]);
      const epoch = ResponseParser.dateTimeToEpoch(value.end);
      data.push({target: metricName, datapoints: [[value[metricName][aggField], epoch]]});
      return data;
    }

    const groupedBy = ResponseParser.hasSegmentsField(value.segments[0]);
    if (!groupedBy) {
      const metricName = ResponseParser.getMetricFieldKey(value.segments[0]);
      const dataTarget = ResponseParser.findOrCreateBucket(data, metricName);

      for (let i = 0; i < value.segments.length; i++) {
        const epoch = ResponseParser.dateTimeToEpoch(value.segments[i].end);
        const aggField = ResponseParser.getKeyForAggregationField(value.segments[i][metricName]);

        dataTarget.datapoints.push([value.segments[i][metricName][aggField], epoch]);
      }
    } else {
      for (let i = 0; i < value.segments.length; i++) {
        const epoch = ResponseParser.dateTimeToEpoch(value.segments[i].end);

        for (let j = 0; j < value.segments[i].segments.length; j++) {
          const target = ResponseParser.getTargetName(value.segments[i].segments[j]);
          const metricName = ResponseParser.getMetricFieldKey(value.segments[i].segments[j]);
          const aggField = ResponseParser.getKeyForAggregationField(value.segments[i].segments[j][metricName]);

          const bucket = ResponseParser.findOrCreateBucket(data, target);
          bucket.datapoints.push([value.segments[i].segments[j][metricName][aggField], epoch]);
        }
      }
    }

    return data;
  }

  static isSingleValue(value) {
    return !ResponseParser.hasSegmentsField(value);
  }

  static findOrCreateBucket(data, target) {
    let dataTarget = _.find(data, ['target', target]);
    if (!dataTarget) {
      dataTarget = {target: target, datapoints: []};
      data.push(dataTarget);
    }

    return dataTarget;
  }

  static getTargetName(segment) {
    let metric = '';
    let groupBy = '';
    for (let prop in segment) {
      if (_.isObject(segment[prop])) {
        metric = prop;
      } else {
        groupBy = `{${prop}="${segment[prop]}"}`;
      }
    }
    return metric + groupBy;
  }

  static hasSegmentsField(obj) {
    const keys = _.keys(obj);
    return _.indexOf(keys, 'segments') > -1;
  }

  static getMetricFieldKey(segment) {
    const keys = _.keys(segment);

    return _.filter(_.without(keys, 'start', 'end'), key => {
      return _.isObject(segment[key]);
    })[0];
  }

  static getKeyForAggregationField(dataObj) {
    const keys = _.keys(dataObj);
    return _.intersection(keys, ['sum', 'avg', 'min', 'max', 'count']);
  }

  static dateTimeToEpoch(dateTime) {
    return moment(dateTime).valueOf();
  }
}
