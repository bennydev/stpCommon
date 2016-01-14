"use strict";
angular.module('stpCommon.offer', [])
    .controller('OfferCtrl', ['$scope', 'OfferService', function($scope, OfferService){
        $scope.template = OfferService.getOfferModel().getClaimType() === 'LTP' ? 'offer/ltp/ltp.tpl.html' : 'offer/stp/stp.tpl.html';
        $scope.claimId = OfferService.getOfferModel().getClaimId();
        $scope.event = OfferService.getOfferModel().getEvent();
    }])
    .factory('OfferService', [function(){
        var service = {
            getOfferModel: getOfferModel
        };
        return service;

        function getRightColumnTemplateUrl(){
            return 'REPLACE_THIS_URL';
        }

        function getOfferModel(){
            var model = {
                getClaimType: getClaimType,
                getClaimId: getClaimId,
                getEvent: getEvent,
                calculation: [{description: 'REPLACE_THIS', value: 999, type: '-'}],
                compensation: 1000,
                customerIsPolicyHolder: true,
                deductionExplanation: 'REPLACE_THIS_EXPLANATION'
            };
            return model;

            function getClaimType(){
                return 'LTP';
            }

            function getClaimId(){
                return 'REPLACE_THIS';
            }

            function getEvent(){
                return 'REPLACE_THIS';
            }
        }
    }])
    .controller('STPCtrl', ['$scope', '$window', 'OfferService', 'HeaderService', 'ErrorReporter', 'QuestionService', function($scope, $window, OfferService, HeaderService, ErrorReporter, QuestionService){
        $scope.offerModel = OfferService.getOfferModel();
        $scope.customer = {fullName: HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomerPersonId()};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName() ? HeaderService.getPolicyHolderFullName() : HeaderService.getPolicyHolderPersonId() ? HeaderService.getPolicyHolderPersonId() : HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomerPersonId()};
        $scope.acceptanceQuestion = QuestionService.getQuestionBuilder()
            .id('acceptance')
            .text({root:'VIEW.SECTIONS.OFFER.STP.QUESTIONS.ACCEPTANCE', getTranslateValues: function(){return {compensation: $scope.offerModel.compensation};}})
            .type('buttongroupbig')
            .values([{label: 'OPTIONS.YES', value: 'YES'}, {label: 'OPTIONS.NO', value: 'NO'}])
            .required(true)
            .createQuestion();
        $scope.confirmOffer = function(){
            if(!ErrorReporter.hasErrors()){
                $scope.thankYouTemplate = $scope.acceptanceQuestion.answer === 'YES' ? 'offer/stp/thanks.yes.tpl.html' : 'offer/stp/thanks.no.tpl.html';
            }
        };
        $scope.print = function(){
            $window.print();
        };
    }]);
angular.module('stpOfferTemplates', ['offer/common/policereport.tpl.html', 'offer/ltp/ltp.tpl.html', 'offer/ltp/thanks.tpl.html', 'offer/offer.tpl.html', 'offer/stp/stp.tpl.html', 'offer/stp/thanks.no.tpl.html', 'offer/stp/thanks.yes.tpl.html']);

angular.module("offer/common/policereport.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/common/policereport.tpl.html",
    "<div class=\"suggestion\" ng-if=\"!offerModel.policeIsReported\">\n" +
    "    <h4 translate translate-values=\"{eventType: offerModel.eventType}\">VIEW.SECTIONS.OFFER.INFO_POLICE_REPORT</h4>\n" +
    "    <a class=\"link-external\" href=\"https://polisen.se/Utsatt-for-brott/Gor-en-anmalan/\" translate translate-values=\"{eventType: offerModel.eventType}\" target=\"_blank\">VIEW.SECTIONS.OFFER.LINK_POLICE_REPORT</a>\n" +
    "</div>");
}]);

angular.module("offer/ltp/ltp.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/ltp/ltp.tpl.html",
    "<div ng-include=\"'offer/ltp/thanks.tpl.html'\"></div>");
}]);

