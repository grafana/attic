'use strict';

System.register(['./components/logs', './components/stream', './components/config'], function (_export, _context) {
  "use strict";

  var LogsPageCtrl, StreamPageCtrl, ExampleAppConfigCtrl;
  return {
    setters: [function (_componentsLogs) {
      LogsPageCtrl = _componentsLogs.LogsPageCtrl;
    }, function (_componentsStream) {
      StreamPageCtrl = _componentsStream.StreamPageCtrl;
    }, function (_componentsConfig) {
      ExampleAppConfigCtrl = _componentsConfig.ExampleAppConfigCtrl;
    }],
    execute: function () {
      _export('ConfigCtrl', ExampleAppConfigCtrl);

      _export('StreamPageCtrl', StreamPageCtrl);

      _export('LogsPageCtrl', LogsPageCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
