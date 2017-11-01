(function (ng) {
    'use strict';

    ng.module('editor.common.constants')
        .constant('taskSetTypes', [
        	{ id: 0, name: 'Урок' },
            { id: 1, name: 'Курс' },
            { id: 2, name: 'Тест' }
        ]);

})(angular);

