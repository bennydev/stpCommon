"use strict";
angular.module('stpCommon.util', []).factory('StpUtils', ['TransactionIdGenerator','FsmScroll', function(TransactionIdGenerator, FsmScroll) {
   var utils = {};

    utils.transactionIdGenerator = TransactionIdGenerator;
    utils.fsmScroll = FsmScroll;

    return utils;
}]);