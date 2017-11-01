(function (ng, $) {
    'use strict';

    ng.module('editor.common.window')
        .directive('window', Window);
    Window.$inject = ['$rootScope'];

    function Window($rootScope) {
        return {
            restrict: "AE",
            scope: {
            },
            templateUrl: '/pages/directives/window/index.html',
            link: function (scope, element, attrs, ctrl) {

                $rootScope.$on('showWindow', function (event, title, message) {
                    scope.title = title || 'Error';
                    scope.message = message;
                    $('#window').modal('show');
                });
            }
        };
    }
})(angular, jQuery);
