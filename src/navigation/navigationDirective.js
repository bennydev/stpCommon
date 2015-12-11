"use strict";
angular.module('stpCommon.navigation', [])
    .directive('stpNavigation', [function(){
        return {
            restrict: 'E',
            templateUrl: 'navigation/navigation.tpl.html'
        };
    }]);