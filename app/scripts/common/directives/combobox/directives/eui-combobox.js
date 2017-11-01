(function (ng, $) {
    'use strict';

    ng.module('editor.common.combobox').directive('euiCombobox', Combobox);

    Combobox.$inject = ['$timeout', '$window', '$document'];

    function Combobox($timeout, $window, $document) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            scope: {
                theme: '@',
                optional: '=',
                required: '=',
                displayProperty: '=',
                onOpen: '&',
                onSelect: '&',
                onClickApply: '&',
                onCloseWindow: '&',
                isDisabled: '=',
                isFilter: '=',
                placeholder: '='
            },
            transclude: true,
            templateUrl: '/pages/directives/combobox/templates/eui-combobox.html',
            controllerAs: 'ctrl',
            controller: 'euiComboboxController',
            link: function (scope, element, attrs, ngModel) {
                scope.ngModel = ngModel;
                // this events group check if combobox received focus by TAB navigation or simply by clicking
                var wasMousedown = false;
                $('.eui-combobox-display', element)
                    .mousedown(function (event) {
                        wasMousedown = true;
                    })
                    .focus(function (event) {
                        if (!wasMousedown && !scope.ctrl.isExpanded && !scope.isDisabled) {
                            scope.$apply(function () {
                                scope.ctrl.isExpanded = true;
                            });
                        }
                    })
                    .click(function (event) {
                        scope.$apply(function () {
                            scope.ctrl.toggleExpand();
                        });
                        wasMousedown = false;
                    });

                // reset value handler
                $('.eui-js-clear-model', element).click(function (event) {
                    event.stopPropagation();
                    ngModel.$setViewValue(null);

                    scope.$apply(function () {
                        scope.ctrl.isExpanded = false;
                    });
                });

                if (scope.required) {
                    ngModel.$validators.required = function (modelValue, viewValue) {
                        if (modelValue === null || modelValue === undefined) return false;
                        return (modelValue.value === 0 || !!modelValue.value);
                    };
                }

                scope.$watch('ctrl.isExpanded', function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }
                    scope.onPanelToggled(newValue);
                });

                scope.ctrl.getDisplayValue = function () {

                    if (ngModel.$modelValue === null || ngModel.$modelValue === undefined) return '';
                    return ngModel.$modelValue[scope.displayProperty];
                };

                scope.ctrl.getPlaceholderValue = function () {

                    if ((ngModel.$modelValue === null || ngModel.$modelValue === undefined || ngModel.$modelValue == '') && scope.placeholder) return scope.placeholder;
                    return '';
                };

                scope.ctrl.canResetValue = function () {
                    return scope.optional && ngModel.$modelValue;
                };

                scope.ctrl.collapsePanel = function () {
                    $('.eui-combobox-display', element).focus();
                    scope.ctrl.isExpanded = false;
                };

                scope.onPanelToggled = function (newValue) {
                    if (newValue) {
                        scope.onPanelOpened();
                    } else {
                        scope.onPanelClosed();
                    }
                };

                var scrollParent = null;
                var panelEl = null;
                var itemsWatcher = null;
                var orientation = "bottom";

                function setTopScroll() {
                    $timeout(function () {
                        $('.eui-combobox-results-row', element).scrollTop(0);
                    }, 0);
                }

                scope.onPanelOpened = function () {
                    $timeout(function () {
                        addDocumentClick();
                        $timeout(scope.setBottomOrientation, 0);
                    }, 0);

                    var elCoords = element[0].getBoundingClientRect();
                    panelEl = $('.eui-combobox-panel', element);
                    //panelEl.css({top: elCoords.bottom, width: element.width()});

                    var elementParents = element.parents();
                    scrollParent = null;
                    $.each(elementParents, function (_, el) {
                        // scrollbars behave correctly only on div's and not custom elements
                        if (el.nodeName.toLowerCase() === "div" &&
                            el.scrollHeight > el.clientHeight) {
                            scrollParent = el;
                        }
                    });
                    // if there are no scrollable div, then default to the document itself
                    scrollParent = scrollParent || $document;
                    $(scrollParent).on('scroll', repositionPanel);

                    itemsWatcher = scope.$watch('ctrl.items', function (newValue, oldValue) {
                        if (newValue === oldValue) return;
                        $timeout(scope.setBottomOrientation, 0);
                        $timeout(scope.setOrientation, 0);
                        setTopScroll();
                    });

                    $('.eui-js-filter-input', element).focus();

                    if (scope.onOpen) {
                        scope.onOpen();
                    }
                };

                scope.ctrl.onPanelOpened = scope.onPanelOpened;

                scope.onPanelClosed = function () {
                    $document.unbind('click', onDocumentClick);
                    $(scrollParent).off('scroll', repositionPanel);
                    scrollParent = null;
                    panelEl = null;
                    // unwatch ctrl.items
                    if (itemsWatcher) {
                        itemsWatcher();
                    }
                };

                scope.setBottomOrientation = function () {
                    orientation = "bottom";

                    if(panelEl) {
                        panelEl
                            .removeClass("eui-s-orientation-top eui-s-orientation-bottom")
                            .addClass("eui-s-orientation-" + orientation);
                        repositionPanel();
                    }
                };

                scope.setOrientation = function () {

                    var panelRect = panelEl[0].getBoundingClientRect();
                    if ($window.innerHeight < panelRect.bottom) {
                        orientation = "top";
                    } else {
                        orientation = "bottom";
                    }
                    panelEl
                        .removeClass("eui-s-orientation-top eui-s-orientation-bottom")
                        .addClass("eui-s-orientation-" + orientation);
                    repositionPanel();
                };

                function onDocumentClick(event) {
                    if ($(event.target).closest('.eui-combobox-panel').length) {
                        addDocumentClick();
                        return;
                    }
                    scope.$apply(function () {
                        scope.ctrl.isExpanded = false;
                    });
                }

                function addDocumentClick() {
                    $document.one('click', onDocumentClick);
                }

                function repositionPanel(event) {
                    var elCoords = element[0].getBoundingClientRect();
                    var panelRect = panelEl[0].getBoundingClientRect();
                    //var newPosition = {width: element.width(), left: elCoords.left};
                    var newPosition = { width: element.width()};
                    if (orientation === "bottom") {
                        //newPosition.top = elCoords.bottom;
                    } else {
                        //newPosition.top = elCoords.top - panelRect.height;
                    }
                    panelEl.css(newPosition);
                }
            }
        };
    }
})(angular, jQuery);
