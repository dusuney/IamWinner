(function (ng, $) {
    'use strict';

    ng.module('editor.components.step')
        .directive('editStep', EditStep);
    EditStep.$inject = ['$timeout'];

    function EditStep($timeout) {
        return {
            restrict: "AE",
            scope: {
                taskSet: '=',
                form: '=',
                isPreview: '=',
                isEdit:'='
            },
            // bindToController: true,
            controllerAs: 'editStepCtrl',
            controller: 'EditStepCtrl',
            templateUrl: '/pages/step/editSteps/index.html',
            link: function (scope, element, attrs, editStepCtrl) {
                $timeout(function () {
                    editStepCtrl.taskSet = scope.taskSet;
                    editStepCtrl.form = scope.form;
                }, 0);

                scope.columns = [
                    {
                        title: "Заголовок",
                        columnName: "Title"
                    },
                    {
                        title: "Балл",
                        columnName: "Mark"
                    },
                    {
                        title: "Тип",
                        columnName: "TaskType"
                    },
                    {
                        title: "Ответы",
                        columnName: "AnswerType"
                    },
                    {
                        title: "Количество подсказок",
                        columnName: "HintCount"
                    }
                ];

            }
        };
    }
})(angular, jQuery);
