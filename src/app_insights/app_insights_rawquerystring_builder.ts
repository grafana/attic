export default class AppInsightsRawQuerystringBuilder {
  constructor(public rawQueryString, public options) {}

  generate() {
    var queryString = this.rawQueryString;
    queryString = queryString.replace(/\$__interval/gi, this.options.interval);
    queryString = queryString.replace(/\$timeFilter/gi, this.getTimeFilter(this.options));
    queryString = queryString.replace(/\$from/gi, this.getFrom(this.options));
    queryString = queryString.replace(/\$until/gi, this.getUntil(this.options));
    queryString = encodeURIComponent(queryString);
    let uriString = `query=${queryString}`;

    return uriString;
  }

  getFrom(options) {
    var from = options.range.from;
    return `datetime(${from.toISOString()})`;
  }

  getUntil(options) {
    if (options.rangeRaw.to === 'now') {
      return "now()";
    } else {
      var until = options.range.to;
      return `datetime(${until.toISOString()})`;
    }
  }

  getTimeFilter(options) {
    if (options.rangeRaw.to === 'now') {
      return `timestamp >= ${this.getFrom(options)}`;
    } else {
      return `timestamp >= ${this.getFrom(options)} and timestamp <= ${this.getUntil(options)}`;
    }
  }
}
