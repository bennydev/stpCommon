"use strict";
angular.module('stpCommon.navigation')
    .directive('stpNavigation', [function(){
        return {
            restrict: 'E',
            templateUrl: 'navigation.tpl.hmtl'
        };
    }]);
angular.module('stpNavigationTemplates', ['navigation/navigation.tpl.html']);

angular.module("navigation/navigation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navigation/navigation.tpl.html",
    "<div class=\"u-align-center u-bgcolor-blue-4\">\n" +
    "    <button id=\"navButton\" class=\"button button--primary u-spacing-above u-spacing-under\" ng-click=\"next();\" translate translate-values=\"{summaryStatus: sections.summary.status}\">VIEW.NAVIGATION.NEXT</button>\n" +
    "</div>");
}]);
