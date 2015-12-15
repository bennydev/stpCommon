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
        $scope.customer = {fullName: HeaderService.getCustomerFullName()};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName()};
        $scope.acceptanceQuestion = QuestionService.getQuestionBuilder()
            .id('acceptance')
            .text({root:'VIEW.SECTIONS.OFFER.STP.QUESTIONS.ACCEPTANCE', translateValues: {compensation: '1000'}})
            .type('buttongroup')
            .values([{label: 'VIEW.OPTIONS.YES', value: 'YES'}, {label: 'VIEW.OPTIONS.NO', value: 'NO'}])
            .required(true)
            .createQuestion();
        $scope.confirmOffer = function(){
            if(!ErrorReporter.hasErrors()){
                $scope.thankYouTemplate = 'offer/stp/thanks.tpl.html';
            }
        };
    }]);