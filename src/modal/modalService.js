"use strict";
angular.module('stpCommon.modal', ['stpCommon.util'])
    .factory('ModalService', ['$window', 'StpUtils', function($window, StpUtils){
        var error = {};
        var service = {
            error: error,
            openError: openError,
            open: openFn,
            close: closeFn
        };

        return service;

        function openError(textRoot){
            error.title = textRoot +".TITLE";
            error.message = textRoot + ".MESSAGE";
            error.close = textRoot + ".CLOSE";
            openFn('modal/modalError.tpl.html');
            StpUtils.broadcastService.send('openError', error);
        }

        function openFn(template){
            service.modalTemplate = template;
            $window.fdr.modal.open('#modal');
        }

        function closeFn(){
            $window.fdr.modal.close();
            service.modalTemplate = null;
        }

    }])
    .controller('ModalCtrl', ['$scope', 'ModalService', function($scope, ModalService){
        $scope.ModalService = ModalService;
        $scope.templateLoaded = function(){
            var elements = $('.modal__content--dialog .button');
            var elementsLength = elements.length;
            for(var i=0; i<elementsLength; i++){
                elements[i].tabIndex=i+1;
            }
            elements[0].focus();
        };
    }]);