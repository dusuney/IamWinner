(function (ng) {
    'use strict';

    var ComboTopics = function($timeout, $document) {
        return {
            restrict: "AE",
            require: "^euiCombobox",
            scope: {
                items: '=',
                theme: '@'
            },
            templateUrl: '/pages/directives/combobox/templates/eui-combotopics.html',
            link: function (scope, element, attrs, comboboxCtrl) {
                scope.comboboxCtrl = comboboxCtrl;

                var resetTopics = function () {
                    scope.items.forEach(function (x) {
                        x.isSelected = false;
                    });
                };

                scope.selectTopic = function (topic) {
                    resetTopics();
                    topic.isSelected = true;
                };

                resetTopics();
            }
        };
    };

    ng.module('editor.common.combobox')
        .directive('euiCombotopics', ['$timeout', '$document', ComboTopics ]);
})(angular);
