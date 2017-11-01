(function (ng, $) {
    "use strict";

    var TaskTypeIconClass = function () {
        return function (value) {
            var iconsList = [
                'glyphicon glyphicon-file',
                'glyphicon glyphicon-pencil',
                'glyphicon glyphicon-facetime-video',
                'glyphicon glyphicon-edit'];
            return iconsList[value];
        };
    };

    ng.module('editor.common.filters').filter('TaskTypeIconClass', [TaskTypeIconClass]);
})(angular, jQuery);
