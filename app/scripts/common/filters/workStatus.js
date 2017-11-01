(function (ng) {
    "use strict";

    var WorkStatus = function () {
        return function (value) {
            var statusList = ['назначен', 'ожидание оплаты', 'начат', 'закончен', 'удален'];
            return statusList[value];
        };
    };

    ng.module('editor.common.filters').filter('WorkStatus', [WorkStatus]);
})(angular);
