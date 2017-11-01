(function (ng) {
    'use strict';

    ng.module('editor.set')
        .controller('SetCtrl', SetCtrl);

    SetCtrl.$inject = ['$scope', '$rootScope', '$location', 'panels',
        'SetService',
        'taskSetTypes',
        'subjects',
        'difficulties',
        'classes',
        'workStatuses'
    ];

    function SetCtrl(
        $scope,
        $rootScope,
        $location,
        panels,
        SetService,
        taskSetTypes,
        subjects,
        difficulties,
        classes, workStatuses) {
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.SetService = SetService;
        this.taskSetTypes = taskSetTypes;
        this.subjects = subjects;
        this.difficulties = difficulties;
        this.classes = classes;
        this.workStatuses = workStatuses;
        this.progressWorkStatus = this.workStatuses[2].id;
    }

    SetCtrl.prototype = {

    }

})(angular);
