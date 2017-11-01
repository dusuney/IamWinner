(function (ng) {
    'use strict';

    ng.module('editor.common.services')
        .service('TaskService', TaskService);

    TaskService.$inject = ["TaskResource", "taskTypes", "$rootScope", "$timeout"];

    function TaskService(taskResource, taskTypes, $rootScope, $timeout) {
        this.taskResource = taskResource;
        this.taskTypes = taskTypes;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;

        this.isLoaded = false;
        this.isShowErrors = false;
        this.task = {};
        this.canSave = true;
        this.isNewObject = true;

        if (typeof model !== 'undefined') {
            this.isNewObject = model && model.TaskId > 0 && model.Mode == "update" ? false : true;
        }
    }

    TaskService.prototype = {
        toggleMode: function (mode) {
            mode.htmlMode = !mode.htmlMode;
        },
        setTaskObjects: function (to, from, answerType) {
            switch (answerType) {
                case 1:
                    to.Options = from.Options1Of4;
                    break;
                case 2:
                    to.Options = from.OptionsFewOf5;
                    break;
                case 3:
                    to.Answers = from.Answers;
                    break;
                case 4:
                    to.Options = from.Options1Of5;
                    break;
                default:
                    to.Options = [];
                    to.Answers = [];
            }
        },
        initTaskObjects: function (to, from, answerType) {

            switch (answerType) {
                case 1:
                    to.Options1Of4 = from.Options;
                    break;
                case 2:
                    to.OptionsFewOf5 = from.Options;
                    break;
                case 3:
                    to.Answers = from.Answers;
                    break;
                case 4:
                    to.Options1Of5 = from.Options;
                    break;
            }
        },
        getPreparedTaskObject: function (task) {
            var self = this;

            var newTask = {
                Id: task.Id,
                Title: task.Title,
                //icon: null,
                Body: task.Body,
                Mark: task.Mark,
                AnswerType: task.AnswerType,
                TaskType: task.TaskType,
                Hints: task.Hints,
                Answers: [],
                Options: []
            }

            this.setTaskObjects(newTask, task, task.AnswerType);

            return newTask;
        },
        create: function (task) {
            var self = this;
            var newTask = this.getPreparedTaskObject(task);

            return this.taskResource.create(JSON.stringify(newTask)).$promise.then(function (result) {
                self.moveToTaskList(); //TODO: need make redirect from the server side
            }, function (error) {
                self.canSave = true;
                self.$rootScope.$emit("showWindow", "Ошибка создания", error.message || []);
            });
        },
        get: function (taskId) {
            var self = this;
            return this.taskResource.get({
                id: taskId
            }).$promise.then(function (result) {
                if (result.success) {
                    self.isLoaded = true;

                    var taskData = result.data;
                    var task = self.getNewTask();

                    task.Id = taskData.Id;
                    task.Title = taskData.Title;
                    task.Body = taskData.Body;
                    task.bodyMode = { htmlMode: false };
                    task.Mark = taskData.Mark;
                    task.AnswerType = taskData.AnswerType;
                    task.TaskType = taskData.TaskType;
                    task.Hints = taskData.Hints;

                    self.initTaskObjects(task, taskData, taskData.AnswerType);

                    return task;
                }
            }, function (error) {
                return error;
            });
        },

        update: function (task) {
            var self = this;

            var updatedTask = this.getPreparedTaskObject(task);

            return this.taskResource.update(
                JSON.stringify(updatedTask)
            ).$promise.then(function (result) {
                self.moveToTaskList();//TODO: need make redirect from the server side
            }, function (error) {
                self.$rootScope.$emit("showWindow", "Ошибка обновления", error.message || []);
                self.canSave = true;
            });
        },
        getNewTask: function () {
            this.isLoaded = true;
            return {
                Id: -1,
                Title: '',
                //icon: null,
                Body: '',

                Mark: null,
                AnswerType: null,
                TaskType: null,
                Options1Of4: [
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false }
                ],
                OptionsFewOf5: [
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false }
                ],
                Options1Of5: [
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false }
                ],
                Answers: [{ Id: -1, Value: '' }],
                Hints: []
            }
        },
        save: function (form, task) {
            var self = this;

            form.$setSubmitted();

            if (!form.$valid) {
                self.isShowErrors = true;
                return;
            }

            this.canSave = false;

            if (self.isNewObject) {
                this.create(task);
            } else {
                this.update(task);
            }
        },
        mapCopiedTask: function (task) {
            var newTask = {
                Id: task.Id,
                Title: task.Title,
                //icon: null,
                Body: task.Body,
                Mark: task.Mark,
                AnswerType: task.AnswerType,
                TaskType: task.TaskType,
                Hints: task.Hints,
                Answers: task.Answers,
                Options1Of4: task.Options1Of4,
                OptionsFewOf5: task.OptionsFewOf5,
                Options1Of5: task.Options1Of5,
            }

            newTask.Hints = newTask.Hints.map(function (hint) {
                hint.Id = -1;
                return hint;
            });

            newTask.Options1Of4 = newTask.Options1Of4.map(function (option) {
                option.Id = -1;
                option.IsCorrect = false;
                return option;
            });

            newTask.OptionsFewOf5 = newTask.OptionsFewOf5.map(function (option) {
                option.Id = -1;
                option.IsCorrect = false;
                return option;
            });

            newTask.Options1Of5 = newTask.Options1Of5.map(function (option) {
                option.Id = -1;
                option.IsCorrect = false;
                return option;
            });

            return task;
        },
        getCopiedObject: function (task) {
            var newTask = this.mapCopiedTask(task);
            this.updateDirectives();
            return newTask;
        },
        updateDirectives: function () {
            var self = this;

            this.isLoaded = false;
            this.$timeout(function () {
                self.isLoaded = true;
            }, 200);
        },
        moveToTaskList: function () {
            //TODO: need make redirect from the server side
            window.location.href = window.location.origin + "/taskList";
        },

    }
})(angular);

