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
"use strict";
angular.module('stpCommon.util')
.factory('AirportList',['$translate', function($translate){
    var swedishAirports = [
        {city: 'Arlanda', name: 'Stockholm Arlanda Airport', iata: 'ARN', group: 1},
        {city: 'Arvidsjaur', name: 'Arvidsjaur flygplats', iata: 'AJR', group: 7},
        {city: 'Borlänge', name: 'Dala Airport', iata: 'BLE', group: 7},
        {city: 'Bromma', name: 'Stockholm-Bromma flygplats', iata: 'BMA', group: 7},
        {city: 'Gällivare', name: 'Gällivare Lapland Airport', iata: 'GEV', group: 7},
        {city: 'Gävle', name: 'Gävle flygplats', iata: 'GVX', group: 7},
        {city: 'Göteborg', name: 'Göteborg City Airport', iata: 'GSE', group: 7},
        {city: 'Göteborg', name: 'Göteborg-Landvetter Airport', iata: 'GOT', group: 3},
        {city: 'Hagfors', name: 'Hagfors flygplats', iata: 'HFS', group: 7},
        {city: 'Halmstad', name: 'Halmstad City Airport', iata: 'HAD', group: 7},
        {city: 'Hemavan-Tärnaby', name: 'Hemavan Tärnaby Airport', iata: 'HMV', group: 7},
        {city: 'Hultsfred', name: 'Hultsfred-Vimmerby Airport', iata: 'HLF', group: 7},
        {city: 'Jönköping', name: 'Jönköping Airport', iata: 'JKG', group: 7},
        {city: 'Kalmar', name: 'Kalmar Öland Airport', iata: 'KLR', group: 7},
        {city: 'Karlstad', name: 'Karlstad Airport', iata: 'KSD', group: 7},
        {city: 'Kiruna', name: 'Kiruna Airport', iata: 'KRN', group: 7},
        {city: 'Kramfors-Sollefteå', name: 'Höga Kusten Airport', iata: 'KRF', group: 7},
        {city: 'Kristianstad', name: 'Kristianstad Österlen Airport', iata: 'KID', group: 7},
        {city: 'Köpenhamn', name: 'Københavns Lufthavn, Kastrup', iata: 'CPH', group: 2},
        {city: 'Linköping', name: 'Linköping City Airport', iata: 'LPI', group: 7},
        {city: 'Luleå', name: 'Luleå Airport', iata: 'LLA', group: 7},
        {city: 'Lycksele', name: 'Lycksele flygplats', iata: 'LYC', group: 7},
        {city: 'Malmö', name: 'Malmö Airport', iata: 'MMX', group: 5},
        {city: 'Mora', name: 'Mora-Siljan flygplats', iata: 'MXX', group: 7},
        {city: 'Norrköping', name: 'Norrköping flygplats', iata: 'NRK', group: 7},
        {city: 'Oskarshamn', name: 'Oskarshamn Airport', iata: 'OSK', group: 7},
        {city: 'Oslo', name: 'Oslo Lufthavn, Gardermoen', iata: 'OSL', group: 6},
        {city: 'Pajala', name: 'Pajala Airport', iata: 'PJA', group: 7},
        {city: 'Ronneby', name: 'Ronneby Airport', iata: 'RNB', group: 7},
        {city: 'Skavsta', name: 'Stockholm Skavsta Airport', iata: 'NYO', group: 4},
        {city: 'Skellefteå', name: 'Skellefteå Airport', iata: 'SFT', group: 7},
        {city: 'Skövde', name: 'Skövde Flygplats', iata: 'KVB', group: 7},
        {city: 'Storuman', name: 'Storumans flygplats', iata: 'SQO', group: 7},
        {city: 'Sundsvall-Timrå', name: 'Sundsvall Timrå Airport', iata: 'SDL', group: 7},
        {city: 'Sveg', name: 'Härjedalen Sveg Airport', iata: 'EVG', group: 7},
        {city: 'Torsby', name: 'Torsby flygplats', iata: 'TYF', group: 7},
        {city: 'Trollhättan-Vänersborg', name: 'Trollhättan-Vänersborgs flygplats', iata: 'THN', group: 7},
        {city: 'Umeå', name: 'Umeå Airport', iata: 'UME', group: 7},
        {city: 'Vilhelmina', name: 'Vilhelmina South Lapland Airport', iata: 'VHM', group: 7},
        {city: 'Visby', name: 'Visby Airport', iata: 'VBY', group: 7},
        {city: 'Västerås', name: 'Stockholm-Västerås flygplats', iata: 'VST', group: 7},
        {city: 'Växjö', name: 'Småland Airport', iata: 'VXO', group: 7},
        {city: 'Åre-Östersund', name: 'Åre Östersund Airport', iata: 'OSD', group: 7},
        {city: 'Ängelholm-Helsingborg', name: 'Ängelholm-Helsingborg Airport', iata: 'AGH', group: 7},
        {city: 'Örebro', name: 'Örebro flygplats', iata: 'ORB', group: 7},
        {city: 'Örnsköldsvik', name: 'Örnsköldsvik Airport', iata: 'OER', group: 7},
        {city: 'LIST.AIRPORT_NAME.IATA.OTHER', name: 'LIST.AIRPORT_NAME.IATA.OTHER', iata: 'OTHER', group: 8}
    ];

    return {
        getSwedishAirports: function () {
            swedishAirports.forEach(function (airport) {
                airport.name = $translate.instant(airport.name);
            });
            return swedishAirports;
        }
    };
}]);
'use strict';
angular.module('stpCommon.util')
.factory('BroadcastService', ['$rootScope', function($rootScope) {
    return {
        send: function(msg, data) {
            $rootScope.$broadcast(msg, data);
        }
    }
}]);
'use strict';
angular.module('stpCommon.util')
    .factory('EnvironmentService', ['$window', function($window){
        var environmentService = {};
        environmentService.getEnvironments = getEnvironments;
        environmentService.getCurrentEnvironment = getCurrentEnvironment;

        function getEnvironments(){
            return {
                'LOCAL': 'LOCAL',
                'STST': 'STST',
                'ATST': 'ATST',
                'PROD': 'PROD'
            };
        }

        function getCurrentEnvironment(){
            var hostname = $window.location.hostname.toLowerCase();
            var environments = environmentService.getEnvironments();
            var currentEnvironment;
            if(hostname.indexOf('localhost') >= 0 ||
                hostname.indexOf('bcl') >= 0 ||
                hostname.indexOf('bcd') >= 0) {
                currentEnvironment = environments.LOCAL;
            } else if(hostname.indexOf('.stst.')) {
                currentEnvironment = environments.STST;
            } else if(hostname.indexOf('.atst.')) {
                currentEnvironment = environments.ATST;
            } else if(hostname === 'www.folksam.se' || hostname === 'folksam.se'){
                currentEnvironment = environments.PROD;
            }
            return currentEnvironment;
        }

        return environmentService;
    }]);
