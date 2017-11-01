(function(ng) {
    ng.module('editor.common.floatInput', []);
})(angular);

(function (ng, $) {
    "use strict";

    var FloatInputDirective = function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9.]/g, '');

                        var countDot = 0;
                        var countSymbolAfterDot = 0;
                        var resultArrChars = [], arrChars = [];

                        resultArrChars = arrChars = transformedInput.split('');

                        if (arrChars[0] == '.') {
                            transformedInput = "0" + transformedInput;
                            resultArrChars = arrChars = transformedInput.split('');
                        }

                        arrChars.forEach(function (elem, i) {
                            if (elem == '.') countDot++;
                            if (countDot > 1 && elem == '.') resultArrChars.splice(i, 1);
                        });

                        transformedInput = resultArrChars.join('');

                        countSymbolAfterDot = transformedInput.length - transformedInput.indexOf('.') - 1;

                        if (countSymbolAfterDot > 2 && countDot > 0) {
                            transformedInput = transformedInput.slice(0, transformedInput.indexOf(".") + 3);
                        }

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }

                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    };

    ng.module('editor.common.floatInput')
        .directive('floatInput', ['$parse', FloatInputDirective]);
})(angular, jQuery);
