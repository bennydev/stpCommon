"use strict";
angular.module('stpCommon.contact').factory('ContactSummaryMapper', ['$translate', 'QuestionService', function($translate, QuestionService) {

    function mapToSummaryModel(){
        var summaryModel = {header: $translate.instant('VIEW.SECTIONS.EVENT.CONTACT_INFO.TITLE'), questions: []};
        var phone = getMobileNumberSummary(QuestionService.getQuestion('contactPhone'));
        var email = getEmailSummary(QuestionService.getQuestion('contactEmail'));
        if(phone){
            summaryModel.questions.push(phone);
        }
        summaryModel.questions.push(email);
        return summaryModel;
    }

    function formatPhoneNumber(number){
        return(number.charAt(0) === '0' ? '(0) '+ number.slice(1) : number);
    }

    function getMobileNumberSummary(mobileQuestion){
        var number = mobileQuestion.answer.phoneNumber;
        if(number && number !== '0') {
            return {
                question: $translate.instant('VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_PHONE'),
                answer: mobileQuestion.answer.countryCode.phoneCode + ' ' + formatPhoneNumber(number)
            };
        }
    }

    function getEmailSummary(emailQuestion){
        return {
            question: $translate.instant('VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_EMAIL'),
            answer: emailQuestion.answer
        };
    }

    return {mapToSummaryModel: mapToSummaryModel};

}]);