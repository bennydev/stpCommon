"use strict";
describe('format filter tests.', function () {


    beforeEach(module('stpCommon.header'));

    it('should format first name properly', inject(function (capitalAndLowerCaseFilter) {
        var name = 'CARL-JAN';
        var result = capitalAndLowerCaseFilter(name);
        expect(result).toBe('Carl-Jan');
    }));
    it('should format last name properly', inject(function (capitalAndLowerCaseFilter) {
        var name = 'AXELSSON JOHNSON';
        var result = capitalAndLowerCaseFilter(name);
        expect(result).toBe('Axelsson Johnson');
    }));
    it('should not format empty name properly', inject(function (capitalAndLowerCaseFilter) {
        var name = '';
        var result = capitalAndLowerCaseFilter(name);
        expect(result).toBe('');
    }));

});