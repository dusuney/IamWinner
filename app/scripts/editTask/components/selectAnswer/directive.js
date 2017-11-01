(function (ng, $) {
    'use strict';

    ng.module('editor.components.selectAnswer')
        .directive('selectAnswer', SelectAnswer);
    SelectAnswer.$inject = [];

    function SelectAnswer() {
        return {
            restrict: "AE",
            scope: {
                task: '=',
                form: '=',
                isEdit: '=',
                isInvalidLengthField: '&'
            },
            // bindToController: true,
            controllerAs: 'selectAnswerCtrl',
            controller: 'SelectAnswerCtrl',
            templateUrl: '/pages/selectAnswer/index.html',
            link: function (scope, element, attrs, selectAnswerCtrl) {
                selectAnswerCtrl.task = scope.task;
                selectAnswerCtrl.init();
            }
        };
    }
})(angular, jQuery);
