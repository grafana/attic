import {describe, beforeEach, it, sinon, expect, angularMocks} from '../lib/common';
import AppInsightsQuerystringBuilder from '../../src/app_insights/app_insights_querystring_builder';
import moment from 'moment';

describe('AppInsightsQuerystringBuilder', function() {
  let builder: AppInsightsQuerystringBuilder;

  beforeEach(function() {
    builder = new AppInsightsQuerystringBuilder(moment.utc('2017-08-22 06:00'), moment.utc('2017-08-22 07:00'));
  });

  describe('with only from/to date range', function() {
    it('should always add datetime filtering to the querystring', function() {
      const querystring = `timespan=2017-08-22T06:00:00Z/2017-08-22T07:00:00Z`;
      expect(builder.generate()).to.equal(querystring);
    });
  });

  describe('with from/to date range and aggregation type', function() {
    beforeEach(function() {
      builder.setAggregation('avg');
    });

    it('should always add datetime filtering to the querystring', function() {
      const querystring = `timespan=2017-08-22T06:00:00Z/2017-08-22T07:00:00Z&aggregation=avg`;
      expect(builder.generate()).to.equal(querystring);
    });
  });

  describe('with from/to date range and group by segment', function() {
    beforeEach(function() {
      builder.setGroupBy('client/city');
    });

    it('should always add datetime filtering to the querystring', function() {
      const querystring = `timespan=2017-08-22T06:00:00Z/2017-08-22T07:00:00Z&segment=client/city`;
      expect(builder.generate()).to.equal(querystring);
    });
  });
});
