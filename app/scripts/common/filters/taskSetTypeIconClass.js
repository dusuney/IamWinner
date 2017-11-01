(function (ng, $) {
    "use strict";

    var TaskSetTypeIconClass = function () {
        return function (value) {
            var iconsList = [
                'glyphicon glyphicon-pencil',
                'glyphicon glyphicon-th',
                'glyphicon glyphicon-list'];
            return iconsList[value];
        };
    };

    ng.module('editor.common.filters').filter('TaskSetTypeIconClass', [TaskSetTypeIconClass]);
})(angular, jQuery);
