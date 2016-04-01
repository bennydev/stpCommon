"use strict";
angular.module('stpCommon.util')
    .factory('FsmScroll', ['$timeout', function ($timeout) {

        var fsmScroll = {
            scrollToFirstError : scrollToFirstError,
            scrollTo : scrollToFn
        };

        function scrollToFirstError() {
            $timeout(function () {
                var $el = $('.fsm-invalid:not(form)').eq(0);
                if ($el.attr('type') === 'hidden') {
                    $el = $el.parent().find('button:eq(0)');
                }
                var offset = $el.parent().offset();
                if (offset) {
                    $('html, body').animate({
                        scrollTop: offset.top - 70
                    }, 250, function () {
                        $el.focus();
                    });
                }
            }, 250);
        }

        function scrollToFn(element){
            $timeout(function () {
                $('html, body').animate({
                    scrollTop: typeof element === "number" ? element : element.offset().top
                    //scrollTop: element.length > 0 ? element.offset().top : 0
                }, 250);
            }, 250);
        }
        return fsmScroll;
    }]);

