(function (ng) {
    'use strict';

    ng.module('editor.components.works')
        .controller('EditStudentWorksCtrl', EditStudentWorksCtrl);

    EditStudentWorksCtrl.$inject = [
        '$scope', 'EditStudentWorkService', 'workStatuses', '$window'];

    function EditStudentWorksCtrl($scope, editStudentWorkService, workStatuses, $window) {
        this.$scope = $scope;
        this.service = editStudentWorkService;
        this.workStatuses = workStatuses;
        this.taskSet = null;
        this.works = [];
        this.selectedUser = null;
        this.AssignWorkStatus = this.workStatuses[0].id || 0;
        this.$window = $window;

        this.columns = [
                    {
                        title: "Id ученика",
                        columnName: "UserId",
                        width: 110
                    },
                    {
                        title: "ФИО ученика",
                        columnName: "Fio",
                        width: 450
                    },
                    {
                        title: "Статус работы",
                        columnName: "Status",
                        width: 120
                    }
                   /* ,{
                        title: "Результат",
                        columnName: "Result",
                        width: 100
                    }*/
        ];
    }

    EditStudentWorksCtrl.prototype = {
        onAddWork: function () {
            var self = this;
            var obj = {
                Id: -1,
                UserId: self.selectedUser.UserId,
                Fio: self.selectedUser.Fio,
                Result: null,
                Status: self.AssignWorkStatus,
                TaskSetId: self.taskSet.Id
            };
            self.works.push(obj);
            this.selectedUser = null;
        },
        onRemoveWork: function (indexWork) {
            var self = this;
            if (self.works && self.works.length > 0) {
                self.works.splice(indexWork, 1);
            };
        },
        init: function () {
            var self = this;
            if (self.taskSet && self.taskSet.Id > 0) {
                self.service.getWorkList(self.taskSet.Id).then(function (works) {
                    self.works = works;
                });
            } else {
                self.closeWindow();
            }
        },
        onSave: function () {
            var self = this;
            self.service.proccessWorkList(self.works).then(function () {
                self.closeWindow();
                self.$window.location.reload();
            });
        },
        isDublicateValue: function () {
            var self = this;
            if (!self.selectedUser) {
                return false;
            }

            return self.works.some(function (work) {
                return work.UserId === self.selectedUser.UserId;
            });
        },
        canAddWork: function () {
            return this.selectedUser && !this.isDublicateValue();
        },
        canDeleteWork: function (indexWork) {
            var result = false;
            var work = indexWork <= this.works.length ? this.works[indexWork] : null;
            if (work) {
                result = work.Status === this.AssignWorkStatus;
            }
            return result;
        }
    };

})(angular);
