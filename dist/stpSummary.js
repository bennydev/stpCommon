angular.module('stpSummaryTemplates', ['summary/summary.tpl.html']);

angular.module("summary/summary.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("summary/summary.tpl.html",
    "<div ng-controller=\"SummaryCtrl\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-spacing-above u-spacing-under\">\n" +
    "            <div class=\"grid\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate>VIEW.SUMMARY.TEXT</p>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <dl class=\"info-tile\">\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.NOTIFIER</dt>\n" +
    "                        <dd>{{customer.fullName}}</dd>\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.POLICYHOLDER</dt>\n" +
    "                        <dd>{{policyHolder.fullName}}</dd>\n" +
    "                    </dl>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-repeat=\"summaryContainer in summaryModel track by $index\">\n" +
    "            <h3>{{summaryContainer.header}}</h3>\n" +
    "            <a href=\"#questions-about-your-phone\"\n" +
    "               ng-click=\"goTo(summaryContainer.section)\"\n" +
    "               class=\"form-section__change u-font-bold slidedown-anchor\" translate>VIEW.SUMMARY.CHANGE</a>\n" +
    "            <table class=\"standard-table standard-table--summary standard-table--fixed\">\n" +
    "                <tbody ng-repeat=\"block in summaryContainer.blocks track by $index\">\n" +
    "                <tr>\n" +
    "                    <td class=\"form-section__subheading\" colspan=\"2\" ng-show=\"block.header\">{{block.header}}</td>\n" +
    "                </tr>\n" +
    "                <tr ng-repeat=\"question in block.questions track by $index\"\n" +
    "                    class=\"summary-item\"\n" +
    "                    ng-class=\"{'even-row' : $index % 2 === 0}\">\n" +
    "                    <th>{{question.question}}</th>\n" +
    "                    <td>{{question.answer}}</td>\n" +
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