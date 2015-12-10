"use strict";
angular.module('stpCommon.header', ['ui.router']);

"use strict";
angular.module('stpCommon.header').controller('HeaderCtrl', ['$scope', '$state', function($scope, $state, HeaderService){
    $scope.HeaderService = HeaderService;
}]);
"use strict";
angular.module('stpCommon.header').factory('HeaderService', [function(){
    var customerFirstName;
    var customerLastName;
    var policyHolderFirstName;
    var policyHolderLastName;

    var service = {
        showCustomerInfo: showCustomerInfo,
        setCustomerFirstName: setCustomerFirstName,
        setCustomerLastName: setCustomerLastName,
        setPolicyHolderFirstName: setPolicyHolderFirstName,
        setPolicyHolderLastName: setPolicyHolderLastName,
        hasName: hasName,
        getCustomerFullName: getCustomerFullName,
        getPolicyHolderFullName: getPolicyHolderFullName
    };
    return service;

    function showCustomerInfo(){
        return true;
    }

    function setCustomerFirstName(name){
        customerFirstName = name;
    }

    function setCustomerLastName(name){
        customerLastName = name;
    }

    function setPolicyHolderFirstName(name){
        policyHolderFirstName = name;
    }

    function setPolicyHolderLastName(name){
        policyHolderLastName = name;
    }

    function hasName(){
        return !! customerFirstName || policyHolderFirstName;
    }

    function getCustomerFullName(){
        return customerFirstName + ' ' + customerLastName;
    }

    function getPolicyHolderFullName(){
        return policyHolderFirstName + ' ' + policyHolderLastName;
    }

}]);
angular.module('stpHeaderTemplates', ['header/customerInfo.tpl.html', 'header/header.tpl.html', 'header/siteHeader.tpl.html', 'header/siteTop.tpl.html']);

angular.module("header/customerInfo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/customerInfo.tpl.html",
    "<div class=\"u-bgcolor-yellow-4 u-clearfix u-small-type u-hide-print\">\n" +
    "    <div class=\"grid-wrapper u-spacing-above-narrow \">\n" +
    "        <div class=\"grid\">\n" +
    "            <div class=\"grid__item md--eight-twelfths u-space-words\">\n" +
    "                <div class=\"u-inline-block\"><b>{{'VIEW.MOBILE.QUESTIONS.OBJECT.CUSTOMER_INFO.NOTIFIER'}}</b> {{HeaderService.getCustomerFullName()}}</div>\n" +
    "                <div class=\"u-inline-block\"><b>{{'VIEW.MOBILE.QUESTIONS.OBJECT.CUSTOMER_INFO.POLICYHOLDER' }}</b> {{HeaderService.getPolicyHolderFullName()}}</div>\n" +
    "            </div>\n" +
    "            <div class=\"grid__item md--four-twelfths\">\n" +
    "                <div class=\"u-align-right\"><a ui-sref=\"identification\" class=\"u-font-semibold\" tabindex=\"-1\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.CUSTOMER_INFO.GO_BACK'}}</a></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("header/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/header.tpl.html",
    "<div ng-controller=\"HeaderCtrl\">\n" +
    "    <ng-include src=\"'header/siteTop.tpl.html'\"></ng-include>\n" +
    "    <ng-include src=\"'header/siteHeader.tpl.html'\"></ng-include>\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <ng-include src=\"'header/customerInfo.tpl.html'\" ng-show=\"HeaderService.showCustomerInfo()\"></ng-include>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("header/siteHeader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/siteHeader.tpl.html",
    "<!--\n" +
    "<section class=\"masthead u-bgcolor-blue-2\">\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <div class=\"masthead__content\">\n" +
    "            <p ng-if=\"HeaderService.hasName() && $state.current.name !== 'identification'\" translate translate-values=\"{customer: CUSTOMER_OBJECT.customer}\" class=\"masthead__intro\">VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.GREETING</p>\n" +
    "            <p ng-if=\"CUSTOMER_OBJECT.hasName() && $state.current.name !== 'identification'\" translate translate-values=\"{objectName: EVENT_AND_OBJECT.objectName, eventName: EVENT_AND_OBJECT.eventName}\" class=\"masthead__largetype\">VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.MESSAGE</p>\n" +
    "\n" +
    "            <p class=\"masthead__intro\" ng-show=\"(!CUSTOMER_OBJECT.hasName() || $state.current.name === 'identification') && !$phase\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.MESSAGE_UNIDENTIFIED'}}</p>\n" +
    "            <p class=\"masthead__contact\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.SUB_MESSAGE'}} <a href=\"tel://{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.PHONE_NOFORMAT'}}\" class=\"tel\" tabindex=\"-1\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.PHONE'}}</a></p>\n" +
    "        </div>\n" +
    "        <div class=\"masthead__img-container\">\n" +
    "            <!--[if IE 8]><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><![endif]-->\n" +
    "            <!--[if gt IE 8]><!--><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><!--<![endif]-->\n" +
    "<!--\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "-->\n" +
    "<section class=\"masthead u-bgcolor-blue-2\" ng-show=\"HeaderService.showIdentificationHeader()\">\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <div class=\"masthead__content\">\n" +
    "            <p class=\"masthead__intro\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.MESSAGE_UNIDENTIFIED'}}</p>\n" +
    "            <p class=\"masthead__contact\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.SUB_MESSAGE'}} <a href=\"tel://{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.PHONE_NOFORMAT'}}\" class=\"tel\" tabindex=\"-1\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.PHONE'}}</a></p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"masthead u-bgcolor-blue-2\" ng-show=\"HeaderService.showSectionsHeader()\">\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <div class=\"masthead__content\">\n" +
    "            <p translate translate-values=\"{customer: CUSTOMER_OBJECT.customer}\" class=\"masthead__intro\">VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.GREETING</p>\n" +
    "            <p translate translate-values=\"{objectName: EVENT_AND_OBJECT.objectName, eventName: EVENT_AND_OBJECT.eventName}\" class=\"masthead__largetype\">VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.MESSAGE</p>\n" +
    "            <p class=\"masthead__contact\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.SUB_MESSAGE'}} <a href=\"tel://{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.PHONE_NOFORMAT'}}\" class=\"tel\" tabindex=\"-1\">{{'VIEW.MOBILE.QUESTIONS.OBJECT.HEADER.PHONE'}}</a></p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("header/siteTop.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/siteTop.tpl.html",
    "<div class=\"site-top-wrapper\">\n" +
    "    <div class=\"site-top site-top--non-sticky\">\n" +
    "        <header class=\"site-header\" role=\"banner\">\n" +
    "            <div class=\"content-wrapper\">\n" +
    "                <div class=\"site-header__logo icon icon-folksam\" tabindex=\"-1\"><span>Folksam</span></div>\n" +
    "            </div>\n" +
    "        </header>\n" +
    "    </div>\n" +
    "</div>");
}]);
