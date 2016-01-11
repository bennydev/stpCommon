angular.module('stpSummaryTemplates', ['summary/summary.tpl.html']);

angular.module("summary/summary.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("summary/summary.tpl.html",
    "<div ng-controller=\"SummaryCtrl\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-spacing-above u-spacing-under\">\n" +
    "            <div class=\"grid\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate>VIEW.SECTIONS.SUMMARY.TEXT</p>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <dl class=\"info-tile\">\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.NOTIFIER</dt>\n" +
    "                        <dd id=\"summaryNotifierName\">{{customer.fullName | capitalAndLowerCase}}</dd>\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.POLICYHOLDER</dt>\n" +
    "                        <dd id=\"summaryPolicyHolderName\">{{policyHolder.fullName | capitalAndLowerCase}}</dd>\n" +
    "                    </dl>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-repeat=\"summaryContainer in summaryModel track by $index\">\n" +
    "            <h3>{{summaryContainer.header | translate}}</h3>\n" +
    "            <a href=\"#questions-about-your-phone\"\n" +
    "               ng-click=\"goTo(summaryContainer.section)\"\n" +
    "               class=\"form-section__change u-font-bold slidedown-anchor\" translate>VIEW.SECTIONS.SUMMARY.CHANGE</a>\n" +
    "            <table class=\"standard-table standard-table--summary standard-table--fixed\">\n" +
    "                <tbody ng-repeat=\"block in summaryContainer.blocks track by $index\">\n" +
    "                <tr>\n" +
    "                    <td class=\"form-section__subheading\" colspan=\"2\" ng-show=\"block.header\">{{block.header | translate}}</td>\n" +
    "                </tr>\n" +
    "                <tr ng-repeat=\"summary in block.summaries track by $index\"\n" +
    "                    class=\"summary-item\"\n" +
    "                    ng-class=\"{'even-row' : $index % 2 === 0}\">\n" +
    "                    <th id=\"{{summary.id +'Question'}}\">{{summary.question | translate}}</th>\n" +
    "                    <td id=\"{{summary.id +'Answer'}}\">{{summary.answer | translate}}</td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <stp-Navigation></stp-Navigation>\n" +
    "</div>");
}]);

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

        function createSummary(id, question, answer){
            return {id: id, question: question, answer: answer};
        }
    }])
    .controller('SummaryCtrl', ['$scope', 'HeaderService', 'SummaryService', function($scope, HeaderService, SummaryService){
        $scope.navigationTextKey = 'VIEW.SECTIONS.SUMMARY.NAVIGATION.NEXT';
        $scope.customer = {fullName: HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomerPersonId()};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName() ? HeaderService.getPolicyHolderFullName() : HeaderService.getPolicyHolderPersonId() ? HeaderService.getPolicyHolderPersonId() : HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomerPersonId()};
        $scope.summaryModel = SummaryService.getSummaryModel();
        $scope.goTo = SummaryService.goTo;
        $scope.next = SummaryService.next;
    }]);