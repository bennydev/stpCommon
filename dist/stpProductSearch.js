"use strict";
angular.module('stpCommon.productSearch', []).factory('SearchService', ['$http', '$q', function ($http, $q) {
    var currentContext;
    var baseUrl;
    var requestConfig = {timeout: 7000};
    var defaultFilterProducts = defaultFilterProducts;
    var defaultInitialDataLoader = {
        getInitValues: defaultGetInitValues
    };


    function getContext() {
        return currentContext;
    }

    function getInitValues() {
        if (currentContext) {
            return currentContext.initialDataLoader.getInitValues(currentContext);
        } else {
            throw new Error('getInitValues(): context must be initialized before init values can be retrieved.');
        }
    }

    function defaultGetInitValues() {
        return getBaseUrl().then(function (baseUrl) {
            var url = baseUrl + currentContext.uri;
            return $http.get(url, requestConfig).then(
                initValuesSuccess,
                promiseError
            );
        });
    }

    function initValuesSuccess(response) {
        if (typeof response.data === 'object') {
            var values = [];
            currentContext.productsCache = response.data;
            var data = currentContext.getRelevantData(response.data);
            data.forEach(function (object) {
                var value = object[currentContext.initParam];
                var uri = object.products;
                currentContext.productUriMap[value] = uri;
                values.push(value);
            });

            return values;
        } else {
            return promiseError(response);
        }
    }

    function getMatchingProducts(products) {
        function getMatches(param, value, products) {
            return products.filter(function (product) {
                return ('' + product[param]).toString() === ('' + value).toString();
            });
        }

        var searchValues = currentContext.searchValues;
        Object.keys(searchValues).forEach(function (param) {
            products = getMatches(param, searchValues[param], products);
        });
        return products;
    }

    function getProductsSuccess(response) {
        if (typeof response.data === 'object') {
            currentContext.products = response.data;
            return currentContext.products;
        } else {
            return promiseError(response);
        }
    }

    function getProducts() {
        if (currentContext.products.length === 0) {
            console.log('No products, new REST call.');
            var value = currentContext.searchValues[currentContext.initParam];
            var productsUri = currentContext.productUriMap[value];

            return $http.get(baseUrl + productsUri, requestConfig).then(
                getProductsSuccess,
                promiseError
            );
        } else {
            return $q.resolve(currentContext.products);
        }
    }

    function filterProducts() {
        return currentContext.filterProducts();
    }

    function defaultFilterProducts() {
        return getProducts().then(
            getMatchingProducts,
            promiseError
        );
    }


    function getBaseUrl() {
        return $http.get(currentContext.objectSearchUri, requestConfig).then(
            baseUrlSuccess,
            baseUrlError
        );
    }

    function baseUrlSuccess(obj) {
        baseUrl = obj.data.value;
        return $q.resolve(obj.data.value);
    }

    function baseUrlError(error) {
        return promiseError(error);
    }

    function promiseError(response) {
        return $q.reject(response);
    }

     function search(param, value){
        currentContext.searchValues[param] = value;
        return filterProducts();
    }

    function getValuesSuccess(products, param){
        var values = {};
        products = currentContext.getRelevantData(products);
        products.forEach(function(product){
            var value = product[param];
            values[value] = value;
        });
        return Object.keys(values);
    }

    function defaultGetValuesForParam(param){
        return filterProducts().then(
            function(products){return getValuesSuccess(products, param);},
            promiseError
        );
    }

    function getValuesForParam(param) {
        return currentContext.getValuesForParam(param);
    }

    function resetSearch(){
        currentContext.searchValues = {};
        currentContext.products = [];
    }

    function getContextBuilder() {
        var context = {
            productsCache: [],
            productUriMap: {},
            products: [],
            initParam: '',
            searchValues: {},
            params: '',
            uri: '',
            objectSearchUri: '',
            filterProducts: defaultFilterProducts,
            getValuesForParam: defaultGetValuesForParam,
            initialDataLoader: defaultInitialDataLoader,
            getRelevantData: function (data) {
                return data;
            }
        };
        return {
            initParam: function (initParam) {
                context.initParam = initParam;
                return this;
            },
            params: function (params) {
                context.params = params;
                return this;
            },
            uri: function (uri) {
                context.uri = uri;
                return this;
            },
            objectSearchUri: function (objectSearchUrl) {
                context.objectSearchUri = objectSearchUrl;
                return this;
            },
            filterProducts: function (filterProducts) {
                context.filterProducts = filterProducts;
                return this;
            },
            initialDataLoader: function (initialDataloader) {
                context.initialDataLoader = initialDataloader;
                return this;
            },
            getValuesForParam: function (getValuesForParam) {
                context.getValuesForParam = getValuesForParam;
                return this;
            },
            getRelevantData: function (getRelevantData) {
                context.getRelevantData = getRelevantData;
                return this;
            },
            createContext: function () {
                if (!(context.initParam && context.params && context.uri && context.objectSearchUri &&
                    context.filterProducts && context.initialDataLoader && context.getRelevantData)) {
                    throw new Error('ContextBuilder: Context was not initialized correctly.' +
                        ' Make sure you have set all mandatory fields.')
                }
                currentContext = context;
                return currentContext;
            }
        }
    }
    return {
        getContext: getContext,
        getBaseUrl: getBaseUrl,
        getInitValues: getInitValues,
        getValuesForParam: getValuesForParam,
        getMatchingProducts: filterProducts,
        search: search,
        resetSearch: resetSearch,
        getContextBuilder: getContextBuilder
    };

}]);