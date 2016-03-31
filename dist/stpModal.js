"use strict";
angular.module('stpCommon.modal', ['stpCommon.util'])
    .factory('ModalService', ['$window', 'StpUtils', function($window, StpUtils){
        var error = {};
        var service = {
            error: error,
            openError: openError,
            open: open,
            close: close
        };

        return service;

        function openError(textRoot){
            error.title = textRoot +".TITLE";
            error.message = textRoot + ".MESSAGE";
            error.close = textRoot + ".CLOSE";
            open('modal/modalError.tpl.html');
            StpUtils.broadcastService.send('openError', error);
        }

        function open(template){
            service.modalTemplate = template;
            $window.fdr.modal.open('#modal');
        }

        function close(){
            $window.fdr.modal.close();
        }

    }])
    .controller('ModalCtrl', ['$scope', 'ModalService', function($scope, ModalService){
        $scope.ModalService = ModalService;
        $scope.templateLoaded = function(){
            var $el = $('.modal__content--dialog .button').eq(0);
            var $lastEl = $('.modal__content--dialog .button').last();
            $lastEl.addEventListener("focusout", function(){
                $el.focus();
            });
            $el.focus();
        };
    }]);
angular.module('stpModalTemplates', ['modal/modal.tpl.html', 'modal/modalError.tpl.html']);

angular.module("modal/modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/modal.tpl.html",
    "<div class=\"modal-backdrop\"></div>\n" +
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal\" id=\"modal\" ng-controller=\"ModalCtrl\">\n" +
    "    <div class=\"modal__content modal__content--dialog\" role=\"document\">\n" +
    "        <ng-include src=\"ModalService.modalTemplate\" onload=\"templateLoaded();\"></ng-include>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modal/modalError.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/modalError.tpl.html",
    "<div>\n" +
    "    <h3 id=\"modalErrorTitle\" translate>{{ModalService.error.title}}</h3>\n" +
    "    <p translate>{{ModalService.error.message}}</p>\n" +
    "    <button class=\"button button--small\" ng-click=\"ModalService.close()\" translate>{{ModalService.error.close}}</button>\n" +
    "</div>");
}]);