angular.module("offer/ltp/thanks.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/ltp/thanks.tpl.html",
    "<div class=\"u-bgcolor-blue-5 u-small-type\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-padding-above\">\n" +
    "\n" +
    "            <h3 class=\"u-typography-2 u-spacing-under-narrow\" translate>VIEW.SECTIONS.OFFER.LTP.THANKS.HEADER</h3>\n" +
    "\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate translate-values=\"{event: event}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_RECEIVED</p>\n" +
    "                    <p translate translate-values=\"{claimId: claimId}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CLAIM_ID</p>\n" +
    "                    <div class=\"u-spacing-above\">\n" +
    "                        <p translate translate-values=\"{eventType: offerModel.eventType}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CONTACT</p>\n" +
    "                        <p>\n" +
    "                            {{'VIEW.SECTIONS.OFFER.REGARDS' | translate}}\n" +
    "                            <br>\n" +
    "                            {{'VIEW.SECTIONS.OFFER.FOLKSAM' | translate}}\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <ng-include src=\"offer/common/policereport.tpl.html\"></ng-include>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "</div>");
}]);

angular.module("offer/offer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer.tpl.html",
    "<div ng-controller=\"OfferCtrl\">\n" +
    "    <ng-include src=\"template\"></ng-include>\n" +
    "</div>");
}]);

angular.module("offer/stp/stp.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/stp/stp.tpl.html",
    "<div ng-controller=\"STPCtrl\">\n" +
    "\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-spacing-above u-spacing-under\">\n" +
    "            <div class=\"grid\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <h3 class=\"u-typography-2\" translate>VIEW.SECTIONS.OFFER.STP.HEADER</h3>\n" +
    "\n" +
    "                    <p translate translate-values=\"{compensation: offerModel.compensation}\">VIEW.SECTIONS.OFFER.STP.INFO_COMPENSATION</p>\n" +
    "\n" +
    "                    <p ng-if=\"!offerModel.customerIsPolicyHolder\">{{'VIEW.SECTIONS.OFFER.STP.PAYMENT_RECIEVER' | translate}}</p>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "\n" +
    "                    <dl class=\"info-tile\">\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.NOTIFIER</dt>\n" +
    "                        <dd>{{customer.fullName}}</dd>\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.POLICYHOLDER</dt>\n" +
    "                        <dd>{{policyHolder.fullName}}</dd>\n" +
    "                    </dl>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <h3 class=\"u-typography-4\" translate>VIEW.SECTIONS.OFFER.STP.CALCULATION_HEADER</h3>\n" +
    "\n" +
    "        <table class=\"standard-table standard-table--fixed standard-table--summary standard-table--calculation\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"row in offerModel.calculation\">\n" +
    "                    <th>{{row.description}}</th>\n" +
    "                    <td>\n" +
    "                        <span ng-if=\"row.type === '-'\"> -</span>\n" +
    "                        <span ng-if=\"row.type === '+'\"> </span>\n" +
    "                        {{row.value}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "            <tfoot>\n" +
    "                <tr>\n" +
    "                    <th translate>VIEW.SECTIONS.OFFER.STP.PAYMENT_HEADING</th>\n" +
    "                    <td>{{offerModel.compensation}}</td>\n" +
    "                </tr>\n" +
    "            </tfoot>\n" +
    "\n" +
    "        </table>\n" +
    "        <p ng-if='offerModel.deductionExplanation'\n" +
    "           class=\"form-note\" translate>{{offerModel.deductionExplanation}}\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"!thankYouTemplate\">\n" +
    "        <div class=\"u-align-center u-bgcolor-blue-5\">\n" +
    "            <fsm-question question=\"acceptanceQuestion\" translate-values=\"{compensation: offerModel.compensation}\"></fsm-question>\n" +
    "        </div>\n" +
    "        <div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "            <button class=\"button button--primary u-spacing-above-narrow u-spacing-under-narrow u-no-transition\"\n" +
    "                    ng-show=\"acceptanceQuestion.answer !== 'NO'\"\n" +
    "                    ng-click=\"confirmOffer();\"\n" +
    "                    name=\"offerConfirmation\"\n" +
    "                    translate>VIEW.SECTIONS.OFFER.STP.CONFIRM_OFFER\n" +
    "            </button>\n" +
    "            <button class=\"button button--primary u-spacing-above-narrow u-spacing-under-narrow u-no-transition\"\n" +
    "                    ng-show=\"acceptanceQuestion.answer === 'NO'\"\n" +
    "                    id=\"offerConfirmation\"\n" +
    "                    name=\"noOfferConfirmation\"\n" +
    "                    ng-click=\"confirmOffer();\"\n" +
    "                    ng-cloak translate>VIEW.SECTIONS.OFFER.STP.CONTACT_ME\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-include=\"thankYouTemplate\" ng-if=\"thankYouTemplate\"></div>\n" +
    "</div>");
}]);

