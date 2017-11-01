(function (ng) {
    'use strict';

    ng.module('editor.common.resources')
        .factory('TaskResource', Task);

    Task.$inject = ['$resource'];

    function Task($resource) {
        return $resource('/task/:action', {}, {
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
