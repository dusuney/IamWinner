(function (ng) {
    'use strict';

    ng.module('editor.components.selectAnswer')
        .controller('SelectAnswerCtrl', SelectAnswerCtrl);

    SelectAnswerCtrl.$inject = ['$scope', '$location', 'FieldValidationService', 'toolbar', 'answersTypes', 'HandlerService'];

    function SelectAnswerCtrl($scope, $location, FieldValidationService, toolbar, answersTypes, HandlerService) {
        this.FieldValidation = FieldValidationService;
        this.selectedValue = null;
        var self = this;
        this.toolbar = toolbar;
        this.answersTypes = answersTypes;
        this.handlers = HandlerService;
    }

    SelectAnswerCtrl.prototype = {
        setCorrectAnswer: function (index, options) {
            var self = this;
            options = options.map(function (e, key) {
                if (index == key) {
                    e.IsCorrect = true;
                } else {
                    e.IsCorrect = false;
                }
                return e;
            });
        },
        someSelected: function () {
            return this.task.OptionsFewOf5.some(function (value) {
                return value.IsCorrect;
            });
        },
        init: function () {
            this.initCorrectAnswer();
        },
        initCorrectAnswer: function () {
            var self = this;
            if (this.task.AnswerType === 1) {
                this.task.Options1Of4.forEach(function (e, key) {
                    if (e.IsCorrect) {
                        self.selectedValue = key + 1;
                    }
                });
            } else if (this.task.AnswerType === 4) {
                this.task.Options1Of5.forEach(function (e, key) {
                    if (e.IsCorrect) {
                        self.selectedValue = key + 1;
                    }
                });
            }
        },
        toggleMode:function(mode) {
            mode.htmlMode = !mode.htmlMode;
        }
    };

})(angular);
