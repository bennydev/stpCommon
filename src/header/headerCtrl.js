"use strict";
angular.module('stpCommon.header')
    .controller('HeaderCtrl', ['$scope', '$state', '$window', 'HeaderService', function($scope, $state, $window, HeaderService){
    $scope.HeaderService = HeaderService;
}]);