"use strict";
angular.module('stpCommon.navigation', [])
    .directive('stpNavigation', [function(){
        return {
            restrict: 'E',
            templateUrl: 'navigation/navigation.tpl.html'
        };
    }]);
angular.module('stpNavigationTemplates', ['navigation/navigation.tpl.html']);

angular.module("navigation/navigation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navigation/navigation.tpl.html",
    "<div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "    <div class=\"grid-wrapper u-padding-v-40\">\n" +
    "        <button id=\"navButton\" class=\"button button--primary\" ng-click=\"next();\">{{navigationTextKey || 'GENERAL.NAVIGATION.NEXT' | translate}}</button>\n" +
    "    </div>\n" +
    "</div>");
}]);
