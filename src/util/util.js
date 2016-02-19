"use strict";
angular.module('stpCommon.util', []).factory('StpUtils', ['TransactionIdGenerator','FsmScroll','EnvironmentService', 'BroadcastService', function(TransactionIdGenerator, FsmScroll, EnvironmentService, BroadcastService) {
   var utils = {};

    utils.transactionIdGenerator = TransactionIdGenerator;
    utils.fsmScroll = FsmScroll;
    utils.environmentService = EnvironmentService;
    utils.broadcastService = BroadcastService;

    return utils;
}]);