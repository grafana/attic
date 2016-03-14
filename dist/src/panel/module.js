'use strict';

System.register(['app/plugins/sdk'], function (_export, _context) {
  var PanelCtrl, NginxPanelCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
    }],
    execute: function () {
      _export('PanelCtrl', NginxPanelCtrl = function (_PanelCtrl) {
        _inherits(NginxPanelCtrl, _PanelCtrl);

        function NginxPanelCtrl($scope, $injector) {
          _classCallCheck(this, NginxPanelCtrl);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(NginxPanelCtrl).call(this, $scope, $injector));
        }

        return NginxPanelCtrl;
      }(PanelCtrl));

      NginxPanelCtrl.template = '<h2>nginx!</h2>';

      _export('PanelCtrl', NginxPanelCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
