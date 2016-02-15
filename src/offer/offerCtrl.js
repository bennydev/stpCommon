"use strict";
angular.module('stpCommon.offer', [])
    .controller('OfferCtrl', ['$scope', 'OfferService', function($scope, OfferService){
        $scope.offerModel = OfferService.getOfferModel();
        $scope.template = $scope.offerModel.getClaimType() === 'LTP' ? 'offer/ltp/ltp.tpl.html' : 'offer/stp/stp.tpl.html';
        $scope.claimId = $scope.offerModel.getClaimId();
        $scope.event = $scope.offerModel.getEvent();
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
    .controller('STPCtrl', ['$scope', '$window', 'OfferService', 'HeaderService', 'ErrorReporter', 'QuestionService', 'STPService', function($scope, $window, OfferService, HeaderService, ErrorReporter, QuestionService, STPService){
        $scope.offerModel = OfferService.getOfferModel();
        $scope.customer = {fullName: HeaderService.getCustomerFullName() ? HeaderService.getCustomerFullName() : HeaderService.getCustomer().personId};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName() ? HeaderService.getPolicyHolderFullName() : HeaderService.getPolicyHolder().personId};
        STPService.setCompensation($scope.offerModel.compensation);
        $scope.questionGroups = STPService.getQuestionGroups();
        $scope.acceptanceQuestion = QuestionService.getQuestion('acceptance');
        if(STPService.isOfferConfirmed()){
            $scope.thankYouTemplate = STPService.getThankYouTemplate();
        }

        $scope.confirmOffer = function(){
            STPService.validate();
            if(!ErrorReporter.hasErrors()){
                STPService.confirmOffer();
            }
        };
        $scope.print = function(){
            $window.print();
        };
    }])
    .factory('STPService', ['QuestionService', '$filter', function(QuestionService, $filter){
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