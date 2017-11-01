(function (ng) {

    var ComboItem = function($timeout, $document) {
        return {
            restrict: 'AE',
            require: '^euiComboitems',
            template: '<div class="eui-combobox-result-item" ng-click="comboitemsCtrl.selectItem(item)">Hello world</div>',
            scope: {
                item: '&'
            },
            link: function (scope, element, attrs, ctrl) {
            }
        };
    };

    ng.module('editor.common.combobox')
        .directive('euiComboitem', ['$timeout', '$document', ComboItem ]);
})(angular);
