(function (ng, $) {
    "use strict";

    var AnswerTypeIconClass = function () {
        return function (value) {
            var iconsList = [
                'glyphicon glyphicon-info-sign',
                'glyphicon glyphicon-check',
                'glyphicon glyphicon-list',
                'glyphicon glyphicon-pencil',
                'glyphicon glyphicon-check'];
            return iconsList[value];
        };
    };

    ng.module('editor.common.filters').filter('AnswerTypeIconClass', [AnswerTypeIconClass]);
})(angular, jQuery);
