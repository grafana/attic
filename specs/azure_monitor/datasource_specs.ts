import {describe, beforeEach, it, sinon, expect, angularMocks} from '../lib/common';
import AzureMonitorDatasource from '../../src/datasource';
import TemplateSrvStub from '../lib/template_srv_stub';
import Q from 'q';
import moment from 'moment';

describe('AzureMonitorDatasource', function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };

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
          expect(results.message).to.equal('1. Azure Monitor: Bad Request: InvalidApiVersionParameter. An error message. ');
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
    const options = {
      range: {
        from: moment.utc('2017-08-22T20:00:00Z'),
        to: moment.utc('2017-08-22T23:59:00Z'),
      },
      targets: [
        {
          apiVersion: '2016-09-01',
          refId: 'A',
          queryType: 'Azure Monitor',
          azureMonitor: {
            resourceGroup: 'testRG',
            resourceName: 'testRN',
            metricDefinition: 'Microsoft.Compute/virtualMachines',
            metricName: 'Percentage CPU',
            timeGrain: 1,
            timeGrainUnit: 'hour',
          }
        }
      ]
    };

    describe('and data field is average', function() {
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
              id: '/subscriptions/xxx/resourceGroups/testRG/providers/Microsoft.Compute/virtualMachines'
                + '/testRN/providers/Microsoft.Insights/metrics/Percentage CPU',
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
          expect(options.url).to.contain('/testRG/providers/Microsoft.Compute/virtualMachines/testRN/providers/microsoft.insights/metrics');
          return ctx.$q.when({data: response, status: 200});
        };
      });

      it('should return a list of datapoints', function() {
        return ctx.ds.query(options).then(function(results) {
          expect(results.data.length).to.be(1);
          expect(results.data[0].target).to.equal('testRN.Percentage CPU');
          expect(results.data[0].datapoints[0][1]).to.equal(1503435600000);
          expect(results.data[0].datapoints[0][0]).to.equal(1.0503333333333331);
          expect(results.data[0].datapoints[2][1]).to.equal(1503442800000);
          expect(results.data[0].datapoints[2][0]).to.equal(1.0457499999999995);
        });
      });
    });

    describe('and data field is total', function() {
      const response = {
          value: [
            {
              data: [
                {
                  timeStamp: '2017-08-22T21:00:00Z',
                  total: 1.0503333333333331
                },
                {
                  timeStamp: '2017-08-22T22:00:00Z',
                  total: 1.045083333333333
                },
                {
                  timeStamp: '2017-08-22T23:00:00Z',
                  total: 1.0457499999999995
                }
              ],
              id: '/subscriptions/xxx/resourceGroups/testRG/providers/Microsoft.Compute/virtualMachines'
              + '/testRN/providers/Microsoft.Insights/metrics/Percentage CPU',
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
          expect(options.url).to.contain('/testRG/providers/Microsoft.Compute/virtualMachines/testRN/providers/microsoft.insights/metrics');
          return ctx.$q.when({data: response, status: 200});
        };
      });

      it('should return a list of datapoints', function() {
        return ctx.ds.query(options).then(function(results) {
          expect(results.data.length).to.be(1);
          expect(results.data[0].target).to.equal('testRN.Percentage CPU');
          expect(results.data[0].datapoints[0][1]).to.equal(1503435600000);
          expect(results.data[0].datapoints[0][0]).to.equal(1.0503333333333331);
          expect(results.data[0].datapoints[2][1]).to.equal(1503442800000);
          expect(results.data[0].datapoints[2][0]).to.equal(1.0457499999999995);
        });
      });
    });
  });

  describe('When performing getResourceGroups', function() {
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
        return ctx.$q.when(response);
      };
    });

    it('should return list of Resource Groups', function() {
      return ctx.ds.getResourceGroups().then(function(results) {
        expect(results.length).to.equal(2);
        expect(results[0].text).to.equal('grp1');
        expect(results[0].value).to.equal('grp1');
        expect(results[1].text).to.equal('grp2');
        expect(results[1].value).to.equal('grp2');
      });
    });
  });

  describe('When performing getMetricDefinitions', function() {
    const response = {
      data: {
        value: [
          {
            name: 'test_OsDisk_1_68102d72f11b47dc8090b770e61cb5d2',
            type: 'Microsoft.Compute/disks',
          },
          {
            location: 'northeurope',
            name: 'northeur',
            type: 'Microsoft.Compute/virtualMachines',
          },
          {
            location: 'westcentralus',
            name: 'us',
            type: 'Microsoft.Compute/virtualMachines',
          },
          {
            name: 'IHaveNoMetrics',
            type: 'IShouldBeFilterOut',
          }
        ]
      },
      status: 200,
      statusText: 'OK'
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        const baseUrl = 'http://azuremonitor.com/azuremonitor/subscriptions/9935389e-9122-4ef9-95f9-1513dd24753f/resourceGroups';
        expect(options.url).to.be(baseUrl + '/nodesapp/resources?api-version=2017-06-01');
        return ctx.$q.when(response);
      };
    });

    it('should return list of Metric Definitions with no duplicates and no unsupported namespaces', function() {
      return ctx.ds.getMetricDefinitions('nodesapp').then(function(results) {
        expect(results.length).to.equal(2);
        expect(results[0].text).to.equal('Microsoft.Compute/disks');
        expect(results[0].value).to.equal('Microsoft.Compute/disks');
        expect(results[1].text).to.equal('Microsoft.Compute/virtualMachines');
        expect(results[1].value).to.equal('Microsoft.Compute/virtualMachines');
      });
    });
  });

  describe('When performing getResourceNames', function() {
    const response = {
      data: {
        value: [
          {
            name: 'Failure Anomalies - nodeapp',
            type: 'microsoft.insights/alertrules',
          },
          {
            name: 'nodeapp',
            type: 'microsoft.insights/components',
            kind: 'Node.JS',
          }
        ]
      },
      status: 200,
      statusText: 'OK'
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        const baseUrl = 'http://azuremonitor.com/azuremonitor/subscriptions/9935389e-9122-4ef9-95f9-1513dd24753f/resourceGroups';
        expect(options.url).to.be(baseUrl + '/nodeapp/resources?api-version=2017-06-01');
        return ctx.$q.when(response);
      };
    });

    it('should return list of Resource Names', function() {
      return ctx.ds.getResourceNames('nodeapp', 'microsoft.insights/components').then(function(results) {
        expect(results.length).to.equal(1);
        expect(results[0].text).to.equal('nodeapp');
        expect(results[0].value).to.equal('nodeapp');
      });
    });
  });

  describe('When performing getMetricNames', function() {
    const response = {
      data: {
        value: [
          {
            name: {
              value: 'UsedCapacity',
              localizedValue: 'Used capacity'
            },
            unit: 'CountPerSecond',
            primaryAggregationType: 'Total',
            supportedAggregationTypes: [
              'None',
              'Average',
              'Minimum',
              'Maximum',
              'Total',
              'Count'
            ]
          },
          {
            name: {
              value: 'FreeCapacity',
              localizedValue: 'Free capacity'
            },
            unit: 'CountPerSecond',
            primaryAggregationType: 'Average',
            supportedAggregationTypes: [
              'None',
              'Average',
            ]
          },
        ]
      },
      status: 200,
      statusText: 'OK'
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        const baseUrl = 'http://azuremonitor.com/azuremonitor/subscriptions/9935389e-9122-4ef9-95f9-1513dd24753f/resourceGroups/nodeapp';
        const expected = baseUrl + '/providers/microsoft.insights/components/resource1' +
          '/providers/microsoft.insights/metricdefinitions?api-version=2016-03-01';
        expect(options.url).to.be(expected);
        return ctx.$q.when(response);
      };
    });

    it('should return list of Metric Definitions', function() {
      return ctx.ds.getMetricNames('nodeapp', 'microsoft.insights/components', 'resource1').then(function(results) {
        expect(results.length).to.equal(2);
        expect(results[0].text).to.equal('Used capacity');
        expect(results[0].value).to.equal('UsedCapacity');
        expect(results[1].text).to.equal('Free capacity');
        expect(results[1].value).to.equal('FreeCapacity');
      });
    });
  });

  describe('When performing getAggregations', function() {
    const response = {
      data: {
        value: [
          {
            name: {
              value: 'UsedCapacity',
              localizedValue: 'Used capacity'
            },
            unit: 'CountPerSecond',
            primaryAggregationType: 'Total',
            supportedAggregationTypes: [
              'None',
              'Average',
              'Minimum',
              'Maximum',
              'Total',
              'Count'
            ]
          },
          {
            name: {
              value: 'FreeCapacity',
              localizedValue: 'Free capacity'
            },
            unit: 'CountPerSecond',
            primaryAggregationType: 'Average',
            supportedAggregationTypes: [
              'None',
              'Average',
            ]
          },
        ]
      },
      status: 200,
      statusText: 'OK'
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        const baseUrl = 'http://azuremonitor.com/azuremonitor/subscriptions/9935389e-9122-4ef9-95f9-1513dd24753f/resourceGroups/nodeapp';
        const expected = baseUrl + '/providers/microsoft.insights/components/resource1' +
          '/providers/microsoft.insights/metricdefinitions?api-version=2016-03-01';
        expect(options.url).to.be(expected);
        return ctx.$q.when(response);
      };
    });

    it('should return Aggregation metadata for a Metric', function() {
      return ctx.ds.getAggregations('nodeapp', 'microsoft.insights/components', 'resource1', 'UsedCapacity').then(function(results) {
        expect(results.primaryAggType).to.equal('Total');
        expect(results.supportedAggTypes.length).to.equal(6);
      });
    });
  });
});
