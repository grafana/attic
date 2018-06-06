import moment from 'moment';
import _ from 'lodash';

export interface TableResult {
  columns: TableColumn[];
  rows: any[];
  type: string;
}

export interface TableColumn {
  text: string;
  type: string;
}

export default class ResponseParser {
  columns: Array<string>;
  constructor(private results) {}

  parseQueryResult() {
    let data: any[] = [];
    let columns: any[] = [];
    for (let i = 0; i < this.results.length; i++) {
      columns = this.results[i].result.data.tables[0].columns;
      const rows = this.results[i].result.data.tables[0].rows;

      if (this.results[i].query.resultFormat === 'time_series') {
        data = _.concat(data, this.parseTimeSeriesResult(this.results[i].query, columns, rows));
      } else {
        data = _.concat(data, this.parseTableResult(this.results[i].query, columns, rows));
      }
    }

    return {
      data:  data
    };
  }

  parseTimeSeriesResult(query, columns, rows) {
    const data: any[] = [];
    let timeIndex = -1;
    let metricIndex = -1;
    let valueIndex = -1;

    for (let i = 0; i < columns.length; i++) {
      if (timeIndex === -1 && columns[i].type === 'datetime') {
        timeIndex = i;
      }

      if (metricIndex === -1 && columns[i].type === 'string') {
        metricIndex = i;
      }

      if (valueIndex === -1 && ['int', 'long', 'real', 'double'].includes(columns[i].type)) {
        valueIndex = i;
      }
    }

    if (timeIndex === -1) {
      throw new Error('No datetime column found in the result. The Time Series format requires a time column.');
    }

    _.forEach(rows, function(row) {
      const epoch =  ResponseParser.dateTimeToEpoch(row[timeIndex]);
      const metricName = metricIndex > -1 ? row[metricIndex] : columns[valueIndex].name;
      const bucket = ResponseParser.findOrCreateBucket(data, metricName);
      bucket.datapoints.push([row[valueIndex], epoch]);
      bucket.refId = query.refId;
      bucket.query = query.query;
    });

    return data;
  }

  parseTableResult(query, columns, rows) {
    const tableResult: TableResult = {
      type: 'table',
      columns: _.map(columns, (col) => { return {text: col.name, type: col.type}; }),
      rows: rows
    };

    return tableResult;
  }

  static findOrCreateBucket(data, target) {
    let dataTarget = _.find(data, ['target', target]);
    if (!dataTarget) {
      dataTarget = { target: target, datapoints: [], refId: '', query: '' };
      data.push(dataTarget);
    }

    return dataTarget;
  }

  static dateTimeToEpoch(dateTime) {
    return moment(dateTime).valueOf();
  }

}
