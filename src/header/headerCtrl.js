"use strict";
angular.module('stpCommon.header').controller('HeaderCtrl', ['$scope', '$state', 'HeaderService', function($scope, $state, HeaderService){
    $scope.HeaderService = HeaderService;
}]);