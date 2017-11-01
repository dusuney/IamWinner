(function (ng) {
    'use strict';

    ng.module('editor.workResult')
        .service('WorkResultService', WorkResultService);

    WorkResultService.$inject = [
        "$rootScope",
        "$window"
    ];

    function WorkResultService(
            $rootScope,
            $window
        ) {

        this.$rootScope = $rootScope;
        this.$window = $window;

        if (typeof model !== 'undefined') {
            this.StudentWork = model.StudentWork;
            this.addIsCheckField();
        }

        this.canShowMath = true;
    }

    WorkResultService.prototype = {
        onHideResponse: function (item) {
            item.isShow = false;
        },
        onShowResponse: function (item) {
            item.isShow = true;
        },
        onBack: function () {
            this.$window.history.back();
        },
        getPercentProgress: function () {
            return Math.round((this.StudentWork.SuccessCount * 100) / this.StudentWork.TotalCount);
        },
        addIsCheckField: function () {
            this.StudentWork.Entires = this.StudentWork.Entires.map(function (e) {

                if (e.Task.AnswerType != 2 && e.Task.AnswerType != 1) {
                    return e;
                }

                e.Task.Options = e.Task.Options.map(function (option) {

                    var a = e.Answers.find(function (answer) {
                        return answer.OptionId === option.Id;
                    });

                    if (a) {
                        option.IsChecked = true;
                    } else {
                        option.IsChecked = false;
                    }

                    return option;
                });

                return e;
            });
        },
        getClassOption: function (option, step) {
            if (!step.Done) {
                return null;
            }

            if (option.IsCorrect) {
                return "valid";
            }

            if (!option.IsCorrect && option.IsChecked) {
                return "invalid";
            }

            return null;
        }
    }

})(angular);

