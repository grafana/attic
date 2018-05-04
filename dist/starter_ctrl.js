'use strict';

System.register(['app/plugins/sdk', 'lodash', './css/starter-panel.css!'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, _, _createClass, panelDefaults, StarterCtrl;

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
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_cssStarterPanelCss) {}],
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

      panelDefaults = {
        bgColor: null
      };

      _export('StarterCtrl', StarterCtrl = function (_MetricsPanelCtrl) {
        _inherits(StarterCtrl, _MetricsPanelCtrl);

        function StarterCtrl($scope, $injector) {
          _classCallCheck(this, StarterCtrl);

          var _this = _possibleConstructorReturn(this, (StarterCtrl.__proto__ || Object.getPrototypeOf(StarterCtrl)).call(this, $scope, $injector));

          // Set panel defaults for properties that the user has not set explicitly
          _.defaultsDeep(_this.panel, panelDefaults);

          // init-edit-mode event is triggered when the user clicks on edit
          // the editor tabs are initialized in the handler
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

          // The panel-teardown event is useful for cleaning up to avoid memory leaks
          _this.events.on('panel-teardown', _this.onPanelTeardown.bind(_this));

          // The panel initialized event can be useful for panels that inherit PanelCtrl instead of MetricsPanelCtrl
          // With a MetricsPanelCtrl panel, you usually want to wait for some data to be received
          _this.events.on('panel-initialized', _this.render.bind(_this));

          // The data-received event is triggered when the datasource returns with data
          _this.events.on('data-received', _this.onDataReceived.bind(_this));

          // The data-error event can be handled by showing a friendly error message to the user or to ignore the error
          _this.events.on('data-error', _this.onDataError.bind(_this));

          // The data-snapshot-load event is triggered when the dashboard is loading as a snapshot
          // Read more about saving and loading snapshot data here:
          _this.events.on('data-snapshot-load', _this.onDataSnapshotLoad.bind(_this));
          return _this;
        }

        _createClass(StarterCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/grafana-starter-panel/editor.html', 2);
          }
        }, {
          key: 'onPanelTeardown',
          value: function onPanelTeardown() {}
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            if (!dataList) return;
          }
        }, {
          key: 'onDataError',
          value: function onDataError() {
            this.onDataReceived([]);
          }
        }, {
          key: 'onDataSnapshotLoad',
          value: function onDataSnapshotLoad(snapshotData) {
            this.onDataReceived(snapshotData);
          }
        }, {
          key: 'link',
          value: function link(scope, elem) {
            var _this2 = this;

            this.events.on('render', function () {
              var $panelContainer = elem.find('.panel-container');

              if (_this2.panel.bgColor) {
                $panelContainer.css('background-color', _this2.panel.bgColor);
              } else {
                $panelContainer.css('background-color', '');
              }
            });
          }
        }]);

        return StarterCtrl;
      }(MetricsPanelCtrl));

      _export('StarterCtrl', StarterCtrl);

      StarterCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=starter_ctrl.js.map
