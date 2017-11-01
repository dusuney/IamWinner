(function (ng) {
    'use strict';

    var ComboItems = function($timeout, $document) {
        return {
            restrict: 'AE',
            transclude: true,
            require: '^euiCombobox',
            templateUrl: '/pages/directives/combobox/templates/eui-comboitems.html',
            scope: {
                items: '=',
                columns: '=',
                emptyText: '='
            },
            link: function (scope, element, attrs, ctrl) {
                scope.displayProperty = ctrl.displayProperty;
                scope.comboboxCtrl = ctrl;
                scope.$watch('items', function () {
                    scope.comboboxCtrl.items = scope.items;
                });
                
            }
        };
    };

    ng.module('editor.common.combobox')
        .directive('euiComboitems', ['$timeout', '$document', ComboItems ]);
})(angular);
