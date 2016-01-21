"use strict";
angular.module('stpCommon.contact', ['fsmQuestion'])
    .factory('ContactService', ['QuestionService', 'QuestionTypes', 'CountryCodeService', function(QuestionService, QuestionTypes, CountryCodeService) {
        var QBuilder = QuestionService.getQuestionBuilder();
        var questionsCreated = false;

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
            groups.push(createGroup([QuestionService.getQuestion('contactPhone')]));
            groups.push(createGroup([QuestionService.getQuestion('contactEmail')]));
            QuestionService.getQuestion('contactPhone').options = CountryCodeService.getCountryCodes();
            return groups;
        }

        function createGroup(questions){
            return {questions: questions};
        }

        function createQuestions(){
            if (!questionsCreated) {
                //contactCountry();
                contactPhone();
                contactEmail();
                questionsCreated = true;
            }
        }

        //function contactCountry() {
        //    return QBuilder
        //        .id('contactCountry')
        //        .type(QuestionTypes.select)
        //        .text({ root: 'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_PHONE'})
        //        .required(false)
        //        .createQuestion();
        //}

        function contactPhone() {
            function isSwedenAndZeroOrOtherAndBlank(question){
                var answer = question.answer;
                return (answer.countryCode.code === 'SWE' && answer.phoneNumber === '0') ||
                    (answer.countryCode.code !== 'SWE' && answer.phoneNumber === '');
            }
            var phoneValidator = {
                validate: function(question){
                    var result = {valid: true, cause: 'format', message: question.textRoot+'.ERRORS.FORMAT'};
                    if(!isSwedenAndZeroOrOtherAndBlank(question)) {
                        result.valid = QuestionUtils.isNumeric(question.answer.phoneNumber.replace(/^[\s\.\-]*$/, ''));
                    }
                    return result;
                }
            };

            return QBuilder
                .id('contactPhone')
                .type(QuestionTypes.phone)
                .text({ root:'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_PHONE'})
                .max(30)
                .required(false)
                .validator(phoneValidator)
                .createQuestion();
        }

        function contactEmail() {
            var emailValidator = {
                validate: function(question){
                    var emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
                    var result = {valid: true, cause: 'format', message: question.textRoot+'.ERRORS.FORMAT'};
                    result.valid = emailRegex.test(question.answer);
                    return result;
                }
            };

            return QBuilder
                .id('contactEmail')
                .type(QuestionTypes.input)
                .text({ root: 'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_EMAIL' })
                .placeholder('ditt.namn@exempel.se')
                .max(254)
                .required(true)
                .validator(emailValidator)
                .createQuestion();
        }

        var service = {
            getQuestionGroups: getQuestionGroups,
            validate: validate
        };
        return service;

    }]);