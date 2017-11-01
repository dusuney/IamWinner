(function (ng) {
    'use strict';

    ng.module('editor.catalog')
        .service('CatalogService', CatalogService);

    CatalogService.$inject = [
        "$rootScope",
        "$timeout",
        "panels"
    ];

    function CatalogService(
            $rootScope,
            $timeout,
            panels
        ) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;

        this.panel = new panels.CatalogPanel();

        var self = this;
        this.panel.loadPage(1).then(function () {
            self.isLoading = false;
        });

        if (typeof userInfo !== 'undefined') {
            var currentUserInfo = userInfo || null;
        }

        self.isLoggedUser = currentUserInfo ? currentUserInfo.Logged : false;
        this.initFilters();
    }

    CatalogService.prototype = {
        filters: {},
        initFilters: function () {
            this.filters = {
                TaskSetType: { id: null },
                Subject: { id: null },
                Difficulty: { id: null },
                Class: { id: null },
                ShowUsersWork: false
            };
            this.panel.onlyUsersWorks = false;
            this.panel.keyword = '';
            this.panel.filters = [];
        },
        isLoading: true,
        onPreviousPage: function () {
            this.panel.setPage(this.panel.view.table.pager.currentPage - 1);
        },
        onNextPage: function () {
            this.panel.setPage(this.panel.view.table.pager.currentPage + 1);
        },
        canOnPreviousPage: function () {
            return this.panel.view.table.pager.currentPage === 1;
        },
        canOnNextPage: function () {
            return this.panel.view.table.pager.currentPage === this.panel.view.table.pager.totalPages;
        },
        preparedFilters: function () {
            this.panel.filters = [];

            if (this.filters.TaskSetType.id !== null) {
                this.panel.filters.push("TaskSetType_" + this.filters.TaskSetType.id);
            }

            if (this.filters.Class.id !== null) {
                this.panel.filters.push("Class_" + this.filters.Class.id);
            }

            if (this.filters.Difficulty.id !== null) {
                this.panel.filters.push("Difficulty_" + this.filters.Difficulty.id);
            }

            if (this.filters.Subject.id !== null) {
                this.panel.filters.push("Subject_" + this.filters.Subject.id);
            }
            if (this.isLoggedUser) {
                this.panel.onlyUsersWorks = this.filters.ShowUsersWork;
            }

        },
        onStart: function(record) {
            window.location.href = window.location.origin + "/ru/set/" + record.Id;
        },
        onApplyFilters: function () {
            this.preparedFilters();
            this.panel.loadPage(1);
        },
        onResetFilters: function () {
            this.initFilters();
            this.panel.loadPage(1);
        },
        moveToCatalog: function () {
            //TODO: need make redirect from the server side
            window.location.href = window.location.origin + "/ru/catalog";
        }
    }
})(angular);

