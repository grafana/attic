import {describe, beforeEach, it, sinon, expect, angularMocks} from '../lib/common';
import AzureMonitorDatasource from '../../src/datasource';
import TemplateSrvStub from '../lib/template_srv_stub';
import Q from 'q';
import moment from 'moment';

describe('AppInsightsDatasource', function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };

  beforeEach(function() {
    ctx.$q = Q;
    ctx.instanceSettings = {
      jsonData: { appInsightsAppId: '3ad4400f-ea7d-465d-a8fb-43fb20555d85'},
      url: 'http://appinsightsapi'
    };

    ctx.ds = new AzureMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv, ctx.$q);
  });

  describe('When performing testDatasource', function() {
    describe('and a list of metrics is returned', function() {
      const response = {
        metrics: {
          'requests/count': {
              displayName: 'Server requests',
              defaultAggregation: 'sum'
          },
          'requests/duration': {
            displayName: 'Server requests',
            defaultAggregation: 'sum'
          }
        },
        dimensions: {
          'request/source': {
              'displayName': 'Request source'
          }
        }
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

    describe('and a PathNotFoundError error is returned', function() {
      const error = {
        data: {
          error: {
            code: 'PathNotFoundError',
            message: `An error message.`
          }
        },
        status: 404,
        statusText: 'Not Found'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.reject(error);
        };
      });

      it('should return error status and a detailed error message', function() {
        return ctx.ds.testDatasource().then(function(results) {
          expect(results.status).to.equal('error');
          expect(results.message).to.equal('1. Application Insights: Not Found: Invalid Application Id for Application Insights service. ');
        });
      });
    });

    describe('and an error is returned', function() {
      const error = {
        data: {
          error: {
            code: 'SomeOtherError',
            message: `An error message.`
          }
        },
        status: 500,
        statusText: 'Error'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.reject(error);
        };
      });

      it('should return error status and a detailed error message', function() {
        return ctx.ds.testDatasource().then(function(results) {
          expect(results.status).to.equal('error');
          expect(results.message).to.equal('1. Application Insights: Error: SomeOtherError. An error message. ');
        });
      });
    });
  });

  describe('When performing query', function() {
    const options = {
      range: {
        from: moment.utc('2017-08-22T20:00:00Z'),
        to: moment.utc('2017-08-22T23:59:00Z'),
      },
      targets: [
        {
          apiVersion: '2016-09-01',
          refId: 'A',
          queryType: 'Application Insights',
          appInsights: {
            query: '/metrics/exceptions/server?timespan=P7D&interval=PT1H'
          }
        }
      ]
    };

    const response = {
      value: {
        start: '2017-08-30T15:53:58.845Z',
        end: '2017-09-06T15:53:58.845Z',
        interval: 'PT1H',
        segments: [
          {
            start: "2017-08-30T15:53:58.845Z",
            end: "2017-08-30T16:00:00.000Z",
            'exceptions/server': {
              sum: 3
            }
          },
          {
            start: "2017-08-30T16:00:00.000Z",
            end: "2017-08-30T17:00:00.000Z",
            'exceptions/server': {
              sum: 66
            }
          }
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        expect(options.url).to.contain('/metrics/exceptions/server');
        return ctx.$q.when({data: response, status: 200});
      };
    });

    it('should return a list of datapoints', function() {
      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.be(1);
        expect(results.data[0].target).to.equal('exceptions/server');
        expect(results.data[0].datapoints[0][1]).to.equal(1504108800000);
        expect(results.data[0].datapoints[0][0]).to.equal(3);
        expect(results.data[0].datapoints[1][1]).to.equal(1504112400000);
        expect(results.data[0].datapoints[1][0]).to.equal(66);
      });
    });

  });
});
