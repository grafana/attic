import {describe, beforeEach, it, sinon, expect, angularMocks} from './lib/common';
import AzureMonitorFilterBuilder from '../src/azure_monitor_filter_builder';
import moment from 'moment';

describe('AzureMonitorFilterBuilder', function() {
  let builder: AzureMonitorFilterBuilder;
  describe('with an empty filter string', function() {
    beforeEach(function() {
      builder = new AzureMonitorFilterBuilder('', moment.utc('2017-08-22 06:00'), moment.utc('2017-08-22 07:00'));
    });

    it('should always add datetime filtering to the filter', function() {
      expect(builder.generateFilter()).to.equal('startTime eq 2017-08-22T06:00:00Z and endTime eq 2017-08-22T07:00:00Z');
    });
  });
});
