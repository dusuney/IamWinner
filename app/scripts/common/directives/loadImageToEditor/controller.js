(function (ng) {
    'use strict';

    ng.module('editor.common.loadImageToEditor')
        .controller('LoadImageToEditorCtrl', LoadImageToEditorCtrl);

    LoadImageToEditorCtrl.$inject = ['$scope', '$location', '$rootScope', '$http'];

    function LoadImageToEditorCtrl($scope, $location, $rootScope, $http) {
        var self = this;
        this.$http = $http;
        this.callback;
    }

    LoadImageToEditorCtrl.prototype = {
        init: function () {
            this.image = { url: null };
            this.file = null;
            this.canSelect = true;
            this.formData = new FormData();
            this.defaultWidth = 450;
            this.defaultHeight = 300;
            this.canShow = false;
        },
        reset: function () {
            this.image = { url: null };
            this.canSelect = false;
            this.file = null;
            this.formData = new FormData();
        },
        onUpload: function () {
            var self = this;
            this.formData = new FormData();

            if (this.file) {
                this.formData.append("file", this.file);
            }

            this.$http.post(
                '/api/files/image-upload',
                this.formData,
                {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }
            ).then(function successCallback(response) {
                var result = response.data;
                if (result.success) {
                    var image = result.image;
                    if (self.close) {
                        self.close();
                    }
                    self.callback(image); // set image url    
                }

            }, function errorCallback(response) {
                //ошибка при загрузке, вывести окно
            });
        }

    };

})(angular);
