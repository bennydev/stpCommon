"use strict";
angular.module('stpCommon.util')
    .factory('FsmScroll', ['$timeout', function ($timeout) {

        var fsmScroll = {
            scrollToFirstError:scrollToFirstError
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

        return fsmScroll;

    }]);

