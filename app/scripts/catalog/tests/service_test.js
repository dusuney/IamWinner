'use strict';

describe('Catalog service', function () {
    var CatalogService, rootScope;


    beforeEach(function () {
        var model;
        module('editor.catalog');
        

        inject(function (_CatalogService_, $rootScope) {
            CatalogService = _CatalogService_;

            rootScope = $rootScope;
        });
    });

    describe('Filters', function () {
        it('Should prepared empty filters ', function () {

            CatalogService.filters = {
                TaskSetType: { id: null },
                Subject: { id: null },
                Difficulty: { id: null },
                Class: { id: null }
            };

            CatalogService.preparedFilters();

            expect(CatalogService.panel.filters).toEqual([]);
        });

        it('Should prepared 4 filters ', function () {

            CatalogService.filters = {
                TaskSetType: { id: 1 },
                Subject: { id: 2 },
                Difficulty: { id: 0 },
                Class: { id: 1 }
            };

            CatalogService.preparedFilters();

            expect(CatalogService.panel.filters).toEqual([
                "TaskSetType_1", "Class_1", "Difficulty_0", "Subject_2"
            ]);
        });
    });
    
});
