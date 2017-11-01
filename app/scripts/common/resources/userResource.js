(function (ng) {
    'use strict';

    ng.module('editor.common.resources')
        .factory('UserResource', User);

    User.$inject = ['$resource'];

    function User($resource) {
        return $resource('/user/:action', {}, {
            'search': {
                method: 'GET',
                params: {
                    action: 'search'
                }
            }
        });
    }

})(angular);
