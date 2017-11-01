(function (ng) {
    'use strict';
    ng.module('editor.common.services', []);

    ng.module('editor.common.services')
        .service('FieldValidationService', FieldValidationService);

    FieldValidationService.$inject = [];

    function FieldValidationService() {
    }

    FieldValidationService.prototype = {
        isInvalidRequiredField: function (form, field) {
            return this.isInvalidFieldProperty(form, field, 'required');
        },
        isInvalidMinDateField: function (form, field) {
            return this.isInvalidFieldProperty(form, field, 'minDate');
        },
        isInvalidDateField: function (form, field) {
            return this.isInvalidFieldProperty(form, field, 'date');
        },
        isInvalidFieldProperty: function (form, field, property) {
            return this.isInvalidField(form, field) && form[field].$error[property];
        },
        isInvalidField: function (form, field) {
            if (!form[field]) return false;
            return (form.$submitted || form[field].$dirty) && form[field].$invalid;
        },
        isInvalidTaLengthField: function (form, field) {
            return this.isInvalidFieldProperty(form, field, 'taMaxText');
        },
        isInvalidRequiredRadio: function (form, field, option) {
             
            form[field].$asyncValidators[field] = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                $timeout(function () {
                    // Mock a delayed response
                    if (usernames.indexOf(modelValue) === -1) {
                        // The username is available
                        def.resolve();
                    } else {
                        def.reject();
                    }

                }, 2000);

                return def.promise;
            };
                       
        }

    }
})(angular);
