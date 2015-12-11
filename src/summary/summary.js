"use strict";
angular.module('stpCommon.summary',
    [
        'stpCommon.header',
        'stpCommon.navigation',
        'stpNavigationTemplates'
    ])
    .factory('SummaryService', [function(){
        var service = {
            goTo: goTo,
            next: next
        };
        return service;

        function goTo(section){}
        function next(){}
    }])
    .controller('SummaryCtrl', ['$scope', 'HeaderService', 'SummaryService', function($scope, HeaderService, SummaryService){
        $scope.navigationTextKey = 'VIEW.SECTIONS.SUMMARY.NAVIGATION.NEXT';
        $scope.customer = {fullName: HeaderService.getCustomerFullName()};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName()};
        $scope.goTo = SummaryService.goTo;
        $scope.next = SummaryService.next;
    }]);