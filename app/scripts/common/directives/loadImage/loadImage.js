(function (ng, $) {
    'use strict';

    ng.module('editor.common.loadImage')
        .directive('loadimage', LoadImageDirective);

    LoadImageDirective.$inject = ['$timeout'];

    function LoadImageDirective($timeout) {

        return {
            restrict: "AE",
            scope: {
                image: "=",
                file: "="
            },
            templateUrl: '/pages/directives/loadImage/index.html',
            link: function (scope, element, attributes) {
                scope.showImg = false;

                element.on("change", function (event) {
                    var uploadingFiles = event.target.files ? event.target.files : event.dataTransfer ? event.dataTransfer.files : event.originalEvent.dataTransfer.files;
                    scope.file = uploadingFiles.length > 0 ? uploadingFiles[0] : null;
                    readURL(event.target);
                })

                function readURL(input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            $timeout(function () {
                                scope.image.url = e.target.result;
                            }, 0);
                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                }

            }
        }
    }

})(angular, jQuery);
