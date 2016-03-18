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