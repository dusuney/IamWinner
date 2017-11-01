(function(ng, $) {
    'use strict';

    ng.module('editor.common.combobox').directive('euiComboMultiSelect', Combobox);

    Combobox.$inject = ['$timeout', '$window', '$document'];

    function Combobox($timeout, $window, $document) {
        return {
            restrict: 'AE',
            scope: {
                options: '='
            },
            transclude: true,
            templateUrl: '/pages/directives/combobox/templates/eui-combomultiselect.html',
            controllerAs: 'ctrl',
            require:'^columnFilterTooltip',
            link: function (scope, element, attrs, ctrl) {
                scope.ctrl = ctrl;
            }
        };
    }
})(angular, jQuery);
