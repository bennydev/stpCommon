"use strict";
angular.module('stpCommon.offer', [])
    .controller('OfferCtrl', ['$scope', 'AbstractOfferService', function($scope, AbstractOfferService){
        $scope.offerModel = AbstractOfferService.getOfferModel();
        $scope.template = $scope.offerModel.getTemplate();
        $scope.claimId = $scope.offerModel.getClaimId();
        $scope.eventType = $scope.offerModel.getEventType();
    }])
    .factory('AbstractOfferService', [function(){
        var service = {
            getOfferModel: getOfferModel
        };
        return service;


        function getTemplate() {
            // replace this if you need another implementation
            return getOfferModel().getClaimType() === 'LTP' ? 'offer/ltp/ltp.tpl.html' : 'offer/stp/stp.tpl.html'
        }

        function getOfferModel(){
            var model = {
                getClaimType: getClaimType,
                getClaimId: getClaimId,
                getEventType: getEventType,
                getTemplate: getTemplate,
                // replace the values below.
                calculation: [{description: 'REPLACE_THIS', value: 999, type: '-'}],
                compensation: 1000,
                customerIsPolicyHolder: true,
                deductionExplanation: 'REPLACE_THIS_EXPLANATION',
                policeIsReported: false
            };
            return model;

            function getClaimType(){
                return 'REPLACE_THIS';
            }

            function getClaimId(){
                return 'REPLACE_THIS';
            }

            function getEventType(){
                return 'REPLACE_THIS';
            }
        }
    }])
    .controller('STPCtrl', ['$scope', '$window', 'AbstractOfferService', 'HeaderService', 'ErrorReporter', 'QuestionService', 'AbstractSTPService', function($scope, $window, AbstractOfferService, HeaderService, ErrorReporter, QuestionService, AbstractSTPService){
        $scope.offerModel = AbstractOfferService.getOfferModel();
        $scope.customer = {fullName: HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomer().personId};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName() ? HeaderService.getPolicyHolderFullName() : HeaderService.getPolicyHolder().personId};
        AbstractSTPService.setCompensation($scope.offerModel.compensation);
        $scope.questionGroups = STPService.getQuestionGroups();
        $scope.acceptanceQuestion = QuestionService.getQuestion('acceptance');
        if(STPService.isOfferConfirmed()){
            $scope.thankYouTemplate = STPService.getThankYouTemplate();
        }

        $scope.confirmOffer = function(){
            AbstractSTPService.validate();
            if(!ErrorReporter.hasErrors()){
                AbstractSTPService.confirmOffer();
            }
        };
        $scope.print = function(){
            $window.print();
        };
    }])
    .factory('AbstractSTPService', ['QuestionService', '$filter', function(QuestionService, $filter){
        var compensation;
        var offerConfirmed = false;
        var QBuilder = QuestionService.getQuestionBuilder();
        var questionsCreated = false;
        var currency = $filter('currency');
        var service = {
            setCompensation: setCompensation,
            getQuestionGroups: getQuestionGroups,
            validate: validate,
            getThankYouTemplate: getThankYouTemplate,
            confirmOffer: confirmOffer,
            next: next,
            isOfferConfirmed: isOfferConfirmed

        };
        function asCurrency(value){
            return currency(value, undefined, 0);
        }
        return service;

        function isOfferConfirmed(){
            return offerConfirmed;
        }

        function next(){
            /* Interface-function */
        }

        function getThankYouTemplate(){
            return QuestionService.getQuestion('acceptance').answer === 'YES' ? 'offer/stp/thanks.yes.tpl.html' : 'offer/stp/thanks.no.tpl.html';
        }

        function confirmOffer(){
            offerConfirmed = true;
            service.next();
        }

        function validate(){
            getQuestionGroups().forEach(function(group){
                group.questions.forEach(function(question){
                    question.validate();
                });
            });
        }

        function getQuestionGroups(){
            createQuestions();
            var groups = [];
            groups.push(createGroup([QuestionService.getQuestion('acceptance')]));
            return groups;
        }

        function createGroup(questions){
            return {questions: questions};
        }

        function createQuestions(){
            if(!questionsCreated){
                acceptance();
                questionsCreated = true;
            }
        }

        function setCompensation(value){
            compensation = value;
        }

        function acceptance(){
            return QBuilder
                .id('acceptance')
                .text({root:'VIEW.SECTIONS.OFFER.STP.QUESTIONS.ACCEPTANCE', getTranslateValues: function(){return {compensation: asCurrency(compensation)};}})
                .type('buttongroupbig')
                .values([{label: 'OPTIONS.YES', value: 'YES'}, {label: 'OPTIONS.NO', value: 'NO'}])
                .required(true)
                .createQuestion();
        }
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
    "                    <p translate translate-values=\"{event: eventType}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_RECEIVED</p>\n" +
    "                    <p translate translate-values=\"{claimId: claimId}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CLAIM_ID</p>\n" +
    "                    <div class=\"u-spacing-above\">\n" +
    "                        <p translate>VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CONTACT</p>\n" +
    "                        <!--<p translate translate-values=\"{eventType: eventType}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CONTACT</p>-->\n" +
    "                        <p>\n" +
    "                            {{'VIEW.SECTIONS.OFFER.REGARDS' | translate}}\n" +
    "                            <br>\n" +
    "                            {{'VIEW.SECTIONS.OFFER.FOLKSAM' | translate}}\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <ng-include src=\"'offer/common/policereport.tpl.html'\"></ng-include>\n" +
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
    "                    <p translate translate-values=\"{compensation: (offerModel.compensation | currency : undefined : 0)}\">VIEW.SECTIONS.OFFER.STP.INFO_COMPENSATION</p>\n" +
    "\n" +
    "                    <p ng-if=\"!offerModel.customerIsPolicyHolder\">{{'VIEW.SECTIONS.OFFER.STP.PAYMENT_RECIEVER' | translate}}</p>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <dl class=\"info-tile\">\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.NOTIFIER</dt>\n" +
    "                        <dd id=\"notifierName\">{{customer.fullName | capitalAndLowerCase}}</dd>\n" +
    "                        <dt translate>GENERAL.CUSTOMER_INFO.POLICYHOLDER</dt>\n" +
    "                        <dd id=\"policyHolderName\">{{policyHolder.fullName | capitalAndLowerCase}}</dd>\n" +
    "                    </dl>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <h3 class=\"u-typography-4\" translate>VIEW.SECTIONS.OFFER.STP.CALCULATION_HEADER</h3>\n" +
    "\n" +
    "        <table class=\"standard-table standard-table--fixed standard-table--summary standard-table--calculation\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"row in offerModel.calculation track by $index\">\n" +
    "                    <th>{{row.description}}</th>\n" +
    "                    <td  ng-if=\"row.type === '+' || row.type === '-'\">\n" +
    "                        <span id=\"info{{$index}}\" ng-if=\"row.type === '-'\"> -</span>\n" +
    "                        <span id=\"info{{$index}}\" ng-if=\"row.type === '+'\"> </span>\n" +
    "                        {{row.value | currency : undefined : 0}}\n" +
    "                    </td>\n" +
    "                    <td id=\"info{{$index}}\" ng-if=\"row.type === 'text'\" translate>\n" +
    "                        {{row.value}}\n" +
    "                    </td>\n" +
    "                    <td id=\"info{{$index}}\" ng-if=\"row.type === 'st'\" translate>\n" +
    "                        {{row.value}} st\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </tbody>\n" +
    "            <tfoot>\n" +
    "                <tr>\n" +
    "                    <th translate>VIEW.SECTIONS.OFFER.STP.PAYMENT_HEADING</th>\n" +
    "                    <td>{{offerModel.compensation | currency : undefined : 0}}</td>\n" +
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
    "            <fsm-question-group questions=\"group.questions\" ng-repeat=\"group in questionGroups\"></fsm-question-group>\n" +
    "        </div>\n" +
    "        <div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "            <button class=\"button button--primary u-spacing-above-narrow u-spacing-under-narrow u-no-transition\"\n" +
    "                    id=\"offerConfirmationYes\"\n" +
    "                    ng-show=\"acceptanceQuestion.answer !== 'NO'\"\n" +
    "                    ng-click=\"confirmOffer();\"\n" +
    "                    translate>VIEW.SECTIONS.OFFER.STP.CONFIRM_OFFER\n" +
    "            </button>\n" +
    "            <button class=\"button button--primary u-spacing-above-narrow u-spacing-under-narrow u-no-transition\"\n" +
    "                    ng-show=\"acceptanceQuestion.answer === 'NO'\"\n" +
    "                    id=\"offerConfirmationNo\"\n" +
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
    "<div class=\"u-bgcolor-blue-5 u-small-type\"  id=\"slidedown-wrapper-offerRejected\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-padding-above\">\n" +
    "\n" +
    "            <h3 class=\"u-typography-2 u-spacing-under-narrow\" translate>VIEW.SECTIONS.OFFER.STP.THANKS_NO.HEADER</h3>\n" +
    "\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate translate-values=\"{compensation: (offerModel.compensation | currency : undefined : 0), claimId: offerModel.getClaimId()}\">VIEW.SECTIONS.OFFER.STP.THANKS_NO.INFO_REJECTED_CONTACT_CLAIM_ID</p>\n" +
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
    "                    <ng-include src=\"'offer/common/policereport.tpl.html'\"></ng-include>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "    <button class=\"button u-spacing-above-narrow u-spacing-under-narrow js-print\" ng-click=\"print();\"><i class=\"icon icon-print\"></i> {{'VIEW.SECTIONS.OFFER.STP.PRINT' | translate}}</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("offer/stp/thanks.yes.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/stp/thanks.yes.tpl.html",
    "<div class=\"u-bgcolor-blue-5 u-small-type\"  id=\"slidedown-wrapper-offerAccepted\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-padding-above\">\n" +
    "\n" +
    "            <h3 class=\"u-typography-2 u-spacing-under-narrow\" translate>VIEW.SECTIONS.OFFER.STP.THANKS_YES.HEADER</h3>\n" +
    "\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate translate-values=\"{compensation: (offerModel.compensation | currency : undefined : 0), claimId: offerModel.getClaimId()}\">VIEW.SECTIONS.OFFER.STP.THANKS_YES.INFO_PAYMENT_CLAIM_ID</p>\n" +
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
    "                    <ng-include src=\"'offer/common/policereport.tpl.html'\"></ng-include>\n" +
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
