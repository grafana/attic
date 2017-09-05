///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import moment from 'moment';
import _ from 'lodash';

export default class ResponseParser {
  static parseQueryResult(result) {
    const data = [];
    for (let i = 0; i < result.data.length; i++) {
      const dataPoints = [];
      for (let j = 0; j < result.data[i].data.value.length; j++) {
        for (let k = 0; k < result.data[i].data.value[j].data.length; k++) {
          const epoch = moment(result.data[i].data.value[j].data[k].timeStamp).valueOf();
          const keys = _.keys(result.data[i].data.value[j].data[k]);
          if (keys.length === 2) {
            dataPoints.push([result.data[i].data.value[j].data[k][keys[1]], epoch]);
          }
        }
        data.push({target: result.data[i].data.value[j].name.value, datapoints: dataPoints});
      }
    }
    return {data: data};
  }

  static parseResponseValues(result: any, textFieldName: string, valueFieldName: string) {
    const list = [];
    for (let i = 0; i < result.data.value.length; i++) {
      list.push({
        text: _.get(result.data.value[i], textFieldName),
        value: _.get(result.data.value[i], valueFieldName)
      });
    }
    return list;
  }
}
