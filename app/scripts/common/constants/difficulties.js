(function (ng) {
    'use strict';

    ng.module('editor.common.constants')
        .constant('difficulties', [
        	{ id: 0, name: 'Базовый' },
            { id: 1, name: 'Продвинутый' }
        ]);

})(angular);

