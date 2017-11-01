(function (ng, $) {
    'use strict';

    ng.module('editor.components.hints')
        .directive('hints', Hints);
    Hints.$inject = [];

    function Hints() {
        return {
            restrict: "AE",
            scope: {
                task: '=',
                form: '=',
                isEdit: '=',
                isInvalidLengthField:'&'
            },
            // bindToController: true,
            controllerAs: 'hintsCtrl',
            controller: 'HintsCtrl',
            templateUrl: '/pages/hints/index.html',
            link: function (scope, element, attrs, hintsCtrl) {
                hintsCtrl.task = scope.task;
                hintsCtrl.form = scope.form;
            }
        };
    }
})(angular, jQuery);
