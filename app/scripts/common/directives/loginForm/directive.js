(function (ng, $) {
    'use strict';

    ng.module('editor.common.login')
        .directive('loginForm', LoginForm);
    LoginForm.$inject = ['$rootScope', '$timeout'];

    function LoginForm($rootScope, $timeout) {
        return {
            restrict: "AE",
            scope: {
            },
            controllerAs: 'loginFormCtrl',
            controller: 'LoginFormCtrl',
            templateUrl: '/pages/directives/loginForm/index.html',
            link: function (scope, element, attrs, loadImageToEditorCtrl) {

            }
        };
    }
})(angular, jQuery);
