(function (ng) {
    "use strict";

    var Classes = function () {
        return function (value) {
            var classesList = ['10', '11'];
            return classesList[value];
        };
    };

    ng.module('editor.common.filters').filter('Classes', [Classes]);
})(angular);
