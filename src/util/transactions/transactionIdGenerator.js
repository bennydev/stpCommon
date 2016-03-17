"use strict";
angular.module('stpCommon.util')
    .factory('TransactionIdGenerator', ['EnvironmentService', function (EnvironmentService) {

    var transIdGenerator = {
        crc32FromObject: CRC32FromObject,
        crc32FromString: CRC32,
        setTransactionId: setTransactionId
    };

    return transIdGenerator;

    function setTransactionId(){
        var current = new Date().getTime();
        var random = Math.floor((Math.random() * 1000) + 1);
        if (EnvironmentService.getCurrentEnvironment() === "PROD") {
            return current+random;
        } else {
            return EnvironmentService.getCurrentEnvironment()+current+random;
        }
    }

    function CRC32FromObject(object) {
        return CRC32(JSON.stringify(object));
    }
    function CRC32(string) {
        return crc32ComputeString(0x04C11DB7, string);
    }

    function crc32ComputeString(polynomial, str) {
        var crc = 0;
        var table = crc32Generate(polynomial);
        var i;

        crc = crc32Initial();

        for (i = 0; i < str.length; i++) {
            crc = (crc >>> 8) ^ table[str.charCodeAt(i) ^ (crc & 0x000000FF)];
        }
        crc = crc32Final(crc);
        return crc;
    }

    /*
     * JavaScript CRC-32 implementation
     */

    function crc32Generate(polynomial) {
        var table = [];
        var i, j, n;

        for (i = 0; i < 256; i++) {
            n = i;
            for (j = 8; j > 0; j--) {
                if ((n & 1) == 1) {
                    n = (n >>> 1) ^ polynomial;
                } else {
                    n = n >>> 1;
                }
            }
            table[i] = n;
        }

        return table;
    }

    function crc32Initial() {
        return 0xFFFFFFFF;
    }

    function crc32Final(crc) {
        crc = ~crc;
        return crc < 0 ? 0xFFFFFFFF + crc + 1 : crc;
    }


    function crc32ComputeBuffer(polynomial, data) {
        var crc = 0;
        var dataView = new DataView(data);
        var table = crc32Generate(polynomial);
        var i;

        crc = crc32Initial();

        for (i = 0; i < dataView.byteLength; i++) {
            crc = (crc >>> 8) ^ table[dataView.getUint8(i) ^ (crc & 0x000000FF)];
        }
        crc = crc32Final(crc);
        return crc;
    }

    function crc32_reversed(polynomial) {
        var reversed = 0;
        var i;
        for (i = 0; i < 32; i++) {
            reversed = reversed << 1;
            reversed = reversed | ((polynomial >>> i) & 1);
        }
        return reversed;
    }

}]);