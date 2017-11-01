(function (ng) {
    "use strict";

    var HttpInterceptorFactory = function ($q, $rootScope, $location) {
        return {
            response: function (response) {
                var data = response.data;
              
                if (!data.success && data.type == "error") {
                    $rootScope.$emit("showWindow", "Ошибка создания", data.message ? [data.message] : []);
                    return $q.reject(response);
                }
                return response;

            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $rootScope.$emit("showErrorWindow", "Ошибка авторизации", ["Ваша сессия истекла. Пожалуйста, обновите страницу."]);
                    return;
                }

                var data = rejection.data;
                if (data === null) {
                    return $q.reject(rejection);
                }
                if (data.type === "validation") {
                    $rootScope.$emit("showErrorWindow", data.message || "Ошибка", data.payload);
                } else if (data.message) {
                    $rootScope.$emit("showErrorWindow", "Ошибка", [data.message]);
                } else {
                    $rootScope.$emit("showErrorWindow", "Ошибка", ["Извините, во время обработки запроса произошла ошибка"]);
                }
                return $q.reject(rejection);
            }
        }
    };

    var module = angular.module('editor.common.services');

    module.factory('httpErrorInterceptor', ['$q', '$rootScope', '$location', HttpInterceptorFactory]);

    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.interceptors.push('httpErrorInterceptor');
    }]);
})(angular);

