"use strict";
angular.module('stpCommon.header', ['ui.router']);

"use strict";
angular.module('stpCommon.header')
    .controller('HeaderCtrl', ['$scope', '$state', '$window', 'HeaderService', function($scope, $state, $window, HeaderService){
    $scope.HeaderService = HeaderService;
}]);
"use strict";
angular.module('stpCommon.header')
    .factory('HeaderService', ['$filter', function($filter){
        var self = this;
        self.customer = {firstName: '', lastName: '', personId: ''};
        self.policyHolder = {firstName: '',lastName: '', personId: ''};
        self.headerMessageRoot = 'GENERAL.HEADER.MESSAGE';
        self.siteHeaderTemplateUrl = 'header/siteHeader.tpl.html';

        var objectName;
        var eventName;

        var service = {
            showCustomerInfo: showCustomerInfo,
            showIdentificationHeader: showIdentificationHeader,
            showSectionsHeader: showSectionsHeader,
            restart: restart,
            setCustomer: setCustomer,
            getCustomer: getCustomer,
            setPolicyHolder: setPolicyHolder,
            getPolicyHolder: getPolicyHolder,
            hasName: hasName,
            getCustomerFullName: getCustomerFullName,
            getPolicyHolderFullName: getPolicyHolderFullName,
            setObjectName: setObjectName,
            getObjectName: getObjectName,
            setEventName: setEventName,
            getEventName: getEventName,
            clearPolicyHolderInfo: clearPolicyHolderInfo,
            hasCustomerPersonId: hasCustomerPersonId,
            hasPolicyHolderPersonId: hasPolicyHolderPersonId,
            setCustomerAsPolicyHolder: setCustomerAsPolicyHolder,
            getHeaderMessageRoot : getHeaderMessageRoot,
            setHeaderMessageRoot : setHeaderMessageRoot,
            getSiteHeaderTemplateUrl : getSiteHeaderTemplateUrl,
            setSiteHeaderTemplateUrl : setSiteHeaderTemplateUrl
        };
        return service;

        function restart(){}

        function setObjectName(name){
            objectName = name;
        }

        function getObjectName(){
            return objectName;
        }

        function setEventName(name){
            eventName = name;
        }

        function getEventName(){
            return eventName;
        }

        function setCustomer(customer) {
            self.customer = customer;
            toCapitalAndLowerCase(self.customer);
        }

        function getCustomer() {
            return self.customer;
        }

        function setPolicyHolder(policyHolder) {
            self.policyHolder = policyHolder;
            toCapitalAndLowerCase(self.policyHolder);
        }

        function getPolicyHolder() {
            return self.policyHolder;
        }

        function showCustomerInfo(){
            return true;
        }

        function showIdentificationHeader(){
            return true;
        }

        function showSectionsHeader(){
            return true;
        }


        function hasName(){
            return !! self.customer.firstName ||self.policyHolder.firstName;
        }

        function getCustomerFullName(){
            return fullName(self.customer.firstName, self.customer.lastName);
        }

        function getPolicyHolderFullName(){
            return fullName(self.policyHolder.firstName, self.policyHolder.lastName);
        }

        function fullName(firstName, lastName){
            var wholeName = '';
            if(firstName){
                wholeName = firstName + ' ';
            }
            if(lastName){
                wholeName += lastName;
            }
            return wholeName;
        }


        function clearPolicyHolderInfo() {
            self.policyHolder = {};
        }

        function hasCustomerPersonId(personId) {
            return personId === self.customer.personId;
        }

        function hasPolicyHolderPersonId(personId) {
            return personId === self.policyHolder.personId;
        }

        function setCustomerAsPolicyHolder() {
            self.policyHolder = self.customer;
        }

        function getHeaderMessageRoot(){
            return self.headerMessageRoot;
        }
        function setHeaderMessageRoot(root){
            self.headerMessageRoot = root;
        }
        function setSiteHeaderTemplateUrl(url){
            self.siteHeaderTemplateUrl = url;
        }
        function getSiteHeaderTemplateUrl(){
            return self.siteHeaderTemplateUrl;
        }


        function toCapitalAndLowerCase(customerObject) {
            if (customerObject.firstName) {
                customerObject.firstName = $filter('capitalAndLowerCase')(customerObject.firstName);
            }
            if (customerObject.lastName) {
                customerObject.lastName = $filter('capitalAndLowerCase')(customerObject.lastName);
            }
        }

    }]);
