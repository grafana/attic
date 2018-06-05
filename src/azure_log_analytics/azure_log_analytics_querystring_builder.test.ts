import AzureLogAnalyticsQuerystringBuilder from './azure_log_analytics_querystring_builder';
import moment from 'moment';

describe('AzureLogAnalyticsDatasource', () => {
  let builder: AzureLogAnalyticsQuerystringBuilder;

  beforeEach(function() {
    builder = new AzureLogAnalyticsQuerystringBuilder('query=Tablename | where $__timeFilter()', {
      interval: '5m',
      range: {
        from: moment().subtract(24, 'hours'),
        to: moment()
      },
      rangeRaw: {
        from: 'now-24h',
        to: 'now'
      }
    });
  });

  describe('when $__timeFilter has no column parameter', () => {
    it('should generate a time filter condition with TimeGenerated as the datetime field', () => {
      const query = builder.generate();

      expect(query).toContain('where%20TimeGenerated%20%3E%3D%20datetime(');
    });
  });

  describe('when $__timeFilter has a column parameter', () => {
    beforeEach(() => {
      builder.rawQueryString = 'query=Tablename | where $__timeFilter(myTime)';
    });

    it('should generate a time filter condition with myTime as the datetime field', () => {
      const query = builder.generate();

      expect(query).toContain('where%20myTime%20%3E%3D%20datetime(');
    });
  });

  describe('when $__interval is in the query', () => {
    beforeEach(() => {
      builder.rawQueryString = 'query=Tablename | summarize count() by Category, bin(TimeGenerated, $__interval)';
    });

    it('should replace $__interval with the inbuilt interval option', () => {
      const query = builder.generate();

      expect(query).toContain('bin(TimeGenerated%2C%205m');
    });
  });

  describe('when using $__from and $__to is in the query and range is until now', () => {
    beforeEach(() => {
      builder.rawQueryString = 'query=Tablename | where myTime >= $__from and myTime <= $__to';
    });

    it('should replace $__from and $__to with a datetime and the now() function', () => {
      const query = builder.generate();

      expect(query).toContain('where%20myTime%20%3E%3D%20datetime(');
      expect(query).toContain('myTime%20%3C%3D%20now()');
    });
  });

  describe('when using $__from and $__to is in the query and range is a specific interval', () => {
    beforeEach(() => {
      builder.rawQueryString = 'query=Tablename | where myTime >= $__from and myTime <= $__to';
      builder.options.range.to = moment().subtract(1, 'hour');
      builder.options.rangeRaw.to = 'now-1h';
    });

    it('should replace $__from and $__to with datetimes', () => {
      const query = builder.generate();

      expect(query).toContain('where%20myTime%20%3E%3D%20datetime(');
      expect(query).toContain('myTime%20%3C%3D%20datetime(');
    });
  });
});
