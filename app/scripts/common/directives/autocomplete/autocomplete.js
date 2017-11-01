(function (ng) {
    'use strict';
    function genericAutocomplete(service, globalFilter, sortOrder, mapItemsFn, autoSetConfig) {
        return {
            restrict: 'AE',
            template:
                '<div eui-combobox ' +
                    'class="eui-combobox" ' +
                    'name="{{name}}" ' +
                    'on-open="onOpen()"' +
                    'on-select="onSelect()"' +
                    'ng-model="ngModel" ' +
                    'on-click-apply="onClickApply()"' +
                    'on-close-window="onCloseWindow()"' +
                    'is-filter="isFilter"' +
                    'theme="{{theme}}" ' +
                    'display-property="\'displayText\'" ' +
                    'optional="optional"' +
                    'placeholder= "placeholder" ' +
                    'required ="required"> ' +
                    '<eui-combofilter on-filter="onFilter(filterValue)"></eui-combofilter> ' +
                    '<div class="eui-combobox-result-item eui-s-disabled" ng-show="isLoading">{{message}}</div> ' +
                    '<eui-comboitems items="items" columns="autoSetConfig.columns" ng-show="!isLoading"></eui-comboitems> ' +
                    '<eui-combopager pager="pager" search-items-page = "onOpen(page)"></eui-combopager>' +
                '</div>',
            scope: {
                name: '@',
                theme: '@',
                ngModel: '=',
                optional: '=',
                onClickApply: '&',
                onCloseWindow: '&',
                isFilter: '=',
                required: '=',
                placeholder: '=',
                autoSetField: '='
            },
            link: function (scope, element, attributes) {
                scope.isLoading = false;
                //scope.isFilter = true;
                scope.message = '';
                scope.items = [];
                scope.pager = {
                    currentPage: 1,
                    totalPages: 1
                };
                scope.service = service;
                scope.autoSetConfig = autoSetConfig;
                                
                scope.filter = {};

                scope.onFilter = function (filterValue) {
                    scope.beginRequest();
                    //scope.filter = ng.extend(ng.copy(globalFilter), { filterTerm: filterValue });
                    var keyword = filterValue;
                    var pageSize = 10;
                    var page = 1;
                    var pageSize = 10;

                    service.search({
                        pageNumber: page,
                        sorting: null,
                        pageSize: pageSize,
                        keyword: keyword
                    }).$promise.then(function (result) {
                        scope.onSuccess();
                        scope.items = result.data.items.map(mapItemsFn);
                        scope.pager = {
                            currentPage: result.data.currentPage,
                            totalPages: result.data.totalPages,
                        };
                    }, function (error) {
                        scope.onError();
                    });
                };

                scope.onOpen = function (page) {
                    var height = $('.eui-combobox-results-row').height();
                    $('.eui-combobox-result-item').css('height', 240);

                    scope.filterOpen = ng.extend(ng.copy(globalFilter), scope.filter);

                    scope.isLoading = true;
                    scope.message = 'Загрузка...';
                    if (!page) page = 1;
                    var keyword = '';
                    var pageSize = 10;
                    //this.view.sorting,

                    service.search({
                        pageNumber: page,
                        sorting: null,
                        pageSize: pageSize,
                        keyword: keyword
                    }).$promise.then(function (result) {
                        scope.onSuccess();
                        scope.items = result.data.items.map(mapItemsFn);
                        scope.pager = {
                            currentPage: result.data.currentPage,
                            totalPages: result.data.totalPages
                        };
                    }, function (error) {
                        scope.onError();
                    });
                };

                scope.beginRequest = function () {
                    scope.isLoading = true;
                    scope.message = 'Загрузка...';
                };

                scope.onSuccess = function () {
                    scope.isLoading = false;
                };

                scope.onError = function () {
                    scope.message = 'Не удалось загрузить список записей';
                };
            }
        };
    }


    ng.module('editor.common.autocomplete')
        .directive('taskAutocomplete', TaskAutocomplete);
    TaskAutocomplete.$inject = ['TaskResource'];

    function TaskAutocomplete(TaskResource) {
        return genericAutocomplete(TaskResource,
            {},
            [{ field: 'fullName', ordering: 'asc' }],
            function (item) {
                return {
                    value: item.Id,
                    displayText: item.Title,
                    TaskId: item.Id,
                    Title: item.Title,
                    AnswerType: item.AnswerType,
                    Mark: item.Mark,
                    TaskType: item.TaskType,
                    DateModified: item.DateModified,
                    HintCount: item.HintCount
                };
            },
            {
                columns: [
                    {
                        title: "Заголовок",
                        columnName: "Title"
                    },
                    {
                        title: "Балл",
                        columnName: "Mark"
                    },
                    {
                        title: "Тип",
                        columnName: "TaskType"
                    },
                    {
                        title: "Ответы",
                        columnName: "AnswerType"
                    }
                ]
            }
         );
    }

    ng.module('editor.common.autocomplete')
        .directive('userAutocomplete', UserAutocomplete);
    UserAutocomplete.$inject = ['UserResource'];

    function UserAutocomplete(UserResource) {
        return genericAutocomplete(UserResource,
            {},
            [{ field: 'fullName', ordering: 'asc' }],
            function (user) {
                return {
                    UserId: user.Id,
                    Fio: user.Fio,
                    value: user.Id,
                    displayText: user.Fio
                };
            },
            {
                columns: [
                {
                    title: "Id ученика",
                    columnName: "UserId",
                    width: 100
                },
                    {
                        title: "ФИО ученика",
                        columnName: "Fio"
                    }
                ]
            }
         );
    }

})(angular);
