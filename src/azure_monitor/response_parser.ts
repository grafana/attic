///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import moment from 'moment';
import _ from 'lodash';

export default class ResponseParser {
  static parseQueryResult(result) {
    const data = [];
    for (let i = 0; i < result.data.length; i++) {
      const dataPoints = [];
      for (let j = 0; j < result.data[i].data.value[0].data.length; j++) {
        const epoch = moment(result.data[i].data.value[0].data[j].timeStamp).valueOf();
        dataPoints.push([result.data[i].data.value[0].data[j].average, epoch]);
      }
      data.push({target: result.data[i].data.value[0].name.value, datapoints: dataPoints});
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
