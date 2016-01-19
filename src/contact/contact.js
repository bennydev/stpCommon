"use strict";
angular.module('stpCommon.contact', ['fsmQuestion'])
    .factory('ContactService', ['QuestionService', 'QuestionTypes', 'Validators', function(QuestionService, QuestionTypes, Validators) {
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
                .text({ rott: 'VIEW.SECTIONS.CONTACT.QUESTIONS.CONTACT_COUNTRY'})
                .required(false)
                .createQuestion();
        }

        function contactPhone() {
            return QBuilder
                .id('contactPhone')
                .type(QuestionTypes.input)
                .text({ root:'VIEW.SECTIONS.CONTACT.QUESTIONS.CONTACT_PHONE'})
                .required(false)
                .createQuestion();
        }

        function contactEmail() {
            return QBuilder
                .id('contactEmail')
                .type(QuestionTypes.input)
                .placeholder('OPTIONS.PLACE_HOLDER_EMAIL')
                .required(true)
                .createQuestion();
        }

        var service = {
            getQuestionGroups: getQuestionGroups,
            validate: validate
        };
        return service;

    }]);