angular.module("offer/stp/thanks.no.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/stp/thanks.no.tpl.html",
    "<div class=\"u-bgcolor-blue-5 u-small-type\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-padding-above\">\n" +
    "\n" +
    "            <h3 class=\"u-typography-2 u-spacing-under-narrow\" translate>VIEW.SECTIONS.OFFER.STP.THANKS_NO.HEADER</h3>\n" +
    "\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate translate-values=\"{compensation: offerModel.compensation, claimId: offerModel.getClaimId()}\">VIEW.SECTIONS.OFFER.STP.THANKS_NO.INFO_REJECTED_CONTACT_CLAIM_ID</p>\n" +
    "                    <p translate>VIEW.SECTIONS.OFFER.STP.INFO_CONTACT_US</p>\n" +
    "                    <p>\n" +
    "                        {{'VIEW.SECTIONS.OFFER.REGARDS' | translate}}\n" +
    "                        <br>\n" +
    "                        {{'VIEW.SECTIONS.OFFER.FOLKSAM' | translate}}\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <div class=\"suggestion u-bgcolor-white\">\n" +
    "                        <h4 translate>VIEW.SECTIONS.OFFER.STP.ADVICE_HEADING</h4>\n" +
    "                        <p translate>VIEW.SECTIONS.OFFER.STP.ADVICE</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <ng-include src=\"offer/common/policereport.tpl.html\"></ng-include>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "    <button class=\"button u-spacing-above-narrow u-spacing-under-narrow js-print\" ng-click=\"print();\"><i class=\"icon icon-print\"></i> {{'VIEW.SECTIONS.OFFER.STP.PRINT' | translate}}</button>\n" +
    "</div>");
}]);

angular.module("offer/stp/thanks.yes.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/stp/thanks.yes.tpl.html",
    "<div class=\"u-bgcolor-blue-5 u-small-type\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-padding-above\">\n" +
    "\n" +
    "            <h3 class=\"u-typography-2 u-spacing-under-narrow\" translate>VIEW.SECTIONS.OFFER.STP.THANKS_YES.HEADER</h3>\n" +
    "\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate translate-values=\"{compensation: offerModel.compensation, claimId: offerModel.getClaimId()}\">VIEW.SECTIONS.OFFER.STP.THANKS_YES.INFO_PAYMENT_CLAIM_ID</p>\n" +
    "                    <p translate>VIEW.SECTIONS.OFFER.STP.INFO_CONTACT_US</p>\n" +
    "                    <p translate>VIEW.SECTIONS.OFFER.STP.THANKS_YES.INFO_SATISFIED</p>\n" +
    "                    <p>\n" +
    "                        {{'VIEW.SECTIONS.OFFER.REGARDS' | translate}}\n" +
    "                    <br>\n" +
    "                        {{'VIEW.SECTIONS.OFFER.FOLKSAM' | translate}}\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <div class=\"suggestion u-bgcolor-white\">\n" +
    "                        <h4 translate>VIEW.SECTIONS.OFFER.STP.ADVICE_HEADING</h4>\n" +
    "                        <p translate>VIEW.SECTIONS.OFFER.STP.ADVICE</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <ng-include src=\"offer/common/policereport.tpl.html\"></ng-include>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "    <button class=\"button u-spacing-above-narrow u-spacing-under-narrow js-print\" ng-click=\"print();\"><i class=\"icon icon-print\"></i> {{'VIEW.SECTIONS.OFFER.STP.PRINT' | translate}}</button>\n" +
    "</div>");
}]);
