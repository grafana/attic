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

export interface KustoSchema {
  Databases: { [key: string]: KustoDatabase; };
  Plugins: any[];
}
export interface KustoDatabase {
  Name: string;
  Tables: { [key: string]: KustoTable; };
  Functions: any;
}

export interface KustoTable {
  Name: string;
  OrderedColumns: KustoColumn[];
}

export interface KustoColumn {
  Name: string;
  Type: string;
}

export default class ResponseParser {
  columns: Array<string>;
  constructor(private results) {}

  parseQueryResult() {
    let data: any[] = [];
    let columns: any[] = [];
    for (let i = 0; i < this.results.length; i++) {
      columns = this.results[i].result.data.Tables[0].Columns;
      const rows = this.results[i].result.data.Tables[0].Rows;

      if (this.results[i].query.resultFormat === 'time_series') {
        data = _.concat(data, this.parseTimeSeriesResult(this.results[i].query, columns, rows));
      } else {
        data = _.concat(data, this.parseTableResult(this.results[i].query, columns, rows));
      }
    }

    return {
      data: data,
    };
  }

  parseTimeSeriesResult(query, columns, rows) {
    const data: any[] = [];
    let timeIndex = -1;
    let metricIndex = -1;
    let valueIndex = -1;

    for (let i = 0; i < columns.length; i++) {
      if (timeIndex === -1 && columns[i].ColumnType === 'datetime') {
        timeIndex = i;
      }

      if (metricIndex === -1 && columns[i].ColumnType === 'string') {
        metricIndex = i;
      }

      if (valueIndex === -1 && ['int', 'long', 'real', 'double'].includes(columns[i].ColumnType)) {
        valueIndex = i;
      }
    }

    if (timeIndex === -1) {
      throw new Error('No datetime column found in the result. The Time Series format requires a time column.');
    }

    _.forEach(rows, function(row) {
      const epoch = ResponseParser.dateTimeToEpoch(row[timeIndex]);
      const metricName = metricIndex > -1 ? row[metricIndex] : columns[valueIndex].ColumnName;
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
      columns: _.map(columns, col => {
        return { text: col.ColumnName, type: col.DataType };
      }),
      rows: rows,
    };

    return tableResult;
  }

  parseSchemaResult(): KustoSchema {
    const databases: { [key: string]: KustoDatabase; }  = {};

    this.createSchemaTableBuckets(databases);

    this.createSchemaTableColumns(databases);

    return {
      Plugins: [
        {
          Name: 'pivot',
        },
      ],
      Databases: databases,
    };
  }

  createSchemaTableBuckets(databases: { [key: string]: KustoDatabase; }) {
    _.forEach(this.results.Tables[1].Rows, row => {
      const db = this.findOrCreateSchemaDatabaseBucket(row[3], databases);
      db.Tables[row[1]] = {
        Name: row[1],
        OrderedColumns: [],
      };
    });
  }

  createSchemaTableColumns(databases: { [key: string]: KustoDatabase; }) {
    _.forEach(this.results.Tables[0].Rows, row => {
      const table = this.findTable(row[0], databases);
      table.OrderedColumns.push({
        Name: row[1],
        Type: row[2],
      });
    });
  }

  findTable(tableName: string, databases: { [key: string]: KustoDatabase; }): KustoTable {
    for (let db in databases) {
      const key = _.find(Object.keys(databases[db].Tables), tbl => {
        return tbl === tableName;
      });
      if (key.length > 0) {
        return databases[db].Tables[key];
      }
    }

    throw Error('Error parsing database schema for Log Analytics tables. Table not found.');
  }

  findOrCreateSchemaDatabaseBucket(dbName: string, databases: { [key: string]: KustoDatabase; }) {
    if (databases[dbName]) {
      return databases[dbName];
    }

    return (databases[dbName] = {
      Name: dbName,
      Tables: {},
      Functions: {}
    });
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
