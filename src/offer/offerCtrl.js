"use strict";
angular.module('stpCommon.offer', [])
    .controller('OfferCtrl', ['$scope', 'OfferService', function($scope, OfferService){
        $scope.template = OfferService.getClaimType() === 'LTP' ? 'offer/ltp/ltp.tpl.html' : 'offer/stp/stp.tpl.html';
        $scope.claimId = OfferService.getClaimId();
    }])
    .factory('OfferService', [function(){
        var service = {
            getOfferModel: getOfferModel
        };
        return service;

        function getOfferModel(){
            var model = {
                getClaimType: getClaimId,
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
    }]);