"use strict";
describe('Contact Service tests.', function () {
    beforeEach(module('stpCommon.contact'));


    it('Should have a ContactService.', inject(function(ContactService) {
        expect(ContactService).toBeTruthy();
    }));


    it('Should able able to set country code and phone number.', inject(function(ContactService) {
        var contactGroups = ContactService.getQuestionGroups();
        var phone = contactGroups[0].questions[0];
        expect(phone.id).toBe('contactPhone');

        phone.answer.countryCode = '00381';
        expect(phone.answer.countryCode).toBe('00381');

        phone.answer.phoneNumber = '73123456789';
        expect(phone.answer.phoneNumber).toBe('73123456789');
    }));
    it('Should able able to set country code and too long phone number.', inject(function(ContactService) {
        var contactGroups = ContactService.getQuestionGroups();
        var phone = contactGroups[0].questions[0];
        expect(phone.id).toBe('contactPhone');

        phone.answer.countryCode = '00381';
        expect(phone.answer.countryCode).toBe('00381');

        phone.answer.phoneNumber = '73123456789012345678901234567890123456';
        expect(phone.answer.phoneNumber).toBe('73123456789012345678901234567890123456');
        var result = phone.restrictions.getValidator().validate(phone);
        expect(result.valid).toBe(false);
    }));

    it('Should able able to validate country code and phone number.', inject(function(ContactService) {
        var contactGroups = ContactService.getQuestionGroups();
        var phone = contactGroups[0].questions[0];
        expect(phone.id).toBe('contactPhone');

        phone.answer.countryCode = '00381';
        expect(phone.answer.countryCode).toBe('00381');
        var result = phone.restrictions.getValidator().validate(phone);
        expect(result.valid).toBe(true);
        phone.answer.phoneNumber = '073123456789';
        phone.answer.countryCode = '0046';
        expect(phone.answer.phoneNumber).toBe('073123456789');
    }));
    it('Should able able to validate phone number.', inject(function(ContactService) {
        var contactGroups = ContactService.getQuestionGroups();
        var phone = contactGroups[0].questions[0];
        phone.answer.phoneNumber = '073-123456789';
        phone.answer.countryCode = '0046';
        expect(phone.answer.phoneNumber).toBe('073-123456789');
        var result = phone.restrictions.getValidator().validate(phone);
        expect(result.valid).toBe(true);
    }));

    it ('Should be able to set email address.', inject(function(ContactService) {
        var contactGroups = ContactService.getQuestionGroups();
        var email = contactGroups[1].questions[0];
        var validator =  email.restrictions.getValidator();
        email.answer = 'aaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbb';
        expect(email.answer).toBe('aaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbb');
        var result = validator.validate(email);
        expect(result.valid).toBe(true);

        email.answer = 'aaaaaaaaaa..aaaaaaaaaaa@bbbbbbbbbbbbbbbbbb';
        result = validator.validate(email);
        expect(result.valid).toBe(false);

        email.answer = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
        result = validator.validate(email);
        expect(result.valid).toBe(false);

        email.answer = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
        result = validator.validate(email);
        expect(result.valid).toBe(true);
    }));
});