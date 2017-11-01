(function(ng, $) {
    'use strict';

    ng.module('editor.taskList')
        .directive('taskListPanel', TaskList);
    TaskList.$inject = [];

    function TaskList() {
        return {
            restrict: "AE",
            scope: {
            },
            // bindToController: true,
            controllerAs: 'taskListCtrl',
            controller: 'TaskListCtrl',
            templateUrl: '/pages/index.html',
            link: function(scope, element, attrs, taskListCtrl) {
            }
        };
    }
})(angular, jQuery);
