(function (ng) {
    'use strict';

    ng.module('editor.components.step')
        .controller('EditStepCtrl', EditStepCtrl);

    EditStepCtrl.$inject = ['$scope', '$location', 'FieldValidationService', '$timeout', '$rootScope', 'toolbar'];

    function EditStepCtrl($scope, $location, FieldValidationService, $timeout, $rootScope, toolbar) {
        this.FieldValidation = FieldValidationService;
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;
        this.toolbar = toolbar;
        this.taskSet = null;
    }

    EditStepCtrl.prototype = {
        onMoveUpBlock: function (index) {
            if (index - 1 < 0) {
                return;
            }
            var current = {};
            var previous = {};

            ng.copy(this.taskSet.Steps[index], current);
            ng.copy(this.taskSet.Steps[index - 1], previous);

            previous.Position += 1;
            current.Position -= 1;

            this.taskSet.Steps[index] = previous;
            this.taskSet.Steps[index - 1] = current;

        },
        onMoveDownBlock: function (index) {

            if (index + 1 === this.taskSet.Steps.length) {
                return;
            }
            var current = {};
            var next = {};

            ng.copy(this.taskSet.Steps[index], current);
            ng.copy(this.taskSet.Steps[index + 1], next);

            next.Position -= 1;
            current.Position += 1;

            this.taskSet.Steps[index] = next;
            this.taskSet.Steps[index + 1] = current;

        },
        onRemoveBlock: function (index) {
            this.taskSet.Steps.splice(index, 1);
            for (index; index < this.taskSet.Steps.length; index++) {
                this.taskSet.Steps[index].Position -= 1;
            }
        },

        onAddStep: function () {
            var position = this.taskSet.Steps.length + 1;

            var obj = {
                Id: -1,
                Mark: 0,
                Position: position,
                Entries: []
            };

            this.taskSet.Steps.push(obj);
        },
        onAddTask: function (indexStep) {
            this.$rootScope.$emit('editTasksWindow', indexStep);
        },
        onRemoveTask: function (indexStep, indexTask) {
            var self = this;
            this.taskSet.Steps[indexStep].Entries.splice(indexTask, 1);
            var stepMark = this.getStepMark(this.taskSet.Steps[indexStep]);

            if (stepMark === null) {
                this.taskSet.Steps[indexStep].Mark = null;
            } else {
                this.taskSet.Steps[indexStep].Mark = this.getStepMark(this.taskSet.Steps[indexStep]);
            }
        },

        getStepMark: function (step) {
            var self = this;

            var isNotSimilar = step.Entries.some(function (i) {
                return step.Entries[0].Mark !== i.Mark
            });

            if (isNotSimilar) {
                return null
            } else if (step.Entries[0]) {
                return step.Entries[0].Mark;
            } else {
                return 0;
            }
        },
        getTotalMark: function () {
            var self = this;
            if (!this.taskSet) {
                return;
            }

            var isNotSimilar = this.taskSet.Steps.some(function (i) {
                return self.taskSet.Steps[0].Mark !== i.Mark
            });

            if (isNotSimilar) {
                return null;
            } else if (this.taskSet.Steps[0]) {
                return this.taskSet.Steps[0].Mark;
            } else {
                return 0;
            }
        },
        isEmptyStep: function () {
            return this.taskSet.Steps.some(function (step) {
                return step.Entries.length === 0;
            });
        },
        isInvalidTasks: function () {
            if (this.taskSet && this.form) {
                if (this.isEmptyStep()) {
                    this.form.$setValidity('isEmptyStep', false);
                    return this.isShowErrorHint();
                } else {
                    this.form.$setValidity('isEmptyStep', true);
                    return false;
                }
            }
        },
        isInvalidSteps: function () {
            if (!this.form) {
                return;
            }

            if (this.taskSet && this.taskSet.Steps.length === 0) {
                this.form.$setValidity('isNotStep', false);
                return this.isShowErrorHint();
            } else {
                this.form.$setValidity('isNotStep', true);
                return false;
            }
        },
        isShowErrorHint: function () {
            if (this.form.$submitted) {
                return true;
            } else {
                return false;
            }
        }
    };

})(angular);
