"use strict";
angular.module('stpCommon.util', []).factory('StpUtils', ['TransactionIdGenerator','FsmScroll','EnvironmentService', function(TransactionIdGenerator, FsmScroll, EnvironmentService) {
   var utils = {};

    utils.transactionIdGenerator = TransactionIdGenerator;
    utils.fsmScroll = FsmScroll;
    utils.environmentService = EnvironmentService;

    return utils;
}]);