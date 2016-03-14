import {Datasource} from  './datasource';

class ExampleAppConfigCtrl {}
ExampleAppConfigCtrl.template = '<datasource-http-settings current="ctrl.current"></datasource-http-settings>';

export {
  Datasource,
  ExampleAppConfigCtrl as ConfigCtrl
};