(function (ng) {
    'use strict';
    var PanelsService = function (tableService, taskResource, taskSetResource, studentWorkResource) {

        var basePanel = {
            view: {
                allSelected: false,
                columns: [],
                table: null,
                sorting: null

            },
            keyword: '',
            isLoaded: false,
            filters: [],
            onDoSearch: function () {
                if (!this.keyword) {
                    return;
                }
                this.loadPage(1);
            },
            onResetSearch: function () {
                this.keyword = null;
                this.loadPage(1);
            },
            pageSize: '10',
            onChangePageSize: function () {
                this.loadPage(1);
            },
            selectedRecords: [],
            onOpen: function () {
                if (this.view.table.records.length === 0) {
                    this.loadPage(1);
                }
            },
            resetFilters: function () {
                this.filters = [];
                this.loadPage(1);
            },
            resetSort: function () {
                this.view.columns.forEach(function (x) {
                    x.sortOrder = '';
                });
            },
            onSortColumn: function (column, $event) {
                var sortOrder = column.sortOrder || 'desc';

                if (!$event.ctrlKey) {
                    this.resetSort();
                }

                column.sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                this.view.sorting = column.columnName + "_" + column.sortOrder;
                this.reload();
            },
            onColumnFiltered: function () {
                this.selectedRecords = [];
                // this.view.loader.updateFilters(this.view.columns);
                this.loadPage(1);
            },
            setPage: function (page) {
                if (page < 1 || page > this.getPager().totalPages || this.getPager().currentPage === page) return;
                this.onPageChanged(page);
            },
            onPageChanged: function (page) {
                this.loadPage(page);
            },
            reload: function () {
                return this.loadPage(this.getPager().currentPage);
            },
            getPager: function () {
                return this.view.table.pager;
            },
            default_pages_count: 5,
            getPages: function () {
                var currentPage = this.getPager().currentPage || 1;
                var totalPages = this.getPager().totalPages || 1;

                var lowerBound = 1;
                var pagerLength = this.default_pages_count;
                if (currentPage < Math.ceil(this.default_pages_count / 2) || totalPages < this.default_pages_count) {
                    pagerLength = Math.min(this.default_pages_count, totalPages);
                } else if (currentPage > totalPages - Math.floor(this.default_pages_count / 2)) {
                    lowerBound = totalPages - this.default_pages_count + 1;
                } else {
                    lowerBound = currentPage - Math.floor(this.default_pages_count / 2);
                }
                return Array.apply(null, new Array(pagerLength)).map(function () {
                    return lowerBound++;
                });
            },
            getTotalItems: function () {
                return this.view.table.totalItems;
            },
            loadPage: function (page) {
                //return this.view.loader.loadPage(page).then(this.setRecords.bind(this));
            },
            setSelectedRecords: function (records) {
                var self = this;
                if (records) {
                    var selectedRecords = [];
                    if (records instanceof Array) {
                        selectedRecords = records;
                    }
                    selectedRecords.forEach(function (item) {
                        item.selected = true;
                    });
                    self.selectedRecords = selectedRecords;
                    self.view.allSelected = selectedRecords.length == 0 ? false : self.view.allSelected;
                }
                return records;
            },
            setRecords: function (result) {
                var self = this;
                self.view.table.records = result.data.items || [];

                self.view.table.pager = {
                    currentPage: result.data.currentPage,
                    totalPages: result.data.totalPages
                };
                self.view.table.totalItems = result.data.totalItems;
                this.isLoaded = true;
                return self.view.table.records;
            },
            onRowsSelected: function (pageRows) {
                var self = this;

                pageRows.forEach(function (x) {
                    if (x.entryType) {
                        existing = self._getRowByIdAndDrugEntryType(self.selectedRecords, x.id, x.entryType);
                        if (existing === null) self.selectedRecords.push(x);
                    } else {
                        var existing = self._getRowById(self.selectedRecords, x.id);
                        if (existing === null) self.selectedRecords.push(x);
                    }
                });

                self.selectedRecords = self.selectedRecords.filter(function (x) {
                    if (x.entryType) {
                        var otherPageRow = self._getRowByIdAndDrugEntryType(self.view.table.records, x.id, x.entryType);
                        if (otherPageRow === null) return true;
                        return otherPageRow.selected;
                    } else {
                        var otherPageRow = self._getRowById(self.view.table.records, x.id);
                        if (otherPageRow === null) return true;
                        return otherPageRow.selected;
                    }
                });
                return this.selectedRecords;
            },
            _getRowByIdAndDrugEntryType: function (rows, rowId, rowDrugEntryType) {
                var rowsLength = rows.length;
                for (var i = 0; i < rowsLength; i++) {
                    if (rows[i].id === rowId && rows[i].entryType == rowDrugEntryType) {
                        return rows[i];
                    }
                }
                return null;
            },
            _getRowById: function (rows, rowId) {
                var rowsLength = rows.length;
                for (var i = 0; i < rowsLength; i++) {
                    if (rows[i].id === rowId) {
                        return rows[i];
                    }
                }
                return null;
            },
            setSelectedRows: function (rows) {
                var self = this;
                self.view.table.selectedRows = rows;
            }
        };
        return {
            TaskListPanel: function () {
                var self = this;
                ng.extend(self, ng.copy(basePanel));

                var defaultTable = new tableService.TaskListTable();

                self.loadPage = function (page) {
                    this.isLoaded = false;

                    return taskResource.search({
                        pageNumber: page,
                        sorting: this.view.sorting,
                        pageSize: this.pageSize,
                        keyword: this.keyword
                    }).$promise.then(this.setRecords.bind(this));
                }

                self.view = {
                    columns: defaultTable.columns,
                    table: defaultTable,
                    sorting: "DateModified_desc"
                }
            },
            TaskSetListPanel: function () {
                var self = this;
                ng.extend(self, ng.copy(basePanel));

                var defaultTable = new tableService.TaskSetListTable();

                self.loadPage = function (page) {
                    this.isLoaded = false;

                    return taskSetResource.search({
                        pageNumber: page,
                        sorting: this.view.sorting,
                        pageSize: this.pageSize,
                        keyword: this.keyword
                    }).$promise.then(this.setRecords.bind(this));
                }

                self.view = {
                    columns: defaultTable.columns,
                    table: defaultTable,
                    sorting: "DateModified_desc"
                }
            },
            CatalogPanel: function () {
                var self = this;
                ng.extend(self, ng.copy(basePanel));

                var defaultTable = new tableService.TaskSetListTable();

                self.onlyUsersWorks = false;
                self.pageSize = 9;
                self.loadPage = function (page) {
                    this.isLoaded = false;

                    return taskSetResource.catalog({
                        pageNumber: page,
                        sorting: this.view.sorting,
                        pageSize: this.pageSize,
                        keyword: this.keyword,
                        filters: this.filters,
                        onlyUsersWorks: this.onlyUsersWorks
                    }).$promise.then(this.setRecords.bind(this));
                }

                self.view = {
                    columns: defaultTable.columns,
                    table: defaultTable,
                    sorting: "DateModified_desc"
                }
            },
            WorkListPanel: function (isAdmin) {
                var self = this;
                ng.extend(self, ng.copy(basePanel));
                this.isAdmin = isAdmin;
                var defaultTable = new tableService.WorkListTable(this.isAdmin);

                self.loadPage = function (page) {
                    this.isLoaded = false;
 
                    return studentWorkResource.list({
                        pageNumber: page,
                        sorting: this.view.sorting,
                        pageSize: this.pageSize,
                        keyword: this.keyword,
                        filters: this.filters,
                        isAdmin: this.isAdmin
                    }).$promise.then(this.setRecords.bind(this));
                }

                self.view = {
                    columns: defaultTable.columns,
                    table: defaultTable,
                    sorting: "DateModified_desc"
                }
            }
        };
    };
    ng.module('editor.common.services')
        .factory('panels',
        ['TableService', 'TaskResource', 'TaskSetResource', 'StudentWorkResource',
            PanelsService]);
})(angular);
