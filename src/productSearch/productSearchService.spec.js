"use strict";
describe('Product Search Service tests.', function() {
    beforeEach(module('stpCommon.productSearch'));

    it('Should be able to get an Error from contextBuilder.', inject(function(SearchService) {
        var contextBuilder = SearchService.getContextBuilder();
        contextBuilder.initParam('model')
            .uri('/folksam/v1/products')
            .objectSearchUri('resource/objectSearchUri');
            expect(contextBuilder.createContext).toThrow();

    }));
    it('Should be able to create a context with contextBuilder.', inject(function(SearchService) {
        var contextBuilder = SearchService.getContextBuilder();
        var context = contextBuilder.initParam('model')
            .uri('/folksam/v1/products')
            .objectSearchUri('resource/objectSearchUri')
            .params({model: 'model'})
            .createContext();
        expect(context.initParam).toBe('model');
        expect(context.objectSearchUri).toBe('resource/objectSearchUri');
        expect(context.params).toEqual({model: 'model'});
    }));
});