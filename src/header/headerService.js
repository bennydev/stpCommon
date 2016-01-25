"use strict";
angular.module('stpCommon.header').factory('HeaderService', [function(){
    var customerFirstName;
    var customerLastName;
    var customerPersonId;
    var policyHolderFirstName;
    var policyHolderLastName;
    var policyHolderPersonId;
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
        getCustomerLastName: getCustomerLastName,
        setCustomerPersonId: setCustomerPersonId,
        getCustomerPersonId: getCustomerPersonId,
        setPolicyHolderFirstName: setPolicyHolderFirstName,
        getPolicyHolderFirstName: getPolicyHolderFirstName,
        setPolicyHolderLastName: setPolicyHolderLastName,
        getPolicyHolderLastName: getPolicyHolderLastName,
        setPolicyHolderPersonId: setPolicyHolderPersonId,
        getPolicyHolderPersonId: getPolicyHolderPersonId,
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

    function getCustomerLastName(){
        return customerLastName;
    }

    function setPolicyHolderFirstName(name){
        policyHolderFirstName = name;
    }

    function getPolicyHolderFirstName(){
        return policyHolderFirstName;
    }

    function setPolicyHolderLastName(name){
        policyHolderLastName = name;
    }
    function getPolicyHolderLastName(){
        return policyHolderLastName;
    }

    function hasName(){
        return !! customerFirstName || policyHolderFirstName;
    }

    function getCustomerFullName(){
        return fullName(customerFirstName, customerLastName);
    }

    function getPolicyHolderFullName(){
        return fullName(policyHolderFirstName, policyHolderLastName);
    }

    function fullName(firstName, lastName){
        var wholeName = '';
        if(firstName){
            wholeName = firstName + ' ';
        }
        if(lastName){
            wholeName += lastName;
        }
        return wholeName;
    }

    function setCustomerPersonId(id){
        customerPersonId = id;
    }

    function getCustomerPersonId(){
        return customerPersonId;
    }

    function setPolicyHolderPersonId(id){
        policyHolderPersonId = id;
    }

    function getPolicyHolderPersonId(){
        return policyHolderPersonId;
    }

}]);