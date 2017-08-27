import {describe, beforeEach, it, sinon, expect, angularMocks} from './lib/common';
import helpers from './lib/helpers.js';
import AzureMonitorDatasource from '../src/datasource';
import Q from 'q';
import moment from 'moment';

describe('AzureMonitorDatasource', function() {
  const ctx = new helpers.ServiceTestContext();

  beforeEach(function() {
    ctx.$q = Q;
    ctx.instanceSettings = {
      url: 'http://azuremonitor.com',
      jsonData: { subscriptionId: '9935389e-9122-4ef9-95f9-1513dd24753f'}
    };

    ctx.ds = new AzureMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv, ctx.$q);
  });

  describe('When performing testDatasource', function() {
    describe('and an error is returned', function() {
      const error = {
        data: {
          error: {
            code: 'InvalidApiVersionParameter',
            message: `An error message.`
          }
        },
        status: 400,
        statusText: 'Bad Request'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.reject(error);
        };
      });

      it('should return error status and a detailed error message', function() {
        return ctx.ds.testDatasource().then(function(results) {
          expect(results.status).to.equal('error');
          expect(results.message).to.equal('Bad Request: InvalidApiVersionParameter. An error message.');
        });
      });
    });

    describe('and a list of resource groups is returned', function() {

      const response = {
        data: {
          value: [
            { name: 'grp1' },
            { name: 'grp2' },
          ]
        },
        status: 200,
        statusText: 'OK'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.when({data: response, status: 200});
        };
      });

      it('should return success status', function() {
        return ctx.ds.testDatasource().then(function(results) {
          expect(results.status).to.equal('success');
        });
      });
    });
  });

  describe('When performing query', function() {

    const response = {
        value: [
          {
            data: [
              {
                timeStamp: '2017-08-22T21:00:00Z',
                average: 1.0503333333333331
              },
              {
                timeStamp: '2017-08-22T22:00:00Z',
                average: 1.045083333333333
              },
              {
                timeStamp: '2017-08-22T23:00:00Z',
                average: 1.0457499999999995
              }
            ],
            name: {
              value: 'Percentage CPU',
              localizedValue: 'Percentage CPU'
            },
            type: 'Microsoft.Insights/metrics',
            unit: 'Percent'
          }
        ]
      };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        return ctx.$q.when({data: response, status: 200});
      };
    });

    it('should return a list of datapoints', function() {
      const options = {
        range: {
          from: moment.utc('2017-08-22T20:00:00Z'),
          to: moment.utc('2017-08-22T23:59:00Z'),
        },
        targets: [
          {
            apiVersion: '2016-09-01',
            filter: `(name.value eq 'Percentage CPU')` +
              ` and timeGrain eq duration'PT1H'`,
            refId: 'A',
            resourceGroup: 'test',
            resourceName: 'test',
            resourceProviderNamespace: 'Microsoft.Compute',
            resourceType: 'virtualMachines',
            timeGrain: 1,
            timeGrainUnit: 'hour',
          }
        ]
      };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.be(1);
        expect(results.data[0].target).to.equal('Percentage CPU');
        expect(results.data[0].datapoints[0][1]).to.equal(1503435600000);
        expect(results.data[0].datapoints[0][0]).to.equal(1.0503333333333331);
        expect(results.data[0].datapoints[2][1]).to.equal(1503442800000);
        expect(results.data[0].datapoints[2][0]).to.equal(1.0457499999999995);
      });
    });
  });
});
