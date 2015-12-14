"use strict";
angular.module('stpCommon.offer', [])
    .controller('OfferCtrl', ['$scope', 'OfferService', function($scope, OfferService){
        $scope.template = OfferService.getOfferModel().getClaimType() === 'LTP' ? 'offer/ltp/ltp.tpl.html' : 'offer/stp/stp.tpl.html';
        $scope.claimId = OfferService.getOfferModel().getClaimId();
    }])
    .factory('OfferService', [function(){
        var service = {
            getOfferModel: getOfferModel
        };
        return service;

        function getOfferModel(){
            var model = {
                getClaimType: getClaimType,
                getClaimId: getClaimId
            };
            return model;

            function getClaimType(){
                return 'LTP';
            }

            function getClaimId(){
                return 'FF123456789S'
            }
        }
    }])
    .controller('STPCtrl', ['$scope', 'OfferService', 'HeaderService', 'ErrorReporter', function($scope, OfferService, HeaderService, ErrorReporter){
        $scope.offerModel = OfferService.getOfferModel();
        $scope.customer = {fullName: HeaderService.getCustomerFullName()};
        $scope.policyHolder = {fullName: HeaderService.getPolicyHolderFullName()};

        $scope.confirmOffer = function(){
            if(!ErrorReporter.hasErrors()){
                $scope.thankYouTemplate = 'offer/stp/thanks.tpl.html';
            }
        };
    }]);