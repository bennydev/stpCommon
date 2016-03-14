(function () {
    'use strict';

    angular.module('stpCommon.util').factory('VersionRestService', VersionRestService);
    var httpConfig = {timeout: 10000};
    VersionRestService.$inject = ['$resource'];

    function VersionRestService($resource) {

        return $resource('resources', httpConfig, {
            'applicationVersion': {
                method: 'get',
                url: 'resources/system/applicationVersion',
                isArray: false
            }
        });
    }
})();