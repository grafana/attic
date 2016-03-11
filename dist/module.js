'use strict';

System.register(['./components/logs', './components/stream', './components/config'], function (_export, _context) {
  var LogsPageCtrl, StreamPageCtrl, NginxAppConfigCtrl;
  return {
    setters: [function (_componentsLogs) {
      LogsPageCtrl = _componentsLogs.LogsPageCtrl;
    }, function (_componentsStream) {
      StreamPageCtrl = _componentsStream.StreamPageCtrl;
    }, function (_componentsConfig) {
      NginxAppConfigCtrl = _componentsConfig.NginxAppConfigCtrl;
    }],
    execute: function () {
      _export('ConfigCtrl', NginxAppConfigCtrl);

      _export('StreamPageCtrl', StreamPageCtrl);

      _export('LogsPageCtrl', LogsPageCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
