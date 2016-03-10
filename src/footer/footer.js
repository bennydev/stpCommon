(function () {
    'use strict';

    angular.module('stpCommon.footer', ['stpCommon.util'])
        .controller('FooterCtrl', FooterController);

    FooterController.$inject = ['$scope', '$log', 'StpUtils'];

    function FooterController($scope, $log, StpUtils) {
        $scope.environments = StpUtils.environmentService.getEnvironments();
        $scope.currentEnvironment = StpUtils.environmentService.getCurrentEnvironment();
        function getApplicationVersion() {
            StpUtils.versionRestService.applicationVersion(function (data) {
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