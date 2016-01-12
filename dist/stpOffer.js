"use strict";
angular.module('stpCommon.offer', [])
    .controller('OfferCtrl', ['$scope', 'OfferService', function($scope, OfferService){
        $scope.template = OfferService.getOfferModel().getClaimType() === 'LTP' ? 'offer/ltp/ltp.tpl.html' : 'offer/stp/stp.tpl.html';
        $scope.claimId = OfferService.getOfferModel().getClaimId();
    }])
    .factory('OfferService', [function(){
        var service = {
            getOfferModel: getOfferModel
        };
        return service;

        function getOfferModel(){
            var model = {
                getClaimType: getClaimType,
                getClaimId: getClaimId
            };
            return model;

            function getClaimType(){
                return 'LTP';
            }

            function getClaimId(){
                return 'FF123456789S'
            }
        }
    }])
    .controller('STPCtrl', ['$scope', 'OfferService', 'HeaderService', 'ErrorReporter', 'QuestionService', function($scope, OfferService, HeaderService, ErrorReporter, QuestionService){
        $scope.offerModel = OfferService.getOfferModel();
        $scope.customer = {fullName: HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomerPersonId()};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName() ? HeaderService.getPolicyHolderFullName() : HeaderService.getPolicyHolderPersonId() ? HeaderService.getPolicyHolderPersonId() : HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomerPersonId()};
        $scope.acceptanceQuestion = QuestionService.getQuestionBuilder()
            .id('acceptance')
            .text({root:'VIEW.SECTIONS.OFFER.STP.QUESTIONS.ACCEPTANCE', translateValues: {compensation: '1000'}})
            .type('buttongroupbig')
            .values([{label: 'OPTIONS.YES', value: 'YES'}, {label: 'OPTIONS.NO', value: 'NO'}])
            .required(true)
            .createQuestion();
        $scope.confirmOffer = function(){
            if(!ErrorReporter.hasErrors()){
                $scope.thankYouTemplate = 'offer/stp/thanks.tpl.html';
            }
        };
    }]);
angular.module('stpOfferTemplates', ['offer/ltp/ltp.tpl.html', 'offer/ltp/thanks.tpl.html', 'offer/offer.tpl.html', 'offer/stp/stp.tpl.html', 'offer/stp/thanks.tpl.html']);

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
    "                    <p translate translate-values=\"{claimId: claimId}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CLAIM_ID</p>\n" +
    "\n" +
    "                    <div class=\"u-spacing-above\">\n" +
    "                        <p translate translate-values=\"{eventType: offerModel.eventType}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CONTACT</p>\n" +
    "                        <p translate>VIEW.SECTIONS.OFFER.REGARDS</p>\n" +
    "                        <p translate>VIEW.SECTIONS.OFFER.FOLKSAM</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "                    ng-if=\"acceptanceQuestion.getAnswer() !== options.no.value\"\n" +
    "                    ng-click=\"confirmOffer();\"\n" +
    "                    name=\"offerConfirmation\"\n" +
    "                    translate>VIEW.SECTIONS.OFFER.STP.CONFIRM_OFFER\n" +
    "            </button>\n" +
    "            <button class=\"button button--primary u-spacing-above-narrow u-spacing-under-narrow u-no-transition\"\n" +
    "                    ng-if=\"acceptanceQuestion.getAnswer() === options.no.value\"\n" +
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

angular.module("offer/stp/thanks.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/stp/thanks.tpl.html",
    "<div class=\"u-bgcolor-blue-5 u-small-type\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-padding-above\">\n" +
    "\n" +
    "            <h3 class=\"u-typography-2 u-spacing-under-narrow\" translate>VIEW.OFFER.STP.THANKS.HEADER</h3>\n" +
    "\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p ng-if=\"offerModel.claimId\" translate translate-values=\"{compensation: offerModel.compensation, claimId: offerModel.claimId}\">VIEW.OFFER.STP.THANKS.INFO_PAYMENT_CLAIM_ID</p>\n" +
    "\n" +
    "                    <div class=\"u-spacing-above\">\n" +
    "                        <p translate>VIEW.OFFER.STP.THANKS.INFO_CONTACT</p>\n" +
    "                        <p translate>VIEW.OFFER.STP.THANKS.INFO_SATISFIED</p>\n" +
    "                        <p translate>VIEW.OFFER.REGARDS</p>\n" +
    "                        <p translate>VIEW.OFFER.FOLKSAM</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <div class=\"suggestion u-bgcolor-white\">\n" +
    "                        <h4 translate>VIEW.OFFER.STP.THANKS.ADVICE_HEADING</h4>\n" +
    "                        <p translate>VIEW.OFFER.STP.THANKS.ADVICE</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"suggestion\" ng-if=\"!offerModel.policeIsReported\">\n" +
    "                        <h4 translate translate-values=\"{eventType: offerModel.eventType}\">VIEW.OFFER.STP.THANKS.INFO_POLICE_REPORT</h4>\n" +
    "                        <p>\n" +
    "                          <a class=\"link-external\" href=\"https://polisen.se/Utsatt-for-brott/Gor-en-anmalan/\" translate translate-values=\"{eventType: offerModel.eventType}\" target=\"_blank\">VIEW.OFFER.STP.THANKS.LINK_POLICE_REPORT</a>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "    <button class=\"button u-spacing-above-narrow u-spacing-under-narrow js-print\" ng-click=\"print();\"><i class=\"icon icon-print\"></i> {{'VIEW.OFFER.STP.THANKS.PRINT' | fsmTranslate}}</button>\n" +
    "</div>");
}]);
