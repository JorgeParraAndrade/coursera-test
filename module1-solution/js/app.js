/**
 * Created by Jorge on 24/9/2016.
 */

(function () {
    'use strict';

    angular.module('LunchCheck',[])

        .controller('LunchCheckController', LunchCheckController);
        LunchCheckController.$inject = ['$scope'];

        function LunchCheckController($scope){
            $scope.msg = "";
            $scope.data = "";
            $scope.foodTokens = "";
            $scope.color = "inherit";
            $scope.checkIfTooMuch = function () {

                $scope.foodTokens = $scope.data.split(",").map(function(str){return str.trim()}).filter(function(e){return e!="";}).length;

                if($scope.foodTokens == 0){
                    $scope.msg = "Please enter data first";
                    $scope.color = "red";
                }
                else if($scope.foodTokens <= 3){
                    $scope.msg = "Enjoy!";
                    $scope.color = "green";
                } else {
                    $scope.msg = "Too Much";
                    $scope.color = "green";
                }
            }
        }
})();