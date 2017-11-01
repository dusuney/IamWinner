(function (ng, $, MathJax) {
    'use strict';

    ng.module('editor.workResult')
        .directive('workResult', WorkResult);
    WorkResult.$inject = ['$timeout'];

    function WorkResult($timeout) {
        return {
            restrict: "AE",
            scope: {

            },
            // bindToController: true,
            controllerAs: 'workResultCtrl',
            controller: 'WorkResultCtrl',
            templateUrl: '/pages/index.html',
            link: function (scope, element, attrs, workResultCtrl) {
                scope.$watch(function () { return workResultCtrl.WorkResultService.StudentWork.Entires; }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        updateTaskBlock();
                    }
                }, true);
                updateTaskBlock();
                function updateTaskBlock() {
                    var QUEUE = MathJax.Hub.queue;
                    var math = null, box = null;
                    box = document.getElementById("results");

                    var HIDEBOX = function () {
                        if (box) {
                            box.style.visibility = "hidden"
                        }
                    };

                    var SHOWBOX = function () {
                        if (box) {
                            box.style.visibility = "visible"
                        }
                    };

                    $timeout(function () {
                        MathJax.Hub.Config({
                            extensions: ["tex2jax.js"],
                            jax: ["input/TeX", "output/HTML-CSS"],
                            tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']], processEscapes: true }
                        });
                        var math = document.getElementById("results");

                        QUEUE.Push(
                          HIDEBOX,
                          function () {
                              if (MathJax.InputJax.TeX.resetEquationNumbers) {
                                  MathJax.InputJax.TeX.resetEquationNumbers();
                              }
                          },
                          MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]),
                          SHOWBOX
                      );

                    }, 0);
                }
            }
        };
    }
})(angular, jQuery, MathJax);