"use strict";
angular.module('stpCommon.util')
    .factory('FsmScroll', ['$timeout', function ($timeout) {

        var fsmScroll = {
            scrollToFirstError : scrollToFirstError,
            scrollTo : scrollTo
        };

        function scrollToFirstError() {
            $timeout(function () {
                var $el = $('.fsm-invalid:not(form)').eq(0);
                if ($el.attr('type') === 'hidden') {
                    $el = $el.parent().find('button:eq(0)');
                }
                var offset = $el.parent().offset();
                if (offset) {
                    $('html, body').animate({
                        scrollTop: offset.top - 70
                    }, 250, function () {
                        $el.focus();
                    });
                }
            }, 250);
        }

        function scrollTo(element){
            $timeout(function () {
                $('html, body').animate({
                    scrollTop: typeof element === "number" ? element : element.offset().top
                    //scrollTop: element.length > 0 ? element.offset().top : 0
                }, 250);
            }, 250);
        }
        return fsmScroll;
    }]);


'use strict';
angular.module('stpCommon.util')
    .factory('ErrorTrackService', ['$window', '$log', '$translate', 'ErrorReporter', function($window, $log, $translate, ErrorReporter){
        var service = {
            trackErrors : function(){
                var errorObj = ErrorReporter.getErrors();
                var errorData = [];
                for(var key in errorObj){
                    errorData.push(key+':'+$translate.instant(errorObj[key]).replace(/,/g, ''));
                }
                $window.datalayer.error_messages = errorData.join(';');
                if($window._satellite) {
                    $window._satellite.track('error_message');
                } else {
                    $log.log($window.datalayer);
                }
            },
            trackModalError : function(errorObj){
                $window.datalayer.error_messages = $translate.instant(errorObj.title) + ":" + $translate.instant(errorObj.message);
                if($window._satellite) {
                    $window._satellite.track('error_message');
                } else {
                    $log.log($window.datalayer);
                }
            },
            trackResume : function(val){
                $window.datalayer.claim_resume = val;
                if($window._satellite) {
                    $window._satellite.track('claim_resume');
                } else {
                    $log.log($window.datalayer);
                }
            },
            deleteErrors : function(){
                delete $window.datalayer.error_messages;
            }
        };
        return service;
    }])
