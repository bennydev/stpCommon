"use strict";
angular.module('stpCommon.header').factory('HeaderService', [function(){
    var customerFirstName;
    var customerLastName;
    var policyHolderFirstName;
    var policyHolderLastName;

    var service = {
        showCustomerInfo: showCustomerInfo,
        setCustomerFirstName: setCustomerFirstName,
        setCustomerLastName: setCustomerLastName,
        setPolicyHolderFirstName: setPolicyHolderFirstName,
        setPolicyHolderLastName: setPolicyHolderLastName,
        hasName: hasName,
        getCustomerFullName: getCustomerFullName,
        getPolicyHolderFullName: getPolicyHolderFullName
    };
    return service;

    function showCustomerInfo(){
        return true;
    }

    function setCustomerFirstName(name){
        customerFirstName = name;
    }

    function setCustomerLastName(name){
        customerLastName = name;
    }

    function setPolicyHolderFirstName(name){
        policyHolderFirstName = name;
    }

    function setPolicyHolderLastName(name){
        policyHolderLastName = name;
    }

    function hasName(){
        return !! customerFirstName || policyHolderFirstName;
    }

    function getCustomerFullName(){
        return customerFirstName + ' ' + customerLastName;
    }

    function getPolicyHolderFullName(){
        return policyHolderFirstName + ' ' + policyHolderLastName;
    }

}]);