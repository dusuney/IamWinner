(function (ng) {
    'use strict';

    ng.module('editor.common.login')
        .controller('LoginFormCtrl', LoginFormCtrl);

    LoginFormCtrl.$inject = ['$scope', '$http'];

    function LoginFormCtrl($scope, $http) {
        var self = this;
        self.$http = $http;
        self.returnUrl = model.ReturnUrl;
        self.login = '';
        self.password = '';
        self.showError = false;
        self.errorText = '';
        self.inProgress = false;
        self.init();
    }

    LoginFormCtrl.prototype = {
        init: function () {
            var self = this;
            self.form = {};
        },
        onLogin: function () {
            var self = this;
            self.showError = false;

            if (self.inProgress) {
                return;
            }

            if (self.form.$invalid) {
                self.showError = true;
                self.inProgress = false;
                return;
            } else {
                self.inProgress = true;
            }

            var data = {
                login: self.login,
                password: self.password
            }
            this.$http.post(
                 '/signin',
                 data,
                 {
                     dataType: "json",
                     contentType: "application/json; charset=utf-8"
                 }
             ).then(function successCallback(response) {
                 var result = response.data;
                 if (result.success) {
                     self.Redirect();
                 } else {
                     self.showError = true;
                     self.inProgress = false;
                     self.errorText = result.errorText || 'Ошибка';
                 }

             }, function errorCallback(response) {
                 self.inProgress = false;
                 //ошибка при загрузке, вывести окно
             });
        },
        Redirect: function () {
            window.location.href = this.returnUrl;
        }

    };

})(angular);
