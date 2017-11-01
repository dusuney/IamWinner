(function (ng) {
    'use strict';

    ng.module('editor.common.resources')
        .factory('WorkEntryResource', WorkEntry);

    WorkEntry.$inject = ['$resource'];

    function WorkEntry($resource) {
        return $resource('/workentry/:action', {}, {
            'sendanswer': {
                method: 'POST',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                params: {
                    action: 'sendanswer'
                }
            },
            'get': {
                method: 'GET',
                params: {
                    action: 'get'
                }
            },
            'openhint': {
                method: 'GET',
                params: {
                    action: 'openhint'
                }
            }
        });
    }

})(angular);
