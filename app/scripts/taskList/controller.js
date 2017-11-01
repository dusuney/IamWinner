(function (ng) {
    'use strict';

    ng.module('editor.taskList')
        .controller('TaskListCtrl', TaskListCtrl);

    TaskListCtrl.$inject = ['$scope', '$location', 'panels'];

    function TaskListCtrl($scope, $location, panels) {
        this.$scope = $scope;
        this.$location = $location;
        this.panel = new panels.TaskListPanel();
        this.panel.loadPage(1);
    }

    TaskListCtrl.prototype = {
        onClickRow: function (row) {
            if (row && row.Id > 0) {
                /**
                    location не переводит почему то страницу, пришлось заюзать старый добрый метод
                 */
                window.location.href = "editTask/" + row.Id;
            }
        }
    }

})(angular);
