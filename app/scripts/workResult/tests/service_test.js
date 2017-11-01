'use strict';

describe('Service Task', function () {
    var WorkResultService, rootScope;



    beforeEach(function () {
        module('editor.workResult');
        var model;
        inject(function (_WorkResultService_, $rootScope) {
            WorkResultService = _WorkResultService_;
            rootScope = $rootScope;
        });
    });

    it('Should get option VALID class ', function () {
        var option = {
            IsCorrect: true,
        };

        expect(WorkResultService.getClassOption(option)).toEqual("valid");

    });

    it('Should get option INVALID class ', function () {
        var option = {
            IsChecked: true,
            IsCorrect: false,
        };

        expect(WorkResultService.getClassOption(option)).toEqual("invalid");
    });

    it('Should get option EMPTY class ', function () {
        var option = {
            IsChecked: false,
            IsCorrect: false,
        };

        expect(WorkResultService.getClassOption(option)).toEqual(null);
    });

    it('Should add IsCheck field to options in StudentWork object', function () {
        WorkResultService.StudentWork = {
            Entires: [
                {
                    Answers: [
                        {
                            OptionId: 100
                        }
                    ],

                    Task: {
                        AnswerType: 1,
                        Options: [
                            { Id: 100, IsCorrect: false },
                            { Id: 200, IsCorrect: false },
                            { Id: 300, IsCorrect: true },
                            { Id: 400, IsCorrect: false }
                        ]
                    }
                },
                {
                    Answers: [
                        {
                            OptionId: 100,
                        },
                        {
                            OptionId: 200,
                        }
                    ],

                    Task: {
                        AnswerType: 2,
                        Options: [
                            { Id: 100, IsCorrect: true },
                            { Id: 200, IsCorrect: false },
                            { Id: 300, IsCorrect: true },
                            { Id: 400, IsCorrect: false },
                            { Id: 500, IsCorrect: true }
                        ]
                    }
                },
                {
                    Answers: [
                        {
                            OptionId: 0,
                        }
                    ],

                    Task: {
                        AnswerType: 3,
                        Options: []
                    }
                }
            ]
        };


        var expectedObject = {
            Entires: [
                {
                    Answers: [
                        {
                            OptionId: 100
                        }
                    ],

                    Task: {
                        AnswerType: 1,
                        Options: [
                            { Id: 100, IsCorrect: false, IsChecked:true },
                            { Id: 200, IsCorrect: false, IsChecked: false },
                            { Id: 300, IsCorrect: true, IsChecked: false },
                            { Id: 400, IsCorrect: false, IsChecked: false }
                        ]
                    }
                },
                {
                    Answers: [
                        {
                            OptionId: 100,
                        },
                        {
                            OptionId: 200,
                        }
                    ],

                    Task: {
                        AnswerType: 2,
                        Options: [
                            { Id: 100, IsCorrect: true, IsChecked: true },
                            { Id: 200, IsCorrect: false, IsChecked: true },
                            { Id: 300, IsCorrect: true, IsChecked: false },
                            { Id: 400, IsCorrect: false, IsChecked: false },
                            { Id: 500, IsCorrect: true, IsChecked: false }
                        ]
                    }
                },
                {
                    Answers: [
                        {
                            OptionId: 0,
                        }
                    ],

                    Task: {
                        AnswerType: 3,
                        Options: []
                    }
                }
            ]
        };

        WorkResultService.addIsCheckField();
        expect(WorkResultService.StudentWork).toEqual(expectedObject);
    });



});
