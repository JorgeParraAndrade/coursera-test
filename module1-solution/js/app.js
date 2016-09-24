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
            $scope.checkIfTooMuch = function () {

                $scope.foodTokens = $scope.data.split(",").filter(function(e){
                    return e!=""; //empty spaces will not count
                }).length;

                $scope.msg = ( $scope.foodTokens == 0 ) ? "Please enter data first" :
                    ( $scope.foodTokens <= 3 ) ? "Enjoy!" : "Too Much" ;



            }
        }




})();