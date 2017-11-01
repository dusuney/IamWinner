(function (ng, $) {
    "use strict";

    var AnswerTypeHint = function () {
        return function (value) {
            var iconsList = [
                'Без ответа',
                'Выбор 1 из 4',
                'Выбор нескольких правильных ответов',
                'Ответ в строку',
                'Выбор 1 из 5'];
            return iconsList[value];
        };
    };

    ng.module('editor.common.filters').filter('AnswerTypeHint', [AnswerTypeHint]);
})(angular, jQuery);
