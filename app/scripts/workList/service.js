(function (ng) {
    'use strict';

    ng.module('editor.workList')
        .service('WorkListService', WorkListService);

    WorkListService.$inject = [
        "$rootScope"
    ];

    function WorkListService(
            $rootScope
        ) {

        this.$rootScope = $rootScope;
    }

    WorkListService.prototype = {

    }

})(angular);

