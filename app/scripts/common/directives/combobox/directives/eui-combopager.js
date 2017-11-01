(function (ng) {
    'use strict';

    var Combopager = function($timeout, $document) {
        return {
            restrict: 'AE',
            transclude: true,
            require: '^euiCombobox',
            templateUrl: '/pages/directives/combobox/templates/eui-combopager.html',
            scope: {
                pager: '=',
                searchItemsPage: '&'
            },
            link: function (scope, element, attrs, ctrl) {
                scope.displayProperty = ctrl.displayProperty;
                scope.theme = ctrl.theme;

                scope.hasPager = function () {
                    return scope.pager;
                };

                scope.setPage = function(numberPage){
                    if(scope.pager.currentPage >= 1 && scope.pager.currentPage <= scope.pager.totalPages)
                        scope.searchItemsPage({page:numberPage});
                }

                $('.eui-input', element)
                    .keypress(function (event) {
                        if (event.keyCode === 13) {
                            event.stopPropagation();
                            event.preventDefault();

                            return;
                        }
                    });
            }
        };
    };

    ng.module('editor.common.combobox')
        .directive('euiCombopager', ['$timeout', '$document', Combopager ]);
})(angular);
