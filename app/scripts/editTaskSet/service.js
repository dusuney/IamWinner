(function (ng) {
    'use strict';

    ng.module('editor.editTaskSet')
        .service('TaskSetService', TaskSetService);

    TaskSetService.$inject = [
        "TaskSetResource",
        "taskTypes",
        "$rootScope",
        "$timeout",
        "subjects",
        "difficulties",
        "classes",
        "taskSetTypes"
    ];

    function TaskSetService(
            taskSetResource,
            taskTypes,
            $rootScope,
            $timeout,
            subjects,
            difficulties,
            classes,
            taskSetTypes
        ) {
        this.taskSetResource = taskSetResource;
        this.taskTypes = taskTypes;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.subjects = subjects;
        this.difficulties = difficulties;
        this.classes = classes;
        this.taskSetTypes = taskSetTypes;

        this.isLoaded = false;
        this.canSave = true;

        if (typeof model !== 'undefined') {
            this.isNewObject = model && model.TaskSetId > 0 && model.Mode == "update" ? false : true;
        }
    }

    TaskSetService.prototype = {
        getPreparedTaskSetObject: function (taskSet) {

        },
        initStepsObject: function (steps) {
            if (!steps || steps.length === 0) {
                return [];
            }

            steps.sort(function (a, b) {
                return a.Position - b.Position;
            });
            return steps;
        },
        create: function (taskSet) {
            var self = this;
            //var newTask = this.prepareObject(task);

            return self.taskSetResource.create(JSON.stringify(taskSet)).$promise.then(function (result) {
                if (result.success) {
                    self.moveToTaskSetList();
                } else {
                    /*Видимо тоже следует выводить ошибку?*/
                    self.canSave = true;
                }
            }, function (error) {
                self.canSave = true;
            });
        },
        get: function (taskSetId) {
            var self = this;
            self.isLoaded = false;
            return this.taskSetResource.get({
                id: taskSetId
            }).$promise.then(function (result) {
                if (result.success) {
                    self.isLoaded = true;
                    var taskSet = result.data;

                    taskSet.Steps = self.initStepsObject(taskSet.Steps);
                    return taskSet;
                }
            }, function (error) {
            });
        },

        update: function (taskSet) {
            var self = this;
            //var newTask = this.prepareObject(task);

            return self.taskSetResource.update(JSON.stringify(taskSet)).$promise.then(function (result) {
                if (result.success) {
                    self.moveToTaskSetList();
                } else {
                    /*Видимо тоже следует выводить ошибку?*/
                    self.canSave = true;
                }
            }, function (error) {
                self.canSave = true;
                self.$rootScope.$emit("showWindow", "Ошибка обновления", error.message || []);
            });
        },
        getDefaultObject: function () {

            return {
                Id: -1,
                Title: '',
                Body: null,
                Brief: null,
                IconId: null,
                IconUrl: null,
                TaskSetType: null,
                Subject: null,
                Difficulty: null,
                DateModified: null,
                Class: null,
                Steps: [{
                    Id: -1,
                    Mark: 0,
                    Position: 1,
                    Entries: []
                }]
            }
        },
        save: function (form, taskSet) {
            form.$setSubmitted();

            if (!form.$valid) {
                this.isShowErrors = true;
                return;
            }

            this.canSave = false;

            if (this.isNewObject) {
                this.create(taskSet);
            } else {
                this.update(taskSet);
            }
        },
        moveToTaskSetList: function () {
            //TODO: need make redirect from the server side
            window.location.href = window.location.origin + "/tasksetlist";
        }
    }
})(angular);

