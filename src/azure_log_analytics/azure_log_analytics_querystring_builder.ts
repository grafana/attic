export default class AzureLogAnalyticsQuerystringBuilder {
  constructor(public rawQueryString, public options) {}

  generate() {
    var queryString = this.rawQueryString;
    const macroRegexp = /\$__([_a-zA-Z0-9]+)\(([^\)]*)\)/gi;
    queryString = queryString.replace(macroRegexp, (match, p1, p2) => {
      if (p1 === 'timeFilter') {
        return this.getTimeFilter(p2, this.options);
      }

      return match;
    });
    queryString = queryString.replace(/\$__interval/gi, this.options.interval);
    queryString = queryString.replace(/\$__from/gi, this.getFrom(this.options));
    queryString = queryString.replace(/\$__to/gi, this.getUntil(this.options));
    const rawQuery = queryString;
    queryString = encodeURIComponent(queryString);
    let uriString = `query=${queryString}`;

    return { uriString, rawQuery};
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

  getTimeFilter(timeFieldArg, options) {
    const timeField = timeFieldArg || 'TimeGenerated';
    if (options.rangeRaw.to === 'now') {
      return `${timeField} >= ${this.getFrom(options)}`;
    } else {
      return `${timeField}  >= ${this.getFrom(options)} and ${timeField} <= ${this.getUntil(options)}`;
    }
  }
}
