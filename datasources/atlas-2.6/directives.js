define([
  'angular'
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.directives');

  // Make sure the name match the directive call from panel_directive.js
  // In this case <metric-query-editor-genericdatasource>
  // Watch your casings!
  module.directive('metricQueryEditorAtlas', function() {
    return {
      controller: 'AtlasTargetCtrl',
      templateUrl: 'app/plugins/datasource/atlas/partials/query.editor.html'
    };
  });
  module.directive('metricQueryOptionsAtlas', function() {
    return {
      templateUrl: 'app/plugins/datasource/atlas/partials/query.options.html'
    };
  });
});
