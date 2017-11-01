(function (ng) {
    'use strict';

    ng.module('editor.set')
        .service('SetService', SetService);

    SetService.$inject = [
        "$rootScope",
        "$timeout",
        'panels'
    ];

    function SetService(
            $rootScope,
            $timeout,
            panels
        ) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;

        this.isLoaded = false;
        this.taskSet = {};
        this.isAdmin = null;
        this.studentWork = null;
        if (typeof model !== 'undefined') {
            this.taskSet = model.TaskSet;
            this.isAdmin = model.IsAdmin;
            this.studentWork = model.StudentWork;
        }
    }

    SetService.prototype = {
        onOpenEditWorksWindow: function () {
            if (this.isAdmin) {
                this.$rootScope.$emit('editStudentWorksWindow', this.taskSet);
            }
        },
        onMoveWizard: function () {
            window.location.href = window.location.origin + "/ru/wizard/" + this.studentWork.Id;
        },
        onMoveResultPage: function () {
            window.location.href = window.location.origin + "/ru/workresult/" + this.studentWork.Id;
        }
    }
})(angular);

