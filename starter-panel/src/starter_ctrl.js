import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import './css/starter-panel.css!';

const panelDefaults = {
  bgColor: null,
};

export class StarterCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);

    // Set panel defaults for properties that the user has not set explicitly
    _.defaultsDeep(this.panel, panelDefaults);

    // init-edit-mode event is triggered when the user clicks on edit
    // the editor tabs are initialized in the handler
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

    // The panel-teardown event is useful for cleaning up to avoid memory leaks
    this.events.on('panel-teardown', this.onPanelTeardown.bind(this));

    // The panel initialized event can be useful for panels that inherit PanelCtrl instead of MetricsPanelCtrl
    // With a MetricsPanelCtrl panel, you usually want to wait for some data to be received
    this.events.on('panel-initialized', this.render.bind(this));

    // The data-received event is triggered when the datasource returns with data
    this.events.on('data-received', this.onDataReceived.bind(this));

    // The data-error event can be handled by showing a friendly error message to the user or to ignore the error
    this.events.on('data-error', this.onDataError.bind(this));

    // The data-snapshot-load event is triggered when the dashboard is loading as a snapshot
    // Read more about saving and loading snapshot data here:
    this.events.on('data-snapshot-load', this.onDataSnapshotLoad.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/grafana-starter-panel/editor.html', 2);
  }

  onPanelTeardown() {
  }

  onDataReceived(dataList) {
    if (!dataList) return;
  }

  onDataError() {
    this.onDataReceived([]);
  }

  onDataSnapshotLoad(snapshotData) {
    this.onDataReceived(snapshotData);
  }

  /*
  The link function is an Angular function that can be used to access the HTML element for the panel
  */
  /* eslint class-methods-use-this: 0 */
  link(scope, elem) {
    this.events.on('render', () => {
      const $panelContainer = elem.find('.panel-container');

      if (this.panel.bgColor) {
        $panelContainer.css('background-color', this.panel.bgColor);
      } else {
        $panelContainer.css('background-color', '');
      }
    });
  }
}

StarterCtrl.templateUrl = 'module.html';
