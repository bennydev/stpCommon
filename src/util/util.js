"use strict";
angular.module('stpCommon.util', []).factory('StpUtils', ['TransactionIdGenerator','fsmScroll', function(TransactionIdGenerator, fsmScroll) {
   var utils = {};

    utils.transactionIdGenerator = TransactionIdGenerator;
    utils.fsmScroll = fsmScroll;

    return utils;
}]);