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
    }]);
angular.module('stpOfferTemplates', ['offer/ltp/ltp.tpl.html', 'offer/ltp/thanks.tpl.html', 'offer/offer.tpl.html']);

angular.module("offer/ltp/ltp.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/ltp/ltp.tpl.html",
    "<div ng-include=\"'offer/ltp/thanks.tpl.html'\"></div>");
}]);

angular.module("offer/ltp/thanks.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/ltp/thanks.tpl.html",
    "<div class=\"u-bgcolor-blue-5 u-small-type\">\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"u-padding-above\">\n" +
    "\n" +
    "            <h3 class=\"u-typography-2 u-spacing-under-narrow\" translate>VIEW.SECTIONS.OFFER.LTP.THANKS.HEADER</h3>\n" +
    "\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item sm--one-half\">\n" +
    "                    <p translate translate-values=\"{claimId: claimId}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CLAIM_ID</p>\n" +
    "\n" +
    "                    <div class=\"u-spacing-above\">\n" +
    "                        <p translate translate-values=\"{eventType: offerModel.eventType}\">VIEW.SECTIONS.OFFER.LTP.THANKS.INFO_CONTACT</p>\n" +
    "                        <p translate>VIEW.SECTIONS.OFFER.REGARDS</p>\n" +
    "                        <p translate>VIEW.SECTIONS.OFFER.FOLKSAM</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("offer/offer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer.tpl.html",
    "<div ng-controller=\"OfferCtrl\">\n" +
    "    <ng-include src=\"template\"></ng-include>\n" +
    "</div>");
}]);
