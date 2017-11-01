(function (ng) {
    'use strict';

    ng.module('editor.catalog')
        .controller('CatalogCtrl', CatalogCtrl);

    CatalogCtrl.$inject = ['$scope', '$location', 'panels',
        'CatalogService',
        'taskSetTypes',
        'subjects',
        'difficulties',
        'classes'

    ];

    function CatalogCtrl($scope, $location, panels, CatalogService, taskSetTypes, subjects, difficulties, classes) {
        this.$location = $location;
       
        this.CatalogService = CatalogService;
        this.taskSetTypes = taskSetTypes;
        this.subjects = subjects;
        this.difficulties = difficulties;
        this.classes = classes;

        this.panel = CatalogService.panel;


    }

    CatalogCtrl.prototype = {

    }

})(angular);
