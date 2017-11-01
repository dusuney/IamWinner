(function (ng) {
    'use strict';

    ng.module('editor.common.textAngularTools')
        .controller('InsertTableModalInstanceController', InsertTableModalInstanceController);

    InsertTableModalInstanceController.$inject = ['$scope', '$location', '$rootScope', '$http', '$uibModalInstance'];

    function InsertTableModalInstanceController($scope, $location, $rootScope, $http, $uibModalInstance) {
        // Gets converted by createTable
        console.log("init controller");
        $scope.newtable = {};

        $scope.newtable.row = '';
        $scope.newtable.col = '';

        function createTable(tableParams) {
            if (angular.isNumber(tableParams.row) && angular.isNumber(tableParams.col)
                && tableParams.row > 0 && tableParams.col > 0) {
                var table = "<p><br/></p><p><br/></p><div class='TableBorder'><table class='table table-hover table-bordered freeTextTable'>";
                var colWidth = 100 / tableParams.col;
                for (var idxRow = 0; idxRow < tableParams.row; idxRow++) {
                    var row = "<tr>";
                    for (var idxCol = 0; idxCol < tableParams.col; idxCol++) {
                        row += "<td"
                            + (idxRow == 0 ? ' style="width: ' + colWidth + '%;"' : '')
                            + ">&nbsp;</td>";
                    }
                    table += row + "</tr>";
                }
                return table + "</table></div><p><br/></p><p><br/></p>";
            }
        }

        $scope.close = function () {
            $uibModalInstance.dismiss()
        }

        $scope.insertTable = function () {
            $uibModalInstance.close(createTable($scope.newtable));
        }

        $scope.canAddTable = function() {
            return !(!$scope.newtable.row ||
                !$scope.newtable.col ||
                $scope.newtable.row < 1 ||
                $scope.newtable.col < 1);
        }
    }

    InsertTableModalInstanceController.prototype = {


    };

})(angular);
