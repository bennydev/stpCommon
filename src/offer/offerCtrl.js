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
            getOfferModel: getOfferModel,
            getStandardTemplate: getTemplate
        };
        return service;


        function getTemplate() {
            // replace this if you need another implementation
            return getOfferModel().getClaimType() === 'LTP' ? 'offer/ltp/ltp.tpl.html' : 'offer/stp/stp.tpl.html';
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
        $scope.questionGroups = AbstractSTPService.getQuestionGroups();
        $scope.acceptanceQuestion = QuestionService.getQuestion('acceptance');
        if(AbstractSTPService.isOfferConfirmed()){
            $scope.thankYouTemplate = AbstractSTPService.getThankYouTemplate();
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