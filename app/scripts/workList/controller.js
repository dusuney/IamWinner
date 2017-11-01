(function (ng) {
    'use strict';

    ng.module('editor.workList')
        .controller('WorkListCtrl', WorkListCtrl);

    WorkListCtrl.$inject = ['$scope', '$rootScope', 'panels', 'workStatuses'];

    function WorkListCtrl($scope, $rootScope, panels, workStatuses) {
        this.$rootScope = $rootScope;
        this.workStatuses = workStatuses;
        this.endStatus = this.workStatuses[3].id;
        this.isAdmin = userInfo.IsAdmin || false;
        this.panel = new panels.WorkListPanel(this.isAdmin);
        this.panel.loadPage(1);
        this.status = null;
    }

    WorkListCtrl.prototype = {
        onClickRow: function (row) {
            var self = this;
            if (row && row.HaveResult) {

                var targetUrl = '/ru/';
                if (self.isAdmin) {
                    targetUrl += 'workresult/' + row.Id;
                } else {
                    targetUrl += row.Status == self.endStatus ? 'workresult/' + row.Id : 'wizard/' + row.Id;
                }
                window.location.href = window.location.origin + targetUrl;
            } else {
                return;
            }
        },
        onChangeStatus: function () {
            var filters = [];
            if (this.status != null) {
                filters.push('Status_' + this.status);
            }
            this.panel.filters = filters;
            this.panel.loadPage(1);
        }
    }

})(angular);
