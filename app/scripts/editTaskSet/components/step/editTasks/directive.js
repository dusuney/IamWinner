(function (ng, $) {
    'use strict';

    ng.module('editor.components.step')
        .directive('editTasks', EditTasks);
    EditTasks.$inject = ['$rootScope', '$timeout'];

    function EditTasks($rootScope, $timeout) {
        return {
            restrict: "AE",
            scope: {
                taskSet: '=',
                form: '='
            },
            // bindToController: true,
            controllerAs: 'editTasksCtrl',
            controller: 'EditTasksCtrl',
            templateUrl: '/pages/step/editTasks/index.html',
            link: function (scope, element, attrs, editTasksCtrl) {


                editTasksCtrl.closeWindow = function () {
                    $('#editTasksWindow').modal('hide');
                }

                $rootScope.$on('editTasksWindow', function (event, indexStep) {
                    editTasksCtrl.taskSet = scope.taskSet;

                    ng.copy(scope.taskSet, editTasksCtrl.taskSetTemp);
                    editTasksCtrl.indexStep = indexStep;
                    editTasksCtrl.selectedTask = null;
                    $('#editTasksWindow').modal('show');
                                        
                });

            }
        };
    }
})(angular, jQuery);
