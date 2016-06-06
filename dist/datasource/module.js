'use strict';

System.register(['./datasource'], function (_export, _context) {
  "use strict";

  var ExampleAppDatasource, ExampleAppConfigCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      ExampleAppDatasource = _datasource.ExampleAppDatasource;
    }],
    execute: function () {
      _export('ConfigCtrl', ExampleAppConfigCtrl = function ExampleAppConfigCtrl() {
        _classCallCheck(this, ExampleAppConfigCtrl);
      });

      ExampleAppConfigCtrl.template = '<datasource-http-settings current="ctrl.current"></datasource-http-settings>';

      _export('ExampleAppDatasource', ExampleAppDatasource);

      _export('ConfigCtrl', ExampleAppConfigCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
