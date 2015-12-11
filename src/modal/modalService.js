"use strict";
angular.module('stpCommon.modal')
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