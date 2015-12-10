"use strict";
angular.module('stpCommon.header', ['ui.router']).controller('HeaderCtrl', ['$scope', '$state', function($scope, $state, showCustomerInfo){
    $scope.showCustomerInfo = showCustomerInfo;
}]);