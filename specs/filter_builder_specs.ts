import {describe, beforeEach, it, sinon, expect, angularMocks} from './lib/common';
import AzureMonitorFilterBuilder from '../src/azure_monitor_filter_builder';
import moment from 'moment';

describe('AzureMonitorFilterBuilder', function() {
  let builder: AzureMonitorFilterBuilder;
  describe('with an empty filter string and 1 hour time grain', function() {
    beforeEach(function() {
      builder = new AzureMonitorFilterBuilder('', moment.utc('2017-08-22 06:00'), moment.utc('2017-08-22 07:00'), 1, 'hour');
    });

    it('should always add datetime filtering and a time grain in ISO_8601 format to the filter', function() {
      const filter = `startTime eq 2017-08-22T06:00:00Z and endTime eq 2017-08-22T07:00:00Z and timeGrain eq duration'PT1H'`;
      expect(builder.generateFilter()).to.equal(filter);
    });
  });

  describe('with an empty filter string and 1 minute time grain', function() {
    beforeEach(function() {
      builder = new AzureMonitorFilterBuilder('', moment.utc('2017-08-22 06:00'), moment.utc('2017-08-22 07:00'), 1, 'minute');
    });

    it('should always add datetime filtering and a time grain in ISO_8601 format to the filter', function() {
      const filter = `startTime eq 2017-08-22T06:00:00Z and endTime eq 2017-08-22T07:00:00Z and timeGrain eq duration'PT1M'`;
      expect(builder.generateFilter()).to.equal(filter);
    });
  });

  describe('with an empty filter string and 1 day time grain', function() {
    beforeEach(function() {
      builder = new AzureMonitorFilterBuilder('', moment.utc('2017-08-22 06:00'), moment.utc('2017-08-22 07:00'), 1, 'day');
    });

    it('should add time grain to the filter in ISO_8601 format', function() {
      const filter = `startTime eq 2017-08-22T06:00:00Z and endTime eq 2017-08-22T07:00:00Z and timeGrain eq duration'P1D'`;
      expect(builder.generateFilter()).to.equal(filter);
    });
  });
});
