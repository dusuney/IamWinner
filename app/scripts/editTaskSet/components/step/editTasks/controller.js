(function (ng) {
    'use strict';

    ng.module('editor.components.step')
        .controller('EditTasksCtrl', EditTasksCtrl);

    EditTasksCtrl.$inject = ['$scope', '$location', 'FieldValidationService', '$timeout', 'toolbar'];

    function EditTasksCtrl($scope, $location, FieldValidationService, $timeout, toolbar) {
        this.FieldValidation = FieldValidationService;
        this.$timeout = $timeout;
        this.toolbar = toolbar;
        this.taskSet = [];
        this.taskSetTemp = [];
        this.indexStep = null;
        this.selectedTask = null;

        this.columns = [
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
                    }
        ];
    }

    EditTasksCtrl.prototype = {
        onAddTask: function () {
            var obj = {
                Id: -1,
                TaskId: this.selectedTask.TaskId,
                Title: this.selectedTask.Title,
                AnswerType: this.selectedTask.AnswerType,
                Mark: this.selectedTask.Mark,
                TaskType: this.selectedTask.TaskType,
                HintCount: this.selectedTask.HintCount,
                DateModified: this.selectedTask.DateModified
            };
                       
            this.taskSetTemp.Steps[this.indexStep].Entries.push(obj);
            this.taskSetTemp.Steps[this.indexStep].Mark = this.getTotalMark();
            this.selectedTask = null;
        },
        getTotalMark: function () {
            var mark = 0;

            this.taskSetTemp.Steps[this.indexStep].Entries.forEach(function (i) {
                mark += i.Mark;
            });
            return mark;
        },
        onRemoveTask: function (indexTask) {
            var self = this;
            this.taskSetTemp.Steps[this.indexStep].Entries.splice(indexTask, 1);
            this.taskSetTemp.Steps[this.indexStep].Mark = this.getTotalMark();
        },
        onSave: function () {
            // $HTTP
            var self = this;
            this.$timeout(function () { self.taskSet.Steps = self.taskSetTemp.Steps; }, 0)

            this.closeWindow();
        },
        isDublicateValue: function () {
            var self = this;
            if (!this.selectedTask) {
                return false;
            }

            return this.taskSetTemp.Steps[this.indexStep].Entries.some(function (i) {
                return i.TaskId === self.selectedTask.TaskId;
            });
        },
        canAddTask: function () {
            return this.selectedTask && !this.isDublicateValue();
        }
    };

})(angular);
