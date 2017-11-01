(function (ng) {
    "use strict";

    var TaskSetTypes = function () {
        return function (value) {
            var statusList = ['Урок', 'Курс', 'Тест'];
            return statusList[value];
        };
    };

    ng.module('editor.common.filters').filter('TaskSetTypes', [TaskSetTypes]);
})(angular);
