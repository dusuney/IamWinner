(function(ng) {
    ng.module('editor.common.integerInput', []);
})(angular);

(function (ng, $) {
    "use strict";

    var IntegerInputDirective = function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return '';
                }

                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    };

    ng.module('editor.common.integerInput')
        .directive('integerInput', ['$parse', IntegerInputDirective]);
})(angular, jQuery);
