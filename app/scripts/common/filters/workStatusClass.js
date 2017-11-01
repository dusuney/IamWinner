(function (ng) {
    "use strict";

    var WorkStatusClass = function () {
        return function (value) {
            var statusClassList = ['btn-info', 'btn-warning', 'btn-primary', 'btn-success', 'btn-danger'];
            return statusClassList[value];
        };
    };

    ng.module('editor.common.filters').filter('WorkStatusClass', [WorkStatusClass]);
})(angular);
