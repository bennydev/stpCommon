(function () {
    "use strict";

    angular.module('stpCommon.util', ['fsmQuestion', 'pascalprecht.translate', 'ngResource'])
        .factory('StpUtils', StpUtils);

    StpUtils.$inject = ['TransactionIdGenerator', 'FsmScroll', 'EnvironmentService', 'BroadcastService', 'ErrorTrackService', 'AirportList'];
    function StpUtils(TransactionIdGenerator, FsmScroll, EnvironmentService, BroadcastService, ErrorTrackService, AirportList) {
        var utils = {};

        utils.transactionIdGenerator = TransactionIdGenerator;
        utils.fsmScroll = FsmScroll;
        utils.environmentService = EnvironmentService;
        utils.broadcastService = BroadcastService;
        utils.errorTrackService = ErrorTrackService;
        utils.airportList = AirportList;

        return utils;
    }
})();