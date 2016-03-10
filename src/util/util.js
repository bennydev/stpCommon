(function () {
    "use strict";

    angular.module('stpCommon.util', ['fsmQuestion', 'pascalprecht.translate', 'ngResource'])
        .factory('StpUtils', StpUtils);

    StpUtils.$inject = ['TransactionIdGenerator', 'FsmScroll', 'EnvironmentService', 'BroadcastService', 'ErrorTrackService', 'AirportList', 'VersionRestService'];
    function StpUtils(TransactionIdGenerator, FsmScroll, EnvironmentService, BroadcastService, ErrorTrackService, AirportList, VersionRestService) {
        var utils = {};

        utils.transactionIdGenerator = TransactionIdGenerator;
        utils.fsmScroll = FsmScroll;
        utils.environmentService = EnvironmentService;
        utils.broadcastService = BroadcastService;
        utils.errorTrackService = ErrorTrackService;
        utils.airportList = AirportList;
        utils.versionRestService = VersionRestService;

        return utils;
    }
})();