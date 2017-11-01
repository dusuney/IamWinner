(function (ng, $) {
    'use strict';

    ng.module('editor.common.loadImageToEditor')
        .directive('loadImageToEditor', LoadImageToEditor);
    LoadImageToEditor.$inject = ['$rootScope','$timeout'];

    function LoadImageToEditor($rootScope, $timeout) {
        return {
            restrict: "AE",
            scope: {
            },
            controllerAs: 'loadImageToEditorCtrl',
            controller: 'LoadImageToEditorCtrl',
            templateUrl: '/pages/directives/loadImageToEditor/index.html',
            link: function (scope, element, attrs, loadImageToEditorCtrl) {

                var closeWindow = function () {
                    $('#loadImageWindow').modal('hide');
                }

                $rootScope.$on('loadImageToEditor', function (event, callback) {
                    loadImageToEditorCtrl.init();
                    loadImageToEditorCtrl.callback = callback;
                    loadImageToEditorCtrl.close = closeWindow;

                    $timeout(function () {
                        loadImageToEditorCtrl.canShow = true;
                        $('#loadImageWindow').modal('show');
                    },0)
                   
                });

            }
        };
    }
})(angular, jQuery);
