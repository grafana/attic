'use strict';

System.register([], function (_export, _context) {
  var _createClass, ExampleAppConfigCtrl;

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

      _export('ExampleAppConfigCtrl', ExampleAppConfigCtrl = function () {
        function ExampleAppConfigCtrl() {
          _classCallCheck(this, ExampleAppConfigCtrl);
        }

        _createClass(ExampleAppConfigCtrl, [{
          key: 'shooow',
          value: function shooow() {}
        }]);

        return ExampleAppConfigCtrl;
      }());

      _export('ExampleAppConfigCtrl', ExampleAppConfigCtrl);

      ExampleAppConfigCtrl.templateUrl = 'components/config.html';
    }
  };
});
//# sourceMappingURL=config.js.map
