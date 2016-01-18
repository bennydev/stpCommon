"use strict";
angular.module('stpCommon.util', []).factory('StpUtils', ['TransactionIdGenerator', function(TransactionIdGenerator) {
   var utils = {};

    utils.transactionIdGenerator = TransactionIdGenerator;

    return utils;
}]);