"use strict";
angular.module('stpCommon.util')
    .factory('TransactionIdGenerator', ['EnvironmentService', function (EnvironmentService) {

    var transIdGenerator = {
        crc32FromObject: CRC32FromObject,
        crc32FromString: CRC32,
        setTransactionId: setTransactionId
    };

    return transIdGenerator;

    function setTransactionId(){
        var current = new Date().getTime();
        var random = Math.floor((Math.random() * 1000) + 1);
        if (EnvironmentService.getCurrentEnvironment() === "PROD") {
            return current+random;
        } else {
            return EnvironmentService.getCurrentEnvironment()+current+random;
        }
    }

    function CRC32FromObject(object) {
        return CRC32(JSON.stringify(object));
    }
    function CRC32(string) {
        return crc32ComputeString(0x04C11DB7, string);
    }

    function crc32ComputeString(polynomial, str) {
        var crc = 0;
        var table = crc32Generate(polynomial);
        var i;

        crc = crc32Initial();

        for (i = 0; i < str.length; i++) {
            crc = (crc >>> 8) ^ table[str.charCodeAt(i) ^ (crc & 0x000000FF)];
        }
        crc = crc32Final(crc);
        return crc;
    }

    /*
     * JavaScript CRC-32 implementation
     */

    function crc32Generate(polynomial) {
        var table = [];
        var i, j, n;

        for (i = 0; i < 256; i++) {
            n = i;
            for (j = 8; j > 0; j--) {
                if ((n & 1) == 1) {
                    n = (n >>> 1) ^ polynomial;
                } else {
                    n = n >>> 1;
                }
            }
            table[i] = n;
        }

        return table;
    }

    function crc32Initial() {
        return 0xFFFFFFFF;
    }

    function crc32Final(crc) {
        crc = ~crc;
        return crc < 0 ? 0xFFFFFFFF + crc + 1 : crc;
    }


    function crc32ComputeBuffer(polynomial, data) {
        var crc = 0;
        var dataView = new DataView(data);
        var table = crc32Generate(polynomial);
        var i;

        crc = crc32Initial();

        for (i = 0; i < dataView.byteLength; i++) {
            crc = (crc >>> 8) ^ table[dataView.getUint8(i) ^ (crc & 0x000000FF)];
        }
        crc = crc32Final(crc);
        return crc;
    }

    function crc32_reversed(polynomial) {
        var reversed = 0;
        var i;
        for (i = 0; i < 32; i++) {
            reversed = reversed << 1;
            reversed = reversed | ((polynomial >>> i) & 1);
        }
        return reversed;
    }

}]);