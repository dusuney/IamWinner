(function (ng) {
    'use strict';

    ng.module('editor.common.constants')
        .constant('subjects', [
        	{ id: 0, name: 'Алгебра' },
            { id: 1, name: 'Геометрия' },
            { id: 2, name: 'Экономика' }
        ]);

})(angular);

