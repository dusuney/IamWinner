(function (ng) {
    'use strict';

    var TablesService = function () {

        var tableBase = {
            columns: [],
            pager: {
                currentPage: 1,
                totalPages: 1
            },
            totalItems: 0,
            records: [],
            selectedRows: []
        };
        return {
            TaskListTable: function (position) {
                var self = this;
                ng.extend(self, ng.copy(tableBase));


                self.columns = [
                    {
                        title: 'Id',
                        columnName: 'Id',
                        width: 50
                    },
                    {
                        title: 'Заголовок',
                        columnName: 'Title',
                        maxWidth:335
                    },
                    {
                        title: 'Тип задания',
                        columnName: 'TaskType',
                        width: 70
                    },
                    {
                        title: 'Тип ответа',
                        columnName: 'AnswerType',
                        width: 70
                    },
                    {
                        title: 'Оценка',
                        columnName: 'Mark',
                        width: 50
                    },
                    {
                        title: 'Последнее изменение',
                        columnName: 'DateModified',
                        width: 85
                    },
                    {
                        title: 'Подсказки',
                        columnName: 'HintCount',
                        width: 50
                    }   
                ];
                self.columns[5].sortOrder = "desc";
            },
            TaskSetListTable: function (position) {
                var self = this;
                ng.extend(self, ng.copy(tableBase));


                self.columns = [
                    {
                        title: 'Id',
                        columnName: 'Id',
                        width: 50
                    },
                    {
                        title: 'Заголовок',
                        columnName: 'Title',
                        width: 610
                    },
                    {
                        title: 'Тип',
                        columnName: 'TaskSetType',
                        width: 40
                    },
                    {
                        title: 'Предмет',
                        columnName: 'Subject',
                        width: 50
                    },
                    {
                        title: 'Уровень',
                        columnName: 'Difficulty',
                        width: 80
                    },
                    {
                        title: 'Класс',
                        columnName: 'Class',
                        width: 30
                    },
                    {
                        title: 'Кол-во баллов',
                        columnName: 'Mark',
                        width: 65
                    },
                    {
                        title: 'Кол-во заданий',
                        columnName: 'StepCount',
                        width: 65
                    },
                    {
                        title: 'Последнее изменение',
                        columnName: 'DateModifiedString',
                        width: 85
                    }
                ];
                self.columns[self.columns.length - 1].sortOrder = "desc";
            },
            WorkListTable: function (isAdmin) {
                var self = this;
                ng.extend(self, ng.copy(tableBase));


                var columns = [
                    {
                        title: 'Id',
                        columnName: 'Id',
                        width: 50
                    },
                    {
                        title: 'Заголовок',
                        columnName: 'Title',
                        width: 455
                    },
                    {
                        title: 'Пользователь',
                        columnName: 'Fio',
                        width: 240
                    },

                    {
                        title: 'Прогресс',
                        columnName: 'Progress',
                        width: 200
                    },
                    {
                        title: 'Оценка',
                        columnName: 'Mark',
                        width: 35
                    },
                    {
                        title: 'Баллы',
                        columnName: 'TotalMark',
                        width: 35
                    },
                    {
                        title: 'Статус',
                        columnName: 'Status',
                        width: 60
                    },
                    {
                        title: 'Последнее изменение',
                        columnName: 'DateModified',
                        width: 85
                    }
                ];
                var studentColumns = [columns[1], columns[3], columns[4], columns[5], columns[6], columns[7]];
                self.columns = isAdmin ? columns : studentColumns;
                self.columns[self.columns.length - 1].sortOrder = "desc";
            }
        };
    };

    ng.module('editor.common.services')
        .service('TableService', TablesService);
})(angular);
