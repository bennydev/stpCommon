"use strict";
angular.module('stpCommon.util', ['fsmQuestion', 'pascalprecht.translate'])
    .factory('StpUtils', ['TransactionIdGenerator','FsmScroll','EnvironmentService', 'BroadcastService', 'ErrorTrackService', function(TransactionIdGenerator, FsmScroll, EnvironmentService, BroadcastService, ErrorTrackService) {
   var utils = {};

    utils.transactionIdGenerator = TransactionIdGenerator;
    utils.fsmScroll = FsmScroll;
    utils.environmentService = EnvironmentService;
    utils.broadcastService = BroadcastService;
    utils.errorTrackService = ErrorTrackService;

    return utils;
}]);