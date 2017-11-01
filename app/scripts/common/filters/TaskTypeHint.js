(function (ng, $) {
    "use strict";

    var TaskTypeHint = function () {
        return function (value) {
            var iconsList = [
                'Лекция',
                'Задача',
                'Видео',
                'Задание с подсказкой'];
            return iconsList[value];
        };
    };

    ng.module('editor.common.filters').filter('TaskTypeHint', [TaskTypeHint]);
})(angular, jQuery);
