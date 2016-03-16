'use strict';

System.register(['app/core/config'], function (_export, _context) {
  var config, LogsPageCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appCoreConfig) {
      config = _appCoreConfig.default;
    }],
    execute: function () {
      _export('LogsPageCtrl', LogsPageCtrl = function LogsPageCtrl() {
        _classCallCheck(this, LogsPageCtrl);

        this.name = config.bootData.user.name;
      });

      _export('LogsPageCtrl', LogsPageCtrl);

      LogsPageCtrl.templateUrl = 'components/logs.html';
    }
  };
});
//# sourceMappingURL=logs.js.map
