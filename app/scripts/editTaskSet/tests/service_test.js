'use strict';

describe('Service TaskSet', function () {
    var TaskSetService, rootScope;
    
    beforeEach(function () {
        module('editor.editTaskSet');
        var model;
        inject(function (_TaskSetService_, $rootScope) {
            TaskSetService = _TaskSetService_;
            rootScope = $rootScope;
        });
    });


    it('Should sort Steps ', function () {

        var taskSet = {
            Id: -1,
            Steps: [
                { Id: -1, Mark: 0, Position: 4, Entries: [] },
                { Id: -1, Mark: 0, Position: 1, Entries: [] },
                { Id: -1, Mark: 0, Position: 2, Entries: [] },
                { Id: -1, Mark: 0, Position: 3, Entries: [] }
            ]
        };

        taskSet.Steps = TaskSetService.initStepsObject(taskSet.Steps);

        expect(taskSet.Steps).toEqual([
                { Id: -1, Mark: 0, Position: 1, Entries: [] },
                { Id: -1, Mark: 0, Position: 2, Entries: [] },
                { Id: -1, Mark: 0, Position: 3, Entries: [] }, 
                { Id: -1, Mark: 0, Position: 4, Entries: [] }
        ]);
    });

    it('Should get empty arr Steps ', function () {

        var taskSet = {
            Id: -1,
            Steps: null
        };

        taskSet.Steps = TaskSetService.initStepsObject(taskSet.Steps);

        expect(taskSet.Steps).toEqual([]);
    });

});
