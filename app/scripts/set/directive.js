(function(ng, $) {
    'use strict';

    ng.module('editor.set')
        .directive('set', Set);
    Set.$inject = [];

    function Set() {
        return {
            restrict: "AE",
            scope: {
                
            },
            // bindToController: true,
            controllerAs: 'setCtrl',
            controller: 'SetCtrl',
            templateUrl: '/pages/index.html',
            link: function (scope, element, attrs, setCtrl) {
               
            }
        };
    }
})(angular, jQuery);
