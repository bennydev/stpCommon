(function () {
    'use strict';

    angular.module('stpCommon.footer', ['stpCommon.util'])
        .controller('FooterCtrl', FooterController);

    FooterController.$inject = ['$scope', '$log', '$http'];

    function FooterController($scope, $log, StpUtils) {
        var httpConfig = {timeout: 10000};
        $scope.environments = StpUtils.environmentService.getEnvironments();
        $scope.currentEnvironment = StpUtils.environmentService.getCurrentEnvironment();
        function getApplicationVersion() {
            $http.get('resources/system/applicationVersion', httpConfig).then(function (data) {
                $scope.name = data.name;
                $scope.version = data.version;
                $scope.environment = data.environment;
                $scope.buildNumber = data.buildNumber;
                $scope.integrationInfoList = data.integrationInfoList;
            });
        }

        getApplicationVersion();
    }

}());