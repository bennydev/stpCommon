"use strict";
angular.module('stpCommon.modal', [])
    .factory('ModalService', ['$window', function($window){
        var error = {};
        var modalTemplate;
        var service = {
            error: error,
            openError: openError,
            open: open,
            close: close,
            getModalTemplate: getModalTemplate
        };

        return service;

        function getModalTemplate(){
            return modalTemplate;
        }

        function openError(textRoot){
            error.title = textRoot +".TITLE";
            error.message = textRoot + ".MESSAGE";
            error.close = textRoot + ".CLOSE";
            open('modalError.tpl.html');
        }

        function open(template){
            modalTemplate = template;
            $window.fdr.modal.open('#modal');
        }

        function close(){
            $window.fdr.modal.close();
        }
    }])
    .controller('ModalCtrl', ['$scope', 'ModalService', function($scope, ModalService){
        $scope.modalTemplate = ModalService.getModalTemplate();
    }])
    .controller('ModalErrorCtrl', ['$scope', 'ModalService', function($scope, ModalService){
        $scope.ModalService = ModalService;
    }]);
angular.module('stpModalTemplates', ['modal/modal.tpl.html', 'modal/modalError.tpl.html']);

angular.module("modal/modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/modal.tpl.html",
    "<div class=\"modal-backdrop\"></div>\n" +
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal\" id=\"modal\" ng-controller=\"ModalCtrl\">\n" +
    "    <div class=\"modal__dialog\" role=\"document\">\n" +
    "        <ng-include src=\"modalTemplate\"></ng-include>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modal/modalError.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/modalError.tpl.html",
    "<div ng-controller=\"ModalErrorCtrl\">\n" +
    "    <h3 id=\"modalErrorTitle\" translate>{{ModalService.error.title}}</h3>\n" +
    "    <p translate>{{ModalService.error.message}}</p>\n" +
    "    <button class=\"button button--small\" ng-click=\"ModalService.close()\" translate>{{ModalService.error.close}}</button>\n" +
    "</div>");
}]);
