"use strict";
angular.module('stpCommon.header').filter('capitalAndLowerCase', function() {

    return function (str){
        return str.replace(/[^-'\s]+/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
});