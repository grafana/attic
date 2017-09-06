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
      jsonData: { appInsightsAppId: '3ad4400f-ea7d-465d-a8fb-43fb20555d85'}
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
  });
});