"use strict";
angular.module('stpCommon.header').filter('capitalAndLowerCase', function() {

    return function (str){
        if (str !== undefined) {
            return str.replace(/[^-'\s]+/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

    };
});
angular.module('stpHeaderTemplates', ['header/customerInfo.tpl.html', 'header/header.tpl.html', 'header/siteHeader.tpl.html', 'header/siteHeaderGeneral.tpl.html', 'header/siteTop.tpl.html']);

angular.module("header/customerInfo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/customerInfo.tpl.html",
    "<div class=\"u-bgcolor-yellow-4 u-clearfix u-small-type u-hide-print\">\n" +
    "    <div class=\"grid-wrapper u-spacing-above-narrow \">\n" +
    "        <div class=\"grid\">\n" +
    "            <div class=\"grid__item md--eight-twelfths u-space-words\">\n" +
    "                <div class=\"u-inline-block\">\n" +
    "                    <b>{{'GENERAL.CUSTOMER_INFO.NOTIFIER' | translate}}</b>\n" +
    "                    <span id=\"notifierName\">{{HeaderService.getCustomerFullName() ? (HeaderService.getCustomerFullName() | capitalAndLowerCase) : HeaderService.getCustomer().personId}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"u-inline-block\">\n" +
    "                    <b>{{'GENERAL.CUSTOMER_INFO.POLICYHOLDER' | translate}}</b>\n" +
    "                    <span id=\"policyHolderName\">{{HeaderService.getPolicyHolderFullName() ? (HeaderService.getPolicyHolderFullName() | capitalAndLowerCase) : HeaderService.getPolicyHolder().personId}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"grid__item md--four-twelfths\">\n" +
    "                <div class=\"u-align-right\"><a ui-sref=\"identification\" ng-click=\"HeaderService.restart()\" class=\"u-font-semibold\" tabindex=\"-1\">{{'GENERAL.CUSTOMER_INFO.GO_BACK' | translate}}</a></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("header/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/header.tpl.html",
    "<div ng-controller=\"HeaderCtrl\">\n" +
    "    <ng-include src=\"'header/siteTop.tpl.html'\"></ng-include>\n" +
    "\n" +
    "    <ng-include src=\"HeaderService.getSiteHeaderTemplateUrl();\"></ng-include>\n" +
    "    <!--<ng-include src=\"'header/siteHeader.tpl.html'\"></ng-include>-->\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <ng-include src=\"'header/customerInfo.tpl.html'\" ng-show=\"HeaderService.showCustomerInfo()\"></ng-include>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("header/siteHeader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/siteHeader.tpl.html",
    "<section class=\"masthead u-bgcolor-blue-2\" ng-show=\"HeaderService.showIdentificationHeader()\">\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <div class=\"masthead__content\">\n" +
    "            <p id=\"headerMessage\" class=\"masthead__intro\">{{'GENERAL.HEADER.MESSAGE' | translate}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"masthead__img-container\">\n" +
    "            <!--[if IE 8]><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><![endif]-->\n" +
    "            <!--[if gt IE 8]><!--><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><!--<![endif]-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"masthead u-bgcolor-blue-2\" ng-show=\"HeaderService.showSectionsHeader()\">\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <div class=\"masthead__content\">\n" +
    "            <p id=\"headerGreeting\" translate translate-values=\"{firstName: HeaderService.getCustomer().firstName}\" class=\"masthead__intro\">GENERAL.HEADER.GREETING</p>\n" +
    "            <p id=\"headerMessage\" translate translate-values=\"{objectName: HeaderService.getObjectName(), eventName: HeaderService.getEventName()}\" class=\"masthead__largetype\">GENERAL.HEADER.MESSAGE</p>\n" +
    "        </div>\n" +
    "        <div class=\"masthead__img-container\">\n" +
    "            <!--[if IE 8]><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><![endif]-->\n" +
    "            <!--[if gt IE 8]><!--><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><!--<![endif]-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "<div class=\"u-remove-spacing\"></div>");
}]);

angular.module("header/siteHeaderGeneral.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/siteHeaderGeneral.tpl.html",
    "<section class=\"masthead u-bgcolor-blue-2\" ng-show=\"HeaderService.showIdentificationHeader()\">\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <div class=\"masthead__content\">\n" +
    "            <p id=\"headerMessage\" class=\"masthead__intro\">{{HeaderService.setHeaderMessageRoot()+'.MESSAGE' | translate}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"masthead__img-container\">\n" +
    "            <!--[if IE 8]><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><![endif]-->\n" +
    "            <!--[if gt IE 8]><!--><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><!--<![endif]-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"masthead u-bgcolor-blue-2\" ng-show=\"HeaderService.showSectionsHeader()\">\n" +
    "    <div class=\"content-wrapper\">\n" +
    "        <div class=\"masthead__content\">\n" +
    "            <p id=\"headerGreeting\" translate translate-values=\"{firstName: HeaderService.getCustomer().firstName}\" class=\"masthead__intro\">GENERAL.HEADER.GREETING</p>\n" +
    "            <p id=\"headerMessage\" translate translate-values=\"{objectName: HeaderService.getObjectName(), eventName: HeaderService.getEventName()}\" class=\"masthead__largetype\">{{HeaderService.getHeaderMessageRoot() + '.' + HeaderService.getEventName()}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"masthead__img-container\">\n" +
    "            <!--[if IE 8]><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><![endif]-->\n" +
    "            <!--[if gt IE 8]><!--><img src=\"assets/svg/bg-masthead-claims.svg\" alt=\"\"><!--<![endif]-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "<div class=\"u-remove-spacing\"></div>");
}]);

angular.module("header/siteTop.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/siteTop.tpl.html",
    "<div class=\"site-top-wrapper\">\n" +
    "    <div class=\"site-top site-top--non-sticky\">\n" +
    "        <header class=\"site-header\" role=\"banner\">\n" +
    "            <div class=\"content-wrapper\">\n" +
    "                    <a class=\"site-header__logo icon icon-folksam\" tabindex=\"-1\" href=\"https://www.folksam.se\" target=\"_top\">\n" +
    "                        <span>Folksam</span>\n" +
    "                    </a>\n" +
    "            </div>\n" +
    "        </header>\n" +
    "    </div>\n" +
    "</div>");
}]);
