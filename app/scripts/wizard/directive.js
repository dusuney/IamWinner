(function (ng, $, MathJax) {
    'use strict';

    ng.module('editor.wizard')
        .directive('wizard', Wizard);
    Wizard.$inject = ['$timeout'];

    function Wizard($timeout) {
        return {
            restrict: "AE",
            scope: {

            },
            // bindToController: true,
            controllerAs: 'wizardCtrl',
            controller: 'WizardCtrl',
            templateUrl: '/pages/index.html',
            link: function (scope, element, attrs, wizardCtrl) {

                scope.$watch(function () { return wizardCtrl.wizardService.canShowMath; }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        updateTaskBlock();
                    }
                });

                function updateTaskBlock() {
                    var QUEUE = MathJax.Hub.queue;
                    var math = null, box = null;
                    box = document.getElementById("taskBlock");

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
                            "HTML-CSS": {
                                styles: {
                                    ".MathJax_Display": {
                                        "text-align": "inherit",
                                        "display": "inline"
                                    }
                                }
                            },
                            extensions: ["tex2jax.js"],
                            jax: ["input/TeX", "output/HTML-CSS"],
                            tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']], processEscapes: true }
                        });
                        var math = document.getElementById("taskBlock");

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
