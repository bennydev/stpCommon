"use strict";
angular.module('stpCommon.header').controller('HeaderCtrl', ['$scope', '$state', function($scope, $state, HeaderService){
    $scope.HeaderService = HeaderService;
}]);