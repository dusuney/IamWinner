(function (ng, $, MathJax) {
    'use strict';

    ng.module('editor.workList')
        .directive('workList', WorkList);
    WorkList.$inject = ['$timeout'];

    function WorkList($timeout) {
        return {
            restrict: "AE",
            scope: {

            },
            // bindToController: true,
            controllerAs: 'workListCtrl',
            controller: 'WorkListCtrl',
            templateUrl: '/pages/index.html',
            link: function (scope, element, attrs, workListCtrl) {

            }
        };
    }
})(angular, jQuery, MathJax);
