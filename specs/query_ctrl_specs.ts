import {describe, beforeEach, it, sinon, expect} from './lib/common';
import {AzureMonitorQueryCtrl} from '../src/query_ctrl';
import Q from 'q';
import moment from 'moment';

describe('AzureMonitorQueryCtrl', function() {
  let queryCtrl;

  beforeEach(function() {
    queryCtrl = new AzureMonitorQueryCtrl({}, {});
    queryCtrl.datasource = {$q: Q};
  });

  describe('init query_ctrl variables', function() {
    it('time grain variables should be initialized', function() {
      expect(queryCtrl.target.timeGrain).to.be(1);
      expect(queryCtrl.target.timeGrainUnit).to.be('hour');
    });
  });

  describe('when getOptions for the Resource Group dropdown is called', function() {
    const response = [
      {text: 'nodeapp', value: 'nodeapp'},
      {text: 'otherapp', value: 'otherapp'},
    ];

    beforeEach(function() {
      queryCtrl.datasource.metricFindQuery = function(query) {
        expect(query).to.be('?api-version=2017-06-01');
        return this.$q.when(response);
      };
    });

    it('should return a list of Resource Groups', function() {
      return queryCtrl.getResourceGroups('').then(result => {
        expect(result[0].text).to.be('nodeapp');
      });
    });
  });

  describe('when getOptions for the Metric Definition dropdown is called', function() {
    describe('and resource group has a value', function() {
      const response = [
        {text: 'Microsoft.Compute/virtualMachines', value: 'Microsoft.Compute/virtualMachines'},
        {text: 'Microsoft.Network/publicIPAddresses', value: 'Microsoft.Network/publicIPAddresses'},
      ];

      beforeEach(function() {
        queryCtrl.target.resourceGroup = 'test';
        queryCtrl.datasource.getMetricDefinitions = function(query) {
          expect(query).to.be('test');
          return this.$q.when(response);
        };
      });

      it('should return a list of Metric Definitions', function() {
        return queryCtrl.getMetricDefinitions('').then(result => {
          expect(result[0].text).to.be('Microsoft.Compute/virtualMachines');
          expect(result[1].text).to.be('Microsoft.Network/publicIPAddresses');
        });
      });
    });

    describe('and resource group has no value', function() {
      beforeEach(function() {
        queryCtrl.target.resourceGroup = '';
      });

      it('should return without making a call to datasource', function() {
        expect(queryCtrl.getMetricDefinitions('')).to.be(undefined);
      });
    });

  });

  describe('when getOptions for the ResourceNames dropdown is called', function() {
    describe('and resourceGroup and metricDefinition have values', function() {
      const response = [
        {text: 'test1', value: 'test1'},
        {text: 'test2', value: 'test2'},
      ];

      beforeEach(function() {
        queryCtrl.target.resourceGroup = 'test';
        queryCtrl.target.metricDefinition = 'Microsoft.Compute/virtualMachines';
        queryCtrl.datasource.getResourceNames = function(resourceGroup, metricDefinition) {
          expect(resourceGroup).to.be('test');
          expect(metricDefinition).to.be('Microsoft.Compute/virtualMachines');
          return this.$q.when(response);
        };
      });

      it('should return a list of Resource Names', function() {
        return queryCtrl.getResourceNames('').then(result => {
          expect(result[0].text).to.be('test1');
          expect(result[1].text).to.be('test2');
        });
      });
    });

    describe('and resourceGroup and metricDefinition do not have values', function() {
      beforeEach(function() {
        queryCtrl.target.resourceGroup = '';
        queryCtrl.target.metricDefinition = '';
      });

      it('should return without making a call to datasource', function() {
        expect(queryCtrl.getResourceNames('')).to.be(undefined);
      });
    });
  });

  describe('when getOptions for the Metric Names dropdown is called', function() {
    describe('and resourceGroup, metricDefinition and resourceName have values', function() {
      const response = [
        {text: 'metric1', value: 'metric1'},
        {text: 'metric2', value: 'metric2'},
      ];

      beforeEach(function() {
        queryCtrl.target.resourceGroup = 'test';
        queryCtrl.target.metricDefinition = 'Microsoft.Compute/virtualMachines';
        queryCtrl.target.resourceName = 'test';
        queryCtrl.datasource.getMetricNames = function(resourceGroup, metricDefinition, resourceName) {
          expect(resourceGroup).to.be('test');
          expect(metricDefinition).to.be('Microsoft.Compute/virtualMachines');
          expect(resourceName).to.be('test');
          return this.$q.when(response);
        };
      });

      it('should return a list of Metric Names', function() {
        return queryCtrl.getMetricNames('').then(result => {
          expect(result[0].text).to.be('metric1');
          expect(result[1].text).to.be('metric2');
        });
      });
    });

    describe('and resourceGroup, metricDefinition and resourceName do not have values', function() {
      beforeEach(function() {
        queryCtrl.target.resourceGroup = '';
        queryCtrl.target.metricDefinition = '';
        queryCtrl.target.resourceName = '';
      });

      it('should return without making a call to datasource', function() {
        expect(queryCtrl.getMetricNames('')).to.be(undefined);
      });
    });
  });
});
