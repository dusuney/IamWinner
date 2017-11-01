(function (ng) {
    "use strict";

    var TaskTypes = function () {
        return function (value) {
            var statusList = ['Лекция', 'Задача', 'Видео', 'Задание с подсказкой'];
            return statusList[value];
        };
    };

    ng.module('editor.common.filters').filter('TaskTypes', [TaskTypes]);
})(angular);
