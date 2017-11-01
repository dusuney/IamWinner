(function (ng) {
    'use strict';

    ng.module('editor.common.services')
        .service('HandlerService', HandlerService);

    HandlerService.$inject = ['$http'];

    function HandlerService($http) {
        this.$http = $http;
    }

    HandlerService.prototype = {
        onPaste: function (html) {
            return html.replace(/<img[^>]*>/g, "");
        },
        getDragFileHandler: function () {
            var self = this;
            return function (file, callback) {

                //If image, upload to server and insert img tag with Url
                if (file && file.type.substring(0, 5) === "image") {


                    var formData = new FormData();
                    formData.append("file", file);

                    var reader = new FileReader();
                    reader.onload = function () {
                        self.$http.post(
                            '/api/files/image-upload',
                            formData,
                            {
                                transformRequest: angular.identity,
                                headers: { 'Content-Type': undefined }
                            }
                        ).then(function successCallback(response) {
                            var result = response.data;
                            if (result.success) {
                                var image = result.image;
                                callback("insertImage", image.Url, true);
                            }
                        }, function errorCallback(response) {
                            return false;
                        });

                    };

                    reader.readAsDataURL(file);
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
})(angular);
