(function (ng) {
    'use strict';

    ng.module('editor.common.resources')
        .factory('TaskSetResource', TaskSet);

    TaskSet.$inject = ['$resource'];

    function TaskSet($resource) {
        return $resource('/taskset/:action', {}, {
            'search': {
                method: 'GET',
                params: {
                    action: 'search'
                }
            },
            'get': {
                method: 'GET',
                params: {
                    action: 'get'
                }
            },
            'catalog': {
                method: 'GET',
                params: {
                    action: 'catalog'
                }
            },
            'create': {
                method: 'POST',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                params: {
                    action: 'create'
                }
            },
            'update': {
                method: 'POST',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                params: {
                    action: 'update'
                }
            }
        });
    }

})(angular);
