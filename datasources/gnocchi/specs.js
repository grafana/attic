define([
  'helpers',
  'moment',
  'plugins/datasource/gnocchi/datasource',
], function(helpers, moment) {
  'use strict';

  describe('GnocchiDatasource', function() {
    var ctx = new helpers.ServiceTestContext();

    beforeEach(module('grafana.services'));
    beforeEach(ctx.createService('GnocchiDatasource'));
    beforeEach(function() {
      moment.utc = sinon.stub().returns(moment("2014-04-10T05:20:10Z").utc());
      ctx.ds = new ctx.service({ url: [''], jsonData: {token: 'XXXXXXXXXXXXX'} });
    });

    function assert_simple_test(targets, method, url, data, label){
      var query = {
        range: { from: 'now-2h', to: 'now' },
        targets: targets,
        interval: '1s'
      };
      var headers = {"X-Auth-Token":"XXXXXXXXXXXXX", "Accept":"application/json, text/plain, */*"};
      if (data !== undefined) {
        headers["Content-Type"] = "application/json";
      }
      var results;
      beforeEach(function() {
        ctx.$httpBackend.expect(method, url, data, headers).respond([
          ["2014-10-06T14:33:57", "60.0", "43.1"],
          ["2014-10-06T14:34:12", "60.0", "12"],
          ["2014-10-06T14:34:20", "60.0", "2"]
        ]);
        ctx.ds.query(query).then(function(data) { results = data; });
        ctx.$httpBackend.flush();
      });

      it('should generate the correct query', function() {
        ctx.$httpBackend.verifyNoOutstandingExpectation();
      });

      it('should return series list', function() {
        expect(results.data.length).to.be(1);
        expect(results.data[0].target).to.be(label);
        expect(results.data[0].datapoints[0][0]).to.be('43.1');
        expect(results.data[0].datapoints[0][1]).to.be(1412606037000);
        expect(results.data[0].datapoints[1][0]).to.be('12');
        expect(results.data[0].datapoints[1][1]).to.be(1412606052000);
        expect(results.data[0].datapoints[2][0]).to.be('2');
        expect(results.data[0].datapoints[2][1]).to.be(1412606060000);
      });

    }

    describe('Resource', function() {
      assert_simple_test(
        [{ queryMode: 'resource', resource_type:   'instance', resource_id: 'my_uuid', metric_name: 'cpu_util', aggregator: 'max' }],
        'GET',
        "/v1/resource/instance/my_uuid/metric/cpu_util/measures?" +
          "aggregation=max&end=2014-04-10T03:20:10.000Z&start=2014-04-10T03:20:10.000Z",
        undefined,
        'my_uuid'
        );
    });

    describe('Metric', function() {
      assert_simple_test(
        [{ queryMode: 'metric', metric_id: 'my_uuid', aggregator: 'max' }],
        'GET',
        '/v1/metric/my_uuid/measures?aggregation=max&end=2014-04-10T03:20:10.000Z&start=2014-04-10T03:20:10.000Z',
        undefined,
        'my_uuid'
        );
    });

    describe('Resource aggregation', function() {
      assert_simple_test(
        [{ queryMode: 'resource_aggregation', resource_search: '{"=": {"server_group": "autoscalig_group"}}',
          resource_type: 'instance', label: 'my_aggregation', metric_name: 'cpu_util', aggregator: 'max' }],
        'POST',
        "/v1/aggregation/resource/instance/metric/cpu_util?" +
          "aggregation=max&end=2014-04-10T03:20:10.000Z&start=2014-04-10T03:20:10.000Z",
        {"=": {"server_group": "autoscalig_group"}},
        'my_aggregation');
    });

    describe('Resource search', function() {
      var query = {
        range: { from: 'now-2h', to: 'now' },
        targets: [{ queryMode: 'resource_search', resource_search: '{"=": {"server_group": "autoscalig_group"}}',
          resource_type: 'instance', label: 'display_name', metric_name: 'cpu_util', aggregator: 'max' }],
        interval: '1s'
      };

      var url_expected_search_resources = "/v1/search/resource/instance";
      var response_search_resources = [
        {
          "display_name": "myfirstvm",
          "host": "compute1",
          "id": "6868da77-fa82-4e67-aba9-270c5ae8cbca",
          "image_ref": "http://image",
          "type": "instance",
          "server_group": "autoscalig_group",
        },
        {
          "display_name": "mysecondvm",
          "host": "compute1",
          "id": "f898ba55-bbea-460f-985c-3d1243348304",
          "image_ref": "http://image",
          "type": "instance",
          "server_group": "autoscalig_group",
        }
      ];

      var url_expected_get_measures1 = "/v1/resource/instance/6868da77-fa82-4e67-aba9-270c5ae8cbca/metric/cpu_util/measures?" +
        "aggregation=max&end=2014-04-10T03:20:10.000Z&start=2014-04-10T03:20:10.000Z";
      var response_get_measures1 = [
        ["2014-10-06T14:33:57", "60.0", "43.1"],
        ["2014-10-06T14:34:12", "60.0", "12"],
        ["2014-10-06T14:34:20", "60.0", "2"],
      ];

      var url_expected_get_measures2 = "/v1/resource/instance/f898ba55-bbea-460f-985c-3d1243348304/metric/cpu_util/measures?" +
        "aggregation=max&end=2014-04-10T03:20:10.000Z&start=2014-04-10T03:20:10.000Z";
      var response_get_measures2 = [
        ["2014-10-06T14:33:57", "60.0", "22.1"],
        ["2014-10-06T14:34:12", "60.0", "3"],
        ["2014-10-06T14:34:20", "60.0", "30"],
      ];

      var results;
      beforeEach(function() {
        ctx.$httpBackend.expect('POST', url_expected_search_resources).respond(response_search_resources);
        ctx.$httpBackend.expect('GET', url_expected_get_measures1).respond(response_get_measures1);
        ctx.$httpBackend.expect('GET', url_expected_get_measures2).respond(response_get_measures2);
        ctx.ds.query(query).then(function(data) { results = data; });
        ctx.$httpBackend.flush();
      });

      it('should generate the correct query', function() {
        ctx.$httpBackend.verifyNoOutstandingExpectation();
      });

      it('should return series list', function() {
        expect(results.data.length).to.be(2);
        expect(results.data[0].target).to.be('myfirstvm');
        expect(results.data[1].target).to.be('mysecondvm');
        expect(results.data[0].datapoints[0][0]).to.be('43.1');
        expect(results.data[0].datapoints[0][1]).to.be(1412606037000);
        expect(results.data[0].datapoints[1][0]).to.be('12');
        expect(results.data[0].datapoints[1][1]).to.be(1412606052000);
        expect(results.data[0].datapoints[2][0]).to.be('2');
        expect(results.data[0].datapoints[2][1]).to.be(1412606060000);

      });

    });
  });
});
