(function (ng, $) {
    'use strict';

    ng.module('editor.editTask')
        .directive('editTask', EditTask);
    EditTask.$inject = ['$uibModal'];

    function EditTask($uibModal) {
        return {
            restrict: "AE",
            scope: {
                onEditArticle: '&'
            },
            // bindToController: true,
            controllerAs: 'editTaskCtrl',
            controller: 'EditTaskCtrl',
            templateUrl: '/pages/index.html',
            link: function (scope, element, attrs, editTaskCtrl) {

                editTaskCtrl.changeNavitationTitle = function () {
                    var menuItem = $('.main_menu  ul li.active');
                    if (menuItem.length > 0) {
                        var link = $(menuItem).find('a');
                        if (link.length === 1) {
                            var icon = $(link).find('i');
                            $(link).empty().append(icon).append('Создание задания');
                        }

                    }
                }

                //var modalInstance = $uibModal.open({
                //    animation: scope.animationsEnabled,
                //    template: '<h2>Hello</h2>',
                //});

                //modalInstance.result.then(function (selectedItem) {
                //    scope.selected = selectedItem;
                //}, function () { });
            }
        };
    } 
})(angular, jQuery);
