(function (ng, $) {
    "use strict";

    var TaskSetIconDifficulties = function () {
        return function (value) {
            var iconsList = [
                'glyphicon glyphicon-saved',
                'glyphicon glyphicon-export'];
            return iconsList[value];
        };
    };

    ng.module('editor.common.filters').filter('TaskSetIconDifficulties', [TaskSetIconDifficulties]);
})(angular, jQuery);
