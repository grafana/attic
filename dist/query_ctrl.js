///<reference path="app/headers/common.d.ts" />
System.register(['app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1;
    var AzureMonitorQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            AzureMonitorQueryCtrl = (function (_super) {
                __extends(AzureMonitorQueryCtrl, _super);
                /** @ngInject **/
                function AzureMonitorQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    this.target.timeGrain = 1;
                    this.target.timeGrainUnit = 'hour';
                }
                AzureMonitorQueryCtrl.templateUrl = 'partials/query.editor.html';
                return AzureMonitorQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("AzureMonitorQueryCtrl", AzureMonitorQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map