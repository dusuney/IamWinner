(function (ng) {
    'use strict';

    ng.module('editor.components.works')
        .service('EditStudentWorkService', EditStudentWorkService);

    EditStudentWorkService.$inject = [
        "$rootScope",
        "StudentWorkResource"
    ];

    function EditStudentWorkService(
            $rootScope, studentWorkResource) {
        this.$rootScope = $rootScope;
        this.studentWorkResource = studentWorkResource;
        this.taskSetId = 0;
    }

    EditStudentWorkService.prototype = {
        isLoaded: false,
        getWorkList: function (taskSetId) {
            var self = this;

            self.taskSetId = taskSetId;
            return this.studentWorkResource.search({
                TaskSetId: taskSetId
            }).$promise.then(function (result) {
                if (result.success) {
                    var items = result.data.items || [];
                    return items;
                }
            }, function (error) {
                self.isLoaded = false;
            });
        },
        proccessWorkList: function (works) {
            var self = this;
            var data = {
                Works: works.map(self.worksMapper),
                TaskSetId: self.taskSetId
            }
            return self.studentWorkResource.proccess(data).$promise.then(function (result) {
                if (result.success) {
                    return result.success;
                }
            }, function (error) {
            });

        },
        worksMapper: function (item) {
            return {
                Id: item.Id,
                UserId: item.UserId
            }
        }
    }
})(angular);

