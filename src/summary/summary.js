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
            next: next,
            getSummaryModel: getSummaryModel,
            createSummaryContainer: createSummaryContainer,
            createSummaryBlock: createSummaryBlock,
            createSummary: createSummary
        };
        return service;

        function goTo(section){}
        function next(){}
        function getSummaryModel(){}

        function createSummaryContainer(header, sectionName){
            return {header: header, blocks: [], section: sectionName};
        }

        function createSummaryBlock(header){
            var block = {header: header, summaries: [], addSummary: addSummary};
            return block;
            function addSummary(summary){
                block.summaries.push(summary);
            }
        }

        function createSummary(question, answer){
            return {question: question, answer: answer};
        }
    }])
    .controller('SummaryCtrl', ['$scope', 'HeaderService', 'SummaryService', function($scope, HeaderService, SummaryService){
        $scope.navigationTextKey = 'VIEW.SECTIONS.SUMMARY.NAVIGATION.NEXT';
        $scope.customer = {fullName: HeaderService.getCustomerFullName()};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName()};
        $scope.summaryModel = SummaryService.getSummaryModel();
        $scope.goTo = SummaryService.goTo;
        $scope.next = SummaryService.next;
    }]);