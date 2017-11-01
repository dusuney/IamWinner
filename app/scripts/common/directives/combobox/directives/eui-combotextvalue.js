(function (ng) {
    'use strict';

    ng.module('editor.common.combobox')
        .directive('euiCombotextvalue', Combopager);
    Combopager.$inject = [ '$timeout', '$document' ];

    function Combopager($timeout, $document) {
        return {
            restrict: 'AE',
            transclude: true,
            require: '^euiCombobox',
            templateUrl: '/pages/directives/combobox/templates/eui-combotextvalue.html',
            scope: {
                typeInput: '=',
                onSetValue: '&'
            },
            link: function (scope, element, attrs, ctrl) {
                scope.displayProperty = ctrl.displayProperty;
                scope.theme = ctrl.theme;
                scope.textValue = {text:null};

                scope.resetTextValue = function($event) {
                    $event.stopPropagation();
                    $('.eui-js-filter-input', element).focus();
                    scope.textValue = {text:null};
                };

                element.on('keyup', '.eui-input', function (event) {
                    if (event.keyCode === 27) {
                        ctrl.collapsePanel();
                        return;
                    }

                    if (event.keyCode === 13) {
                        if (scope.onSetValue) {
                            var returnValue = scope.onSetValue({ textValue: scope.textValue.text });
                            if (returnValue !== false) {
                                $timeout(function () {
                                    ctrl.selectItem(returnValue);
                                }, 0);
                            }
                        }
                        return;
                    }
                });
            }
        };
    }

})(angular);
