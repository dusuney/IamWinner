(function (ng) {
    'use strict';

    ng.module('editor.wizard')
        .service('WizardService', WizardService);

    WizardService.$inject = [
        "$rootScope",
        "$timeout",
        "WorkEntryResource",
        "StudentWorkResource",
        "$window"
    ];

    function WizardService(
            $rootScope,
            $timeout,
            WorkEntryResource,
            StudentWorkResource,
            $window
        ) {
        var self = this;

        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.workEntryResource = WorkEntryResource;
        this.studentWorkResource = StudentWorkResource;
        this.$window = $window;

        this.responseForm = null;
        this.isLoaded = false;
        this.isAdmin = null;

        this.selectedStep = { Id: null };
        this.isShowHint = false;
        this.isLoadedStep = false;
        this.canShowMath = false;

        this.taskAnswers = [
            { IsCorrect: false },
            { IsCorrect: false },
            { IsCorrect: false },
            { IsCorrect: false },
            { IsCorrect: false }
        ];

        this.StudentWork = null;

        if (typeof model !== 'undefined') {
            this.StudentWork = model.StudentWork;
        }

        this.result = {};
        if (this.StudentWork.Result) {
            this.result.FinishedCount = this.StudentWork.Result.FinishedCount;
        }

        if (this.StudentWork.CurrentEntry) {
            this.id = this.StudentWork.CurrentEntry.Id;
            this.loadStep();
            this.result = this.StudentWork.Result;
            this.currentIndex = this.getStartIndex();
        } else if (this.StudentWork.Status === 3) {
            this.onFinish();
            this.isLoadedStep = true;
        } else if (this.StudentWork.Status === 2) {
            this.selectedStep = this.StudentWork.Entries[0];
            this.isLoadedStep = true;
        }

        this.selectedValue = {};
    }

    WizardService.prototype = {
        getStartIndex: function () {
            var self = this;
            var startIndex = 0;

            this.StudentWork.Entries.forEach(function (e, i) {
                if (e.Id === self.StudentWork.CurrentEntry.Id) {
                    startIndex = i;
                }
            });

            return startIndex;
        },
        onStep: function (indexStep) {
            var self = this;
            this.selectedValue = false;

            if (this.selectedStep.Id === this.StudentWork.Entries[indexStep].Id) {
                return;
            }

            this.isLoadedStep = false;
            this.canShowMath = false;
            this.selectedStep = this.StudentWork.Entries[indexStep];

            this.id = this.StudentWork.Entries[indexStep].Id;
            this.loadStep();

            this.currentIndex = indexStep;
        },
        onFinish: function () {
            if (this.StudentWork.Status === 2 && this.isEntriesDone()) {
                this.$window.location.reload();
            } else {
                this.selectedStep = { Id: -2 };
                this.currentIndex = this.StudentWork.Entries.length;
                this.isLoadedStep = true;
            }
        },
        isEntriesDone: function () {
            return this.StudentWork.Entries.every(function (e) {
                return e.Done === true;
            });
        },
        onFinishWork: function () {
            var self = this;
            self.studentWorkResource.finish({ id: self.StudentWork.Id }).$promise.then(function (result) {

                if (result.success) {
                    self.$window.location.reload();
                }
            }, function (error) {
                self.$rootScope.$emit("showWindow", "Ошибка получения", error.message || []);
            })

        },
        collectAnswers: function () {
            var result = [];
            var type = this.selectedStep.Task.AnswerType;
            switch (type) {
                case 1:
                    var answer = { Id: -1, OptionId: this.selectedValue.Id };
                    result.push(answer);
                    break;
                case 2:
                    this.selectedStep.Task.Options.forEach(function (option) {
                        if (option.IsCorrect) {
                            var answer = { Id: -1, OptionId: option.Id };
                            result.push(answer);
                        }
                    });
                    break;
                case 3:

                    result.push({ Id: -1, Value: this.selectedStep.Task.Answer });
                    break;
                case 4:
                    var answer = { Id: -1, OptionId: this.selectedValue.Id };
                    result.push(answer);
                    break;
                default:
                    break;
            }
            return result;
        },
        onReply: function () {
            var self = this;
            if (!self.responseForm.$valid) {
                return;
            }

            self.responseForm.$setSubmitted();
            var data = {
                Answers: self.collectAnswers() || null,
                WorkEntryId: self.selectedStep.Id
            };

            this.workEntryResource.sendanswer(data).$promise.then(function (result) {
                self.updateSteps(result.data);

                if (result.data.StudentWorkResult) {
                    self.result.FinishedCount = result.data.StudentWorkResult.FinishedCount;
                }

                self.setNextStep(self.selectedStep);
            }, function (error) {
                self.$rootScope.$emit("showWindow", "Ошибка получения", error.message || []);
            })
        },
        setNextStep: function (selectedStep) {

            var selectedStepIndex = null;

            this.StudentWork.Entries.forEach(function (e, key) {
                if (e.Id === selectedStep.Id) {
                    selectedStepIndex = key;
                }
            });

            var indexesNonDoneElements = [];

            this.StudentWork.Entries.forEach(function (e, key) {
                if (e.Done !== true) {
                    indexesNonDoneElements.push(key);
                }
            });

            var indexNextRightElements = null;

            indexesNonDoneElements.forEach(function (e, key) {
                if (indexNextRightElements === null && e > selectedStepIndex) {
                    indexNextRightElements = e;
                }
            });

            var indexNextLeftElement = null;

            if (!indexNextRightElements && indexesNonDoneElements.length > 0) {
                indexNextLeftElement = indexesNonDoneElements[0];
            }

            if (indexNextRightElements !== null) {
                this.onStep(indexNextRightElements);
            } else if (indexNextLeftElement !== null) {
                this.onStep(indexNextLeftElement);
            } else {
                this.onFinish();
            }
        },
        onNext: function () {
            this.isLoadedStep = false;
            this.canShowMath = false;
            this.selectedValue = false;

            if (this.currentIndex === this.StudentWork.Entries.length - 1) {
                this.onFinish();
            }

            if (this.currentIndex < this.StudentWork.Entries.length - 1) {
                this.currentIndex++;
                this.selectedStep = this.StudentWork.Entries[this.currentIndex];
                this.id = this.StudentWork.Entries[this.currentIndex].Id;
                this.loadStep();
            }
        },
        onPrevious: function () {
            this.isLoadedStep = false;
            this.canShowMath = false;

            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.selectedStep = this.StudentWork.Entries[this.currentIndex];
                this.id = this.StudentWork.Entries[this.currentIndex].Id;
                this.loadStep();
            }
        },
        isSelectedStep: function (step) {
            return this.isLoadedStep && step.Id === this.selectedStep.Id;
        },
        isSelectedFinish: function () {
            if (this.selectedStep) {
                return this.isLoadedStep && this.selectedStep.Id == -2;
            }
        },
        isDone: function (step) {
            if (step.Id) {
                var a = 1 + 1;
            }
            return step.Id !== this.selectedStep.Id && step.Done === true;
        },
        updateSteps: function (data) {
            var self = this;

            this.StudentWork.Entries = this.StudentWork.Entries.map(function (e) {
                if (e.Id === self.selectedStep.Id) {
                    e.Done = true;
                }
                return e;
            });
        },
        someSelected: function () {
            return this.selectedStep.Task.Options.some(function (option) {
                return option.IsCorrect;
            });
        },
        canResponde: function () {
            if (this.selectedStep) {
                return !this.selectedStep.Done;
            }
        },
        loadStep: function () {
            var self = this;

            return this.workEntryResource.get({ id: self.id }).$promise.then(function (result) {
                self.selectedStep.Id = result.data.Id;
                self.selectedStep.Task = result.data.Task;
                self.selectedStep.OpenedHints = result.data.Hints;
                self.selectedStep.Answers = result.data.Answers;
                self.selectedStep.Done = result.data.Done;

                self.markingStepObject();
                self.responseForm.$setPristine();
                self.canShowMath = true;
                self.$timeout(function () { self.isLoadedStep = true; }, 800);
            }, function (error) {
                self.$rootScope.$emit("showWindow", "Ошибка получения", error.message || []);
            });
        },
        markingStepObject: function () {
            var self = this;

            if (self.selectedStep.Task.AnswerType === 1 || self.selectedStep.Task.AnswerType === 2 || self.selectedStep.Task.AnswerType === 4) {
                self.selectedStep.Task.Options = self.selectedStep.Task.Options.map(function (option) {
                    option.IsCorrect = false;
                    return option;
                });
            }

            if ((self.selectedStep.Task.AnswerType === 1 || self.selectedStep.Task.AnswerType === 4)
                && self.selectedStep.Answers.length !== 0) {
                var userResponse = self.selectedStep.Task.Options.find(function (option) {
                    return option.Id === self.selectedStep.Answers[0].OptionId;
                });

                if (userResponse) {
                    self.selectedValue = userResponse;
                }
            }

            if (self.selectedStep.Task.AnswerType === 2 && self.selectedStep.Answers.length !== 0) {

                self.selectedStep.Task.Options = self.selectedStep.Task.Options.map(function (option) {
                    var userResponse = self.selectedStep.Answers.find(function (answer) {
                        return option.Id === answer.OptionId;
                    });

                    if (userResponse) {
                        option.IsCorrect = true;
                        return option;
                    }

                    return option;
                });
            }

            if (self.selectedStep.Task.AnswerType === 3 && self.selectedStep.Answers.length !== 0) {
                self.selectedStep.Task.Answer = self.selectedStep.Answers[0].Value;
            }
        },
        canOpenHint: function () {
            if (this.selectedStep && this.selectedStep.Task && this.canResponde()) {
                return this.selectedStep.Task.Hints.length !== this.selectedStep.OpenedHints.length;
            }
        },
        getNextHintPenalty: function () {
            var indexHint = this.selectedStep.OpenedHints.length;
            return this.selectedStep.Task.Hints[indexHint].Penalty
        },
        onShowHint: function () {
            var self = this;

            var indexHint = self.selectedStep.OpenedHints.length;
            var hint = self.selectedStep.Task.Hints[indexHint];

            this.workEntryResource.openhint({ workEntryId: self.selectedStep.Id, hintId: hint.Id }).$promise.then(function (result) {
                var newHint = result.data;
                /**
                 Show to user
                 */
                hint.isShowHint = true;
                self.loadStep();
            }, function (error) {
                self.$rootScope.$emit("showWindow", "Ошибка получения", error.message || []);
            });

            this.indexOpenedHint++;
        },
        setCorrectAnswer: function (index) {
            var self = this;

            this.selectedStep.Task.Options.forEach(function (e, key) {
                if (index == key) {
                    e.IsCorrect = true;
                } else {
                    e.IsCorrect = false;
                }
            });
        },
        isFinished: function () {
            return this.StudentWork.Status === 3;
        },
        getTotalMark: function () {
            var mark = 0;

            this.StudentWork.Entries.forEach(function (i) {
                if (i.Mark) {
                    mark = mark + i.Mark;
                }
            });

            return mark;
        },
        getMarkProgress: function () {
            return this.StudentWork.Result.Mark + "/" + this.getTotalMark();
        },
        canPrevious: function () {
            return this.currentIndex > 0;
        },
        canNext: function () {
            return this.currentIndex !== this.StudentWork.Entries.length;
        },
        onResult: function () {
            window.location.href = window.location.origin + "/ru/workresult/" + this.StudentWork.Id;
        },
        isShowUnderstandButton: function () {
            if (!this.selectedStep.Task) {
                return;
            }

            return this.selectedStep.Task.AnswerType == 0 &&
                !this.selectedStep.Done
        },
        isShowRespondButton: function () {
            if (!this.selectedStep.Task) {
                return;
            }

            return this.selectedStep.Task.AnswerType != 0 &&
                (!this.responseForm.$invalid || this.canResponde()) &&
                !this.selectedStep.Done
        }
    }

})(angular);

