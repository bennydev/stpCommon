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
angular.module('stpFooterTemplates', ['footer/footer.tpl.html']);

angular.module("footer/footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer/footer.tpl.html",
    "<!--TODO:\n" +
    " * Make a proper footer.\n" +
    " * Responsive styling.\n" +
    "-->\n" +
    "<div class=\"page-footer\" ng-controller=\"FooterCtrl\">\n" +
    "    <label class=\"h6 text-muted bottom-right\" ng-hide=\"currentEnvironment === environments.PROD\">\n" +
    "        {{name}} v.{{version}} build.no:{{buildNumber}} miljö:{{environment}}\n" +
    "        <span ng-repeat=\"integration in integrationInfoList\"> | {{integration.name}} v.{{integration.version}}</span>\n" +
    "    </label>\n" +
    "</div>\n" +
    "");
}]);
