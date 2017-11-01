(function (ng, $, MathJax) {
    'use strict';

    ng.module('editor.components.windowPreview')
        .directive('windowPreview', WindowPreview);
    WindowPreview.$inject = ['$rootScope', '$timeout'];

    function WindowPreview($rootScope, $timeout) {
        return {
            restrict: "AE",
            scope: {
                taskSet: '=',
                isPreview: '='
            },
            // bindToController: true,
            controllerAs: 'windowPreviewCtrl',
            controller: 'WindowPreviewCtrl',
            templateUrl: '/pages/windowPreview/index.html',
            link: function (scope, element, attrs, windowPreviewCtrl) {
                 
                scope.$watch(function () { return scope.isPreview; }, function (newValue, oldValue) {
                    if (newValue !== oldValue && scope.isPreview === true) {
                        updatePreview();
                    }
                });

                function updatePreview() {
                    var QUEUE = MathJax.Hub.queue; 
                    var math = null, box = null; 
                    box = document.getElementById("preview");
                    var HIDEBOX = function () { box.style.visibility = "hidden" };
                    var SHOWBOX = function () { box.style.visibility = "visible" };

                    $timeout(function () {
                        MathJax.Hub.Config({
                            extensions: ["tex2jax.js"],
                            jax: ["input/TeX", "output/HTML-CSS"],
                            tex2jax: { inlineMath: [['$$', '$$'], ['\\(', '\\)']] }
                        });
                        var math = document.getElementById("preview");

                        QUEUE.Push(
                          HIDEBOX,
                          ["resetEquationNumbers", MathJax.InputJax.TeX],
                          MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]),
                          SHOWBOX
                      );

                    }, 0);
                }

                scope.closePreviewWindow = function () {
                    scope.isPreview = false;
                }
            }
        };
    }
})(angular, jQuery, MathJax);
