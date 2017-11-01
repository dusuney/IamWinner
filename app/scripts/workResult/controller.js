(function (ng) {
    'use strict';

    ng.module('editor.workResult')
        .controller('WorkResultCtrl', WorkResultCtrl);

    WorkResultCtrl.$inject = ['$scope', '$rootScope', 'WorkResultService'];

    function WorkResultCtrl($scope, $rootScope, WorkResultService) {
        this.$rootScope = $rootScope;
        this.WorkResultService = WorkResultService;
    }

    WorkResultCtrl.prototype = { 

    }

})(angular);
