(function (ng) {
    'use strict';

    var ComboFilter = function($timeout, $document) {
        return {
            restrict: 'AE',
            require: '^euiCombobox',
            scope: {
                onFilter: '&'
            },
            templateUrl: '/pages/directives/combobox/templates/eui-combofilter.html',
            link: function (scope, element, attrs, comboboxCtrl) {
                scope.comboboxCtrl = comboboxCtrl;
                scope.filterValue = '';
                scope.theme = comboboxCtrl.theme;

                scope.resetFilterValue = function ($event) {
                    comboboxCtrl.onPanelOpened();
                    $event.stopPropagation();
                    $('.eui-js-filter-input', element).focus();
                    scope.filterValue = '';
                };



                $('.eui-js-filter-input', element)
                    .keyup(function (event) {
                        if (event.keyCode === 27) {
                            comboboxCtrl.collapsePanel();
                            return;
                        }
                    })
                    .keypress(function (event) {
                        if (event.keyCode === 13) {
                            event.stopPropagation();
                            event.preventDefault();
                            if (scope.onFilter) {
                                scope.$apply(function () {
                                    scope.onFilter({ filterValue: scope.filterValue });
                                });
                            }
                            return;
                        }
                    });
            }
        };
    };

    ng.module('editor.common.combobox')
        .directive('euiCombofilter', ['$timeout', '$document', ComboFilter ]);
})(angular);
