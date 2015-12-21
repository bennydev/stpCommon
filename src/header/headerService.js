"use strict";
angular.module('stpCommon.header').factory('HeaderService', [function(){
    var customerFirstName;
    var customerLastName;
    var policyHolderFirstName;
    var policyHolderLastName;
    var objectName;
    var eventName;

    var service = {
        showCustomerInfo: showCustomerInfo,
        showIdentificationHeader: showIdentificationHeader,
        showSectionsHeader: showSectionsHeader,
        restart: restart,
        setCustomerFirstName: setCustomerFirstName,
        getCustomerFirstName: getCustomerFirstName,
        setCustomerLastName: setCustomerLastName,
        setPolicyHolderFirstName: setPolicyHolderFirstName,
        setPolicyHolderLastName: setPolicyHolderLastName,
        hasName: hasName,
        getCustomerFullName: getCustomerFullName,
        getPolicyHolderFullName: getPolicyHolderFullName,
        setObjectName: setObjectName,
        getObjectName: getObjectName,
        setEventName: setEventName,
        getEventName: getEventName

    };
    return service;

    function restart(){}

    function setObjectName(name){
        objectName = name;
    }

    function getObjectName(){
        return objectName;
    }

    function setEventName(name){
        eventName = name;
    }

    function getEventName(){
        return eventName;
    }

    function showCustomerInfo(){
        return true;
    }

    function showIdentificationHeader(){
        return true;
    }

    function showSectionsHeader(){
        return true;
    }

    function setCustomerFirstName(name){
        customerFirstName = name;
    }

    function getCustomerFirstName(){
        return customerFirstName;
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
        return (customerFirstName || '') + ' ' + (customerLastName || '');
    }

    function getPolicyHolderFullName(){
        return (policyHolderFirstName || '') + ' ' + (policyHolderLastName || '');
    }

}]);