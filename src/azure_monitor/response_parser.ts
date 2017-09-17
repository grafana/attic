///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import moment from 'moment';
import _ from 'lodash';

export default class ResponseParser {
  static parseQueryResult(result) {
    const data = [];
    for (let i = 0; i < result.data.length; i++) {
      for (let j = 0; j < result.data[i].data.value.length; j++) {
        for (let k = 0; k < result.data[i].data.value[j].timeseries.length; k++) {
          data.push({
            target: ResponseParser.createTarget(result.data[i].data.value[j]),
            datapoints: ResponseParser.convertDataToPoints(result.data[i].data.value[j].timeseries[k].data)
          });
        }
      }
    }
    return data;
  }

  static createTarget(data) {
    const endIndex = data.id.lastIndexOf('/providers');
    const startIndex = data.id.slice(0, endIndex).lastIndexOf('/') + 1;
    const resourceName = data.id.substring(startIndex, endIndex);
    return `${resourceName}.${data.name.value}`;
  }

  static convertDataToPoints(timeSeriesData) {
    const dataPoints = [];

    for (let k = 0; k < timeSeriesData.length; k++) {
      const epoch = ResponseParser.dateTimeToEpoch(timeSeriesData[k].timeStamp);
      const aggKey = ResponseParser.getKeyForAggregationField(timeSeriesData[k]);

      if (aggKey) {
        dataPoints.push([timeSeriesData[k][aggKey], epoch]);
      }
    }

    return dataPoints;
  }

  static dateTimeToEpoch(dateTime) {
    return moment(dateTime).valueOf();
  }

  static getKeyForAggregationField(dataObj) {
    const keys = _.keys(dataObj);
    if (keys.length < 2) {
      return;
    }

    return _.intersection(keys, ['total', 'average', 'maximum', 'minimum', 'count']);
  }

  static parseResponseValues(result: any, textFieldName: string, valueFieldName: string) {
    const list = [];
    for (let i = 0; i < result.data.value.length; i++) {
      if (! _.find(list, ['value', _.get(result.data.value[i], valueFieldName)])) {
        list.push({
          text: _.get(result.data.value[i], textFieldName),
          value: _.get(result.data.value[i], valueFieldName)
        });
      }
    }
    return list;
  }

  static parseAggregations(result: any, metricName: string) {
    const metricData = _.find(result.data.value, o => {
      return _.get(o, 'name.value') === metricName;
    });
    return {
      primaryAggType: metricData.primaryAggregationType,
      supportedAggTypes: metricData.supportedAggregationTypes
    };
  }
}
