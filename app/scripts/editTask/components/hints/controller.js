(function (ng) {
    'use strict';

    ng.module('editor.components.hints')
        .controller('HintsCtrl', HintsCtrl);

    HintsCtrl.$inject = ['$scope', '$location', 'FieldValidationService', '$timeout', 'toolbar', 'HandlerService'];

    function HintsCtrl($scope, $location, FieldValidationService, $timeout, toolbar, HandlerService) {
        this.FieldValidation = FieldValidationService;
        this.$timeout = $timeout;
        this.toolbar = toolbar;
        this.handlers = HandlerService;
    }

    HintsCtrl.prototype = {
        toggleMode: function (mode) {
            mode.htmlMode = !mode.htmlMode;
        },
        addHint: function () {
            this.task.Hints.push({
                Id: -1, Text: '', mode: { htmlMode: false }, Penalty: 1,
                Position: this.task.Hints.length
            });

            var self = this;
            this.$timeout(function () { self.form.$setPristine(); }, 0);
        },
        deleteHint: function (index) {
            //this.task.Hints.splice(index, 1);


            this.task.Hints.splice(index, 1);
            for (index; index < this.task.Hints.length; index++) {
                this.task.Hints[index].Position -= 1;
            }

            var self = this;
            this.$timeout(function () { self.form.$setPristine(); }, 0);
        },
        onMoveUpBlock: function (index) {
            if (index - 1 < 0) {
                return;
            }
            var current = {};
            var previous = {};

            ng.copy(this.task.Hints[index], current);
            ng.copy(this.task.Hints[index - 1], previous);

            previous.Position += 1;
            current.Position -= 1;

            this.task.Hints[index] = previous;
            this.task.Hints[index - 1] = current;

        },
        onMoveDownBlock: function (index) {

            if (index + 1 === this.task.Hints.length) {
                return;
            }
            var current = {};
            var next = {};

            ng.copy(this.task.Hints[index], current);
            ng.copy(this.task.Hints[index + 1], next);

            next.Position -= 1;
            current.Position += 1;

            this.task.Hints[index] = next;
            this.task.Hints[index + 1] = current;

        }
    };

})(angular);
