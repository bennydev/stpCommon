(function () {
    'use strict';

    angular.module('stpCommon.util').factory('VersionRestService', VersionRestService);

    VersionRestService.$inject = ['$resource'];

    function VersionRestService($resource) {
        return $resource('resources', null, {
            'applicationVersion': {
                method: 'get',
                url: 'resources/system/applicationVersion',
                isArray: false
            }
        });
    }
})();