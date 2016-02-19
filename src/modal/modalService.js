"use strict";
angular.module('stpCommon.modal', [])
    .factory('ModalService', ['$window', '$scope', function($window, $scope){
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
    }]);