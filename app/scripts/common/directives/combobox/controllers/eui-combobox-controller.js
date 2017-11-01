(function (ng, $) {
    'use strict';

    var ComboboxController = function ($scope, $timeout) {
        var ctrl = this;
        ctrl.theme = $scope.theme;
        ctrl.displayProperty = $scope.displayProperty;

        ctrl.toggleExpand = function ($event) {
            if ($scope.isDisabled) {
                ctrl.isExpanded = false;
                return;
            }
            ctrl.isExpanded = !ctrl.isExpanded;
            if (ctrl.isExpanded) {
                ctrl.onOpen();
            }
        };

        ctrl.onOpen = function () {
            ctrl.filterValue = '';
            ctrl.filterResults = [];
            ctrl.pager = null;
        };

        ctrl.selectItem = function(item) {
            $scope.ngModel.$setViewValue(item);
            ctrl.collapsePanel();
            if ($scope.onSelect) {
                $timeout(function () {
                    $scope.onSelect();
                }, 0);
            }
            
        };
        
        

    };

    ng.module('editor.common.combobox')
        .controller('euiComboboxController', [ '$scope', '$timeout', ComboboxController ]);
})(angular, jQuery);
