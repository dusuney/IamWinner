(function (ng) {
    "use strict";

    var Difficulties = function () {
        return function (value) {
            var difficultiesList = ['Базовый', 'Продвинутый'];
            return difficultiesList[value];
        };
    };

    ng.module('editor.common.filters').filter('Difficulties', [Difficulties]);
})(angular);
