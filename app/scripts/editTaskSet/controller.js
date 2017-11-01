(function (ng) {
    'use strict';

    ng.module('editor.editTaskSet')
        .controller('EditTaskSetCtrl', EditTaskSetCtrl);

    EditTaskSetCtrl.$inject = ['$scope', '$rootScope', '$location', 'TaskSetService', 'FieldValidationService', 'toolbar', '$timeout', 'HandlerService'];

    function EditTaskSetCtrl($scope, $rootScope, $location, TaskSetService, FieldValidationService, toolbar, $timeout, HandlerService) {
        this.$rootScope = $rootScope;
        this.TaskSetService = TaskSetService;
        this.FieldValidation = FieldValidationService;
        this.toolbar = toolbar;
        this.$timeout = $timeout;
        this.handlers = HandlerService;
        this.init();

    }

    EditTaskSetCtrl.prototype = {
        init: function () {
            var self = this;

            if (self.TaskSetService.isNewObject) {
                this.taskSet = this.TaskSetService.getDefaultObject();
                this.TaskSetService.isLoaded = true;
            } else {
                self.TaskSetService.get(model.TaskSetId).then(function (result) {
                    self.taskSet = result;
                });
            }

            // this.$timeout(function(){
            //     self.form.$setPrestine();
            // }, 1500);

        },
        showPreviewWindow: function () {
            this.isPreview = true;
        },
        onChangeImage: function () {
            var self = this;
            self.$rootScope.$emit('loadImageToEditor',
                function (image) {
                    if (image) {
                        self.taskSet.IconId = image.Id;
                        self.taskSet.IconUrl = image.Url;
                    }

                });
        },
        isInvalidLengthField: function (field, limit) {
            if (!this.form[field] || !this.form[field].$modelValue) {
                return false;
            }

            if (this.form[field].$modelValue.length > limit) {
                this.form.$setValidity('maxText', false);
                return true;
            } else {
                this.form.$setValidity('maxText', true);
                return false;
            }

        },
        onDeleteImage: function () {
            var self = this;
            self.taskSet.IconId = 0;
            self.taskSet.IconUrl = null;
        },
        onSaveEdit: function () {
            this.TaskSetService.save(this.form, this.taskSet);
        },
        onCancelEdit: function () {
            this.TaskSetService.moveToTaskSetList();
        },
        toggleMode: function (mode) {
            mode.htmlMode = !mode.htmlMode;
        }
    }

})(angular);
