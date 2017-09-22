import {describe, beforeEach, it, expect} from '../lib/common';
import UrlBuilder from '../../src/azure_monitor/url_builder';

describe('AzureMonitorUrlBuilder', function() {
  describe('when metric definition is Microsoft.Sql/servers/databases', function() {
    it('should build the getMetricNames url in the longer format', function() {
      const url = UrlBuilder.buildAzureMonitorGetMetricNamesUrl(
        '',
        'rg',
        'Microsoft.Sql/servers/databases',
        'rn1/rn2',
        '2017-05-01-preview'
      );
      expect(url).to.be('/rg/providers/Microsoft.Sql/servers/rn1/databases/rn2/' +
        'providers/microsoft.insights/metricdefinitions?api-version=2017-05-01-preview');
    });
  });

  describe('when metric definition is Microsoft.Sql/servers', function() {
    it('should build the getMetricNames url in the shorter format', function() {
      const url = UrlBuilder.buildAzureMonitorGetMetricNamesUrl(
        '',
        'rg',
        'Microsoft.Sql/servers',
        'rn',
        '2017-05-01-preview'
      );
      expect(url).to.be('/rg/providers/Microsoft.Sql/servers/rn/' +
        'providers/microsoft.insights/metricdefinitions?api-version=2017-05-01-preview');
    });
  });
});
