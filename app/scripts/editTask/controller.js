(function (ng) {
    'use strict';

    ng.module('editor.editTask')
        .controller('EditTaskCtrl', EditTaskCtrl);

    EditTaskCtrl.$inject = [
        '$scope',
        '$location',
        'TaskService',
        'textAngularManager',
        '$rootScope',
        'FieldValidationService',
        'toolbar',
        '$timeout',
        'HandlerService'
    ];

    function EditTaskCtrl(
        $scope,
        $location,
        TaskService,
        textAngularManager,
        $rootScope,
        FieldValidationService,
        toolbar,
        $timeout,
        HandlerService) {
        this.TaskService = TaskService;
        this.FieldValidation = FieldValidationService;
        this.$rootScope = $rootScope;
        this.isPreview = false;
        this.toolbar = toolbar;
        this.$timeout = $timeout;
        this.handlers = HandlerService;
        this.task = {};
        /** 
         model (TaskId : 0\{id} , Mode : "create\update") мы передаем в editTask.xsl 
         */
        var self = this;
        self.init();
    }

    EditTaskCtrl.prototype = {
        onSaveEdit: function () {
            var self = this;
            self.TaskService.save(this.form, this.task);
        },
        onCopy: function () {
            var self = this;
            if (self.TaskService.isNewObject) {
                return;
            }
            /**
             Vsavit' costil' dlya smeni заголовка меню
             */
            self.changeNavitationTitle();
            self.TaskService.isNewObject = true;
            self.task = self.TaskService.getCopiedObject(self.task);
        },
        form: {},
        isInvalidLengthField: function (field, limit) {

            if (this.form[field].$modelValue && this.form[field].$modelValue.length > limit) {
                this.form.$setValidity('maxText', false);
                return true;
            } else {
                this.form.$setValidity('maxText', true);
                return false;
            }

        },
        isShowErrors: false,
        init: function () {
            var self = this;

            if (self.TaskService.isNewObject) {
                this.task = this.TaskService.getNewTask();
            } else {
                self.TaskService.get(model.TaskId).then(function (result) {
                    self.task = result;
                });
            }
        },
        showPreviewWindow: function () {
            this.isPreview = true;
        },
        onCancelEdit: function () {
            this.TaskService.moveToTaskList();
        }
    };

})(angular);
