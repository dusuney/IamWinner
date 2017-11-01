'use strict';

describe('Controller step', function () {
    var $controller, rootScope;


    beforeEach(function () {
        module('editor.editTaskSet');
        var model;
        inject(function (_$controller_, $rootScope) {
            $controller = _$controller_;

            rootScope = $rootScope;
        });
    });


    it('Should delete step ', function () {

        var $scope = {};
        var controller = $controller('EditStepCtrl', {
            $scope: $scope
        });

        controller.taskSet = {
            Id: -1,
            Steps: [
                { Id: -1, Mark: 0, Position: 1, Entries: [] },
                { Id: -1, Mark: 0, Position: 2, Entries: [] },
                { Id: -1, Mark: 0, Position: 3, Entries: [] },
                { Id: -1, Mark: 0, Position: 4, Entries: [] }
            ]
        }

        controller.onRemoveBlock(1);

        expect(controller.taskSet.Steps.length).toEqual(3);

        expect(controller.taskSet.Steps[0].Position).toEqual(1);
        expect(controller.taskSet.Steps[1].Position).toEqual(2);
        expect(controller.taskSet.Steps[2].Position).toEqual(3);
    });

});
