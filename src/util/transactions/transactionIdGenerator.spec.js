"use strict";
describe('Cyclic redundancy check (CRC) tests.', function() {
    var utils;
    beforeEach(module('stpCommon.util'));

    beforeEach(inject(function($injector) {
        utils = $injector.get('StpUtils');
    }));

    it('should have a utils service.', function () {
        expect(utils).toBeTruthy();
    });

    it ('should be able to generate transaction id as Cyclic Redundancy Code for short strings', function() {
        var crc = utils.transactionIdGenerator.crc32FromString('abc');
        expect(crc).toBeTruthy();
    });
    it ('should be able to generate transaction id as Cyclic Redundancy Code for one char strings', function() {
        var crc = utils.transactionIdGenerator.crc32FromString('c');
        expect(crc).toBeTruthy();
    });
    it ('should be able to generate different transaction id as Cyclic Redundancy Code for short strings', function() {
        var crc = utils.transactionIdGenerator.crc32FromString('abc');
        expect(crc).toBeTruthy();
        var crc2 = utils.transactionIdGenerator.crc32FromString('abd');
        expect(crc).not.toEqual(crc2);
    });
    it ('should be able to generate transaction id as Cyclic Redundancy Code', function() {
        var customer = getCustomerObject();
        var crc = utils.transactionIdGenerator.crc32FromObject(customer);
        expect(crc).toBeTruthy();
    });
    it ('should be able to generate the same transaction id for two objects with the same data', function() {
        var customer = getCustomerObject();
        var crc = utils.transactionIdGenerator.crc32FromObject(customer);

        var crc2 = utils.transactionIdGenerator.crc32FromObject(getCustomerObject());
        expect(crc).toEqual(crc2);
    });
    it ('should be able to generate different transaction ids for two objects with different id', function() {
        var customer = getCustomerObject();
        customer.id = '121212121216';
        var crc = utils.transactionIdGenerator.crc32FromObject(customer);

        var crc2 = utils.transactionIdGenerator.crc32FromObject(getCustomerObject());
        expect(crc).not.toEqual(crc2);
    });
    it ('should be able to generate different transaction ids for two objects with different names', function() {
        var customer = getCustomerObject();
        customer.name = 'Tolvan Eolvansson';
        var crc = utils.transactionIdGenerator.crc32FromObject(customer);
    console.log(crc);
        var crc2 = utils.transactionIdGenerator.crc32FromObject(getCustomerObject());
        expect(crc).not.toEqual(crc2);
    });

    function getCustomerObject() {
        var obj = {};
        obj.id = '121212121212';
        obj.name = 'Tolvan Tolvansson';
        return obj;
    }
});