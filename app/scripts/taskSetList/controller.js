(function (ng) {
    'use strict';

    ng.module('editor.taskSetList')
        .controller('TaskSetListCtrl', TaskSetListCtrl);

    TaskSetListCtrl.$inject = ['$scope', '$location', 'panels'];

    function TaskSetListCtrl($scope, $location, panels) {
        this.$location = $location;
        this.$location = $location;
        this.panel = new panels.TaskSetListPanel();
        this.panel.loadPage(1);
    }

    TaskSetListCtrl.prototype = {
        onClickRow: function (row) {
            if (row && row.Id > 0) {
                /**
                    location не переводит почему то страницу, пришлось заюзать старый добрый метод
                 */
                window.location.href = "editTaskSet/" + row.Id;
            }
        }
    }

})(angular);
