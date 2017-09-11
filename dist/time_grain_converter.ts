///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';

export default class TimeGrainConverter {
  static createISO8601Duration(timeGrain, timeGrainUnit) {
    const timeGrainUnitOrDefault = timeGrainUnit || 'hour';
    const timeGrainOrDefault = timeGrain || 1;

    if (timeGrainUnitOrDefault === 'hour' || timeGrainUnitOrDefault === 'minute') {
      return `PT${timeGrainOrDefault}${timeGrainUnitOrDefault[0].toUpperCase()}`;
    }

    return `P${timeGrainOrDefault}${timeGrainUnitOrDefault[0].toUpperCase()}`;
  }
}
