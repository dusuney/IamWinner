(function (ng) {
    "use strict";

    var Subjects = function () {
        return function (value) {
            var subjectList = ['Алгебра', 'Геометрия', 'Экономика'];
            return subjectList[value];
        };
    };

    ng.module('editor.common.filters').filter('Subjects', [Subjects]);
})(angular);
