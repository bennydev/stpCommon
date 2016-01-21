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
            groups.push(createGroup([QuestionService.getQuestion('contactCountry'), QuestionService.getQuestion('contactPhone')]));
            groups.push(createGroup([QuestionService.getQuestion('contactEmail')]));
            QuestionService.getQuestion('contactCountry').options = CountryCodeService.getCountryCodes();
            return groups;
        }

        function createGroup(questions){
            return {questions: questions};
        }

        function createQuestions(){
            if (!questionsCreated) {
                contactCountry();
                contactPhone();
                contactEmail();
                questionsCreated = true;
            }
        }

        function contactCountry() {
            return QBuilder
                .id('contactCountry')
                .type(QuestionTypes.select)
                .text({ root: 'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_PHONE'})
                .required(false)
                .createQuestion();
        }

        function contactPhone() {
            return QBuilder
                .id('contactPhone')
                .type(QuestionTypes.input)
                .text({ root:'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_PHONE'})
                .max(30)
                .required(false)
                .createQuestion();
        }

        function contactEmail() {
            return QBuilder
                .id('contactEmail')
                .type(QuestionTypes.input)
                .text({ root: 'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_EMAIL' })
                .placeholder('ditt.namn@exempel.se')
                .max(254)
                .required(true)
                .createQuestion();
        }

        var service = {
            getQuestionGroups: getQuestionGroups,
            validate: validate
        };
        return service;

    }]);