(function (ng, $) {
    'use strict';

    ng.module('editor.components.works')
        .directive('editWorks', EditStudentWorks);
    EditStudentWorks.$inject = ['$rootScope', '$timeout'];

    function EditStudentWorks($rootScope, $timeout) {
        return {
            restrict: "AE",
            scope: {

            },
            // bindToController: true,
            controllerAs: 'editStudentWorksCtrl',
            controller: 'EditStudentWorksCtrl',
            templateUrl: '/pages/editStudentWorks/index.html',
            link: function (scope, element, attrs, editStudentWorksCtrl) {

                editStudentWorksCtrl.closeWindow = function () {
                    $('#editStudentWorksWindow').modal('hide');
                };

                $rootScope.$on('editStudentWorksWindow', function (event, taskSet) {
                    if (!taskSet || !taskSet.Id || taskSet.Id <= 0) {
                        return;
                    }
                    else {
                        editStudentWorksCtrl.taskSet = taskSet;
                        editStudentWorksCtrl.init();
                        $('#editStudentWorksWindow').modal('show');
                    }
                });

            }
        };
    }
})(angular, jQuery);
