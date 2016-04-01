'use strict';
angular.module('stpCommon.util')
.factory('BroadcastService', ['$rootScope', function($rootScope) {
    return {
        send: function(msg, data) {
            $rootScope.$broadcast(msg, data);
        }
    };
}]);