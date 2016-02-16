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