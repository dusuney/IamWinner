'use strict';

describe('Service Task', function () {
    var TaskService, httpBackend, rootScope;
    var apiUrl = "/task/get";


    beforeEach(function () {
        module('editor.editTask');
        var model;
        inject(function (_TaskService_, $httpBackend, $rootScope) {
            TaskService = _TaskService_;
            httpBackend = $httpBackend;
            rootScope = $rootScope;
        });
    });


    it('Should GET task object with "Answers" ', function () {

        var responseObj = {
            "success": true,
            "data": {
                "Id": 1098,
                "Title": "Руске текст", 
                "Body": "<p>Some data</p>",
                "Mark": 2,  
                "TaskType": 2,
                "AnswerType": 3,
                "Answers": [
                    { "Id": 1028, "Value": "Some value", "OptionId": 1049 }
                ],
                "Options": [
                    { "Id": 1049, "Text": "<p>Some data</p>", "IsCorrect": true },
                    { "Id": 1050, "Text": "<p>Some data</p>", "IsCorrect": false },
                    { "Id": 1051, "Text": "<p>Some data</p>", "IsCorrect": false },
                    { "Id": 1052, "Text": "<p>Some data</p>", "IsCorrect": false }
                ],
                "Hints": []
            }
        };

        httpBackend.expectGET(apiUrl + '?id=123').respond(responseObj);

        var expectedObject = {
            Id: 1098,
            Title: "Руске текст",
            Body: "<p>Some data</p>",
            Mark: 2,
            TaskType: 2,
            AnswerType: 3,
            Answers: [
                    { Id: 1028, Value: "Some value", OptionId: 1049 }
            ],
            Options1Of4: [
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false }
            ],
            OptionsFewOf5: [
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false }
            ],
            Hints: []
        };

        TaskService.get(123).then(function (result) {
            console.log(result.Options1Of4);
            expect(result).toEqual(expectedObject);
        });

        httpBackend.flush();
    });
    
    it('Should GET task object with "Option4" ', function () {

        var responseObj = {
            "success": true,
            "data": {
                "Id": 1098,
                "Title": "Some data",
                "Body": "<p>Some data</p>",
                "Mark": 2,
                "TaskType": 2,
                "AnswerType": 1,
                "Answers": [
                    { "Id": 1028, "Value": "Some value", "OptionId": 1049 }
                ],
                "Options": [
                    { "Id": 1049, "Text": "<p>Some data</p>", "IsCorrect": true },
                    { "Id": 1050, "Text": "<p>Some data</p>", "IsCorrect": false },
                    { "Id": 1051, "Text": "<p>Some data</p>", "IsCorrect": false },
                    { "Id": 1052, "Text": "<p>Some data</p>", "IsCorrect": false }
                ],
                "Hints": []
            }
        };
        httpBackend.expectGET(apiUrl + '?id=123').respond(responseObj);

        var expectedObject = {
            Id: 1098,
            Title: "Some data",
            Body: "<p>Some data</p>",
            Mark: 2,
            TaskType: 2,
            AnswerType: 1,
            Answers: [{ Id: -1, Value: '' }],
            Options1Of4: [
                    { Id: 1049, Text: "<p>Some data</p>", IsCorrect: true },
                    { Id: 1050, Text: "<p>Some data</p>", IsCorrect: false },
                    { Id: 1051, Text: "<p>Some data</p>", IsCorrect: false },
                    { Id: 1052, Text: "<p>Some data</p>", IsCorrect: false }
            ],
            OptionsFewOf5: [
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false },
                { Id: -1, Text: '', IsCorrect: false }
            ],
            Hints: []
        };

        TaskService.get(123).then(function (result) {
            //console.log(result);
            expect(result).toEqual(expectedObject);
        });

        httpBackend.flush();
    });
    
    it('Should GET task object with "Option5" ', function () {

        var responseObj = {
            "success": true,
            "data": {
                "Id": 1098,
                "Title": "Some data",
                "Body": "<p>Some data</p>",
                "Mark": 2,
                "TaskType": 2,
                "AnswerType": 2,
                "Answers": [
                    { "Id": 1028, "Value": "Some value", "OptionId": 1049 }
                ],
                "Options": [
                    { "Id": 1049, "Text": "<p>Some data</p>", "IsCorrect": true },
                    { "Id": 1050, "Text": "<p>Some data</p>", "IsCorrect": false },
                    { "Id": 1051, "Text": "<p>Some data</p>", "IsCorrect": true },
                    { "Id": 1052, "Text": "<p>Some data</p>", "IsCorrect": false },
                    { "Id": 1053, "Text": "<p>Some data</p>", "IsCorrect": true }
                ],
                "Hints": []
            }
        };
        httpBackend.expectGET(apiUrl + '?id=123').respond(responseObj);

        var expectedObject = {
            Id: 1098,
            Title: "Some data",
            Body: "<p>Some data</p>",
            Mark: 2,
            TaskType: 2,
            AnswerType: 2,
            Answers: [{ Id: -1, Value: '' }],
            Options1Of4: [
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false }
            ],
            OptionsFewOf5: [
                    { Id: 1049, Text: "<p>Some data</p>", IsCorrect: true },
                    { Id: 1050, Text: "<p>Some data</p>", IsCorrect: false },
                    { Id: 1051, Text: "<p>Some data</p>", IsCorrect: true },
                    { Id: 1052, Text: "<p>Some data</p>", IsCorrect: false },
                    { Id: 1053, Text: "<p>Some data</p>", IsCorrect: true }
            ],
            Hints: [],

        };

        TaskService.get(123).then(function (result) {
           // console.log(result);
            expect(result).toEqual(expectedObject);
        });

        httpBackend.flush();
    }); 

    //it('Should GET ERROR object ', function () {

    //    var responseObj = {
    //        "success": false,
    //        "data": {
    //        }
    //    };

    //    httpBackend.expectGET(apiUrl + '?id=123').respond(responseObj);

    //    var expectedObject = {
            
    //    };

    //    TaskService.get(123).then(function (result) {
    //        //console.log(result);
    //        //expect(result.OptionsFewOf5).toEqual(expectedObject.OptionsFewOf5);
    //    });

    //    httpBackend.flush();

    //});

    it('Should get prepared task object', function () {
               
        var frontendObject = {
            Id: 1098,
            Title: "Тестовый текст",
            Body: "<p>Тестовый текст $a+b$</p>",
            Mark: 2,
            TaskType: 2,
            AnswerType: 2,
            Answers: [{ Id: -1, Value: '' }],
            Options1Of4: [
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false },
                    { Id: -1, Text: '', IsCorrect: false }
            ],
            OptionsFewOf5: [
                    { Id: 1049, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: true },
                    { Id: 1050, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: false },
                    { Id: 1051, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: true },
                    { Id: 1052, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: false },
                    { Id: 1053, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: true }
            ],
            Hints: [],
        };

        var expectedObject = {
            Id: 1098,
            Title: "Тестовый текст",
            Body: "<p>Тестовый текст $a+b$</p>",
            Mark: 2,
            TaskType: 2,
            AnswerType: 2,
            Answers: [],
            Options: [
                    { Id: 1049, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: true },
                    { Id: 1050, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: false },
                    { Id: 1051, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: true },
                    { Id: 1052, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: false },
                    { Id: 1053, Text: "<p>Тестовый текст $a+b$</p>", IsCorrect: true }
            ],
            Hints: [],

        };

        var preparedObject = TaskService.getPreparedTaskObject(frontendObject);
        //console.log(preparedObject);
        expect(preparedObject).toEqual(expectedObject);
    });
});
