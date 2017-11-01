(function (ng, $) {
    "use strict";

    var TaskSetTypeHint = function () {
        return function (value) {
            var iconsList = [
                'Урок',
                'Курс',
                'Тест'];
            return iconsList[value];
        };
    };

    ng.module('editor.common.filters').filter('TaskSetTypeHint', [TaskSetTypeHint]);
})(angular, jQuery);
