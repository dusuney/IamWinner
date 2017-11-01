(function (ng) {
    'use strict';

    ng.module('editor.common.constants')
        .constant('taskTypes', [
        	{ id: 0, name: 'Лекция' },
            { id: 1, name: 'Задача' },
            { id: 2, name: 'Видео' },
            { id: 3, name: 'Задание с подсказкой' }
        ]);

})(angular);

