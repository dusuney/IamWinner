(function(ng, $) {
    'use strict';

    ng.module('editor.catalog')
        .directive('catalog', Catalog);
    Catalog.$inject = [];

    function Catalog() {
        return {
            restrict: "AE",
            scope: {
                
            },
            // bindToController: true,
            controllerAs: 'catalogCtrl',
            controller: 'CatalogCtrl',
            templateUrl: '/pages/index.html',
            link: function (scope, element, attrs, catalogCtrl) {
               
            }
        };
    }
})(angular, jQuery);
