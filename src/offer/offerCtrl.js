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
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName() ? HeaderService.getPolicyHolderFullName() : HeaderService.getPolicyHolderPersonId()};
        $scope.acceptanceQuestion = QuestionService.getQuestionBuilder()
            .id('acceptance')
            .text({root:'VIEW.SECTIONS.OFFER.STP.QUESTIONS.ACCEPTANCE', getTranslateValues: function(){return {compensation: $scope.offerModel.compensation};}})
            .type('buttongroupbig')
            .values([{label: 'OPTIONS.YES', value: 'YES'}, {label: 'OPTIONS.NO', value: 'NO'}])
            .required(true)
            .createQuestion();
        $scope.confirmOffer = function(){
            $scope.acceptanceQuestion.validate();
            if(!ErrorReporter.hasErrors()){
                $scope.thankYouTemplate = $scope.acceptanceQuestion.answer === 'YES' ? 'offer/stp/thanks.yes.tpl.html' : 'offer/stp/thanks.no.tpl.html';
            }
        };
        $scope.print = function(){
            $window.print();
        };
    }]);