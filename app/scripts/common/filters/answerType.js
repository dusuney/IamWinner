(function (ng) {
    "use strict";

    var AnswerType = function () {
        return function (value) {
            var statusList = ['Без ответа', 'Выбор 1 из 4', 'Выбор несколько правильных ответов из 5', 'Ответ в строку'];
            return statusList[value];
        };
    };

    ng.module('editor.common.filters').filter('AnswerType', [AnswerType]);
})(angular);
