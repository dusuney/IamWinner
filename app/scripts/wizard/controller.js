(function (ng) {
    'use strict';

    ng.module('editor.wizard')
        .controller('WizardCtrl', WizardCtrl);

    WizardCtrl.$inject = ['$scope', '$rootScope', '$location', 'WizardService', 'FieldValidationService'];

    function WizardCtrl($scope, $rootScope, $location, WizardService, FieldValidationService) {
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.wizardService = WizardService;

        this.FieldValidation = FieldValidationService;
    }

    WizardCtrl.prototype = {

    }

})(angular);
