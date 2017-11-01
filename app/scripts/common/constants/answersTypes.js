(function (ng) {
    'use strict';

    ng.module('editor.common.constants')
        .constant('answersTypes', [
        	{ id: 0, name: 'Без ответа' },
            { id: 1, name: 'Выбор 1 из 4' },
            { id: 2, name: 'Выбор несколько правильных ответов из 5' },
            { id: 3, name: 'Ответ в строку' },
            { id: 4, name: 'Выбор 1 из 5' }
        ]);

})(angular);


