"use strict";
angular.module('stpCommon.header')
    .factory('HeaderService', ['$filter', function($filter){
        var self = this;
        self.customer = {firstName: '', lastName: '', personId: ''};
        self.policyHolder = {firstName: '',lastName: '', personId: ''};
        self.headerMessageRoot = 'GENERAL.HEADER.MESSAGE';
        self.siteHeaderTemplateUrl = 'header/siteHeader.tpl.html';

        var objectName;
        var eventName;

        var service = {
            showCustomerInfo: showCustomerInfo,
            showIdentificationHeader: showIdentificationHeader,
            showSectionsHeader: showSectionsHeader,
            restart: restart,
            setCustomer: setCustomer,
            getCustomer: getCustomer,
            setPolicyHolder: setPolicyHolder,
            getPolicyHolder: getPolicyHolder,
            hasName: hasName,
            getCustomerFullName: getCustomerFullName,
            getPolicyHolderFullName: getPolicyHolderFullName,
            setObjectName: setObjectName,
            getObjectName: getObjectName,
            setEventName: setEventName,
            getEventName: getEventName,
            clearPolicyHolderInfo: clearPolicyHolderInfo,
            hasCustomerPersonId: hasCustomerPersonId,
            hasPolicyHolderPersonId: hasPolicyHolderPersonId,
            setCustomerAsPolicyHolder: setCustomerAsPolicyHolder,
            getHeaderMessageRoot : getHeaderMessageRoot,
            setHeaderMessageRoot : setHeaderMessageRoot,
            setSiteHeaderTemplateUrl : setSiteHeaderTemplateUrl
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

        function setCustomer(customer) {
            self.customer = customer;
            toCapitalAndLowerCase(self.customer);
        }

        function getCustomer() {
            return self.customer;
        }

        function setPolicyHolder(policyHolder) {
            self.policyHolder = policyHolder;
            toCapitalAndLowerCase(self.policyHolder);
        }

        function getPolicyHolder() {
            return self.policyHolder;
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


        function hasName(){
            return !! self.customer.firstName ||self.policyHolder.firstName;
        }

        function getCustomerFullName(){
            return fullName(self.customer.firstName, self.customer.lastName);
        }

        function getPolicyHolderFullName(){
            return fullName(self.policyHolder.firstName, self.policyHolder.lastName);
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


        function clearPolicyHolderInfo() {
            self.policyHolder = {};
        }

        function hasCustomerPersonId(personId) {
            return personId === self.customer.personId;
        }

        function hasPolicyHolderPersonId(personId) {
            return personId === self.policyHolder.personId;
        }

        function setCustomerAsPolicyHolder() {
            self.policyHolder = self.customer;
        }

        function getHeaderMessageRoot(){
            return self.headerMessageRoot;
        }
        function setHeaderMessageRoot(root){
            self.headerMessageRoot = root;
        }
        function setSiteHeaderTemplateUrl(url){
            self.siteHeaderTemplateUrl = url;
        }


        function toCapitalAndLowerCase(customerObject) {
            if (customerObject.firstName) {
                customerObject.firstName = $filter('capitalAndLowerCase')(customerObject.firstName);
            }
            if (customerObject.lastName) {
                customerObject.lastName = $filter('capitalAndLowerCase')(customerObject.lastName);
            }
        }

    }]);