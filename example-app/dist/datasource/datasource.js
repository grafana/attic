"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, ExampleAppDatasource;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      ExampleAppDatasource = function () {
        function ExampleAppDatasource() {
          _classCallCheck(this, ExampleAppDatasource);
        }

        _createClass(ExampleAppDatasource, [{
          key: "query",
          value: function query(options) {
            return [];
          }
        }, {
          key: "testDatasource",
          value: function testDatasource() {
            return false;
          }
        }]);

        return ExampleAppDatasource;
      }();

      _export("default", ExampleAppDatasource);
    }
  };
});
//# sourceMappingURL=datasource.js.map
