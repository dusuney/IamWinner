(function (ng) {
    'use strict';

    ng.module('editor.common.resources')
        .factory('StudentWorkResource', StudentWork);

    StudentWork.$inject = ['$resource'];

    function StudentWork($resource) {
        return $resource('/studentwork/:action', {}, {
            'search': {
                method: 'GET',
                params: {
                    action: 'search'
                }
            },
            'list': {
                method: 'GET',
                params: {
                    action: 'list'
                }
            },
            'finish': {
                method: 'GET',
                params: {
                    action: 'finish'
                }
            },
            'proccess': {
                method: 'POST',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                params: {
                    action: 'proccess'
                }
            }
        });
    }

})(angular);
