"use strict";
angular.module('stpCommon.util')
.factory('AirportList',['$translate', function($translate){
    var swedishAirports = [
        {city: 'Arlanda', name: 'Stockholm Arlanda Airport', iata: 'ARN', group: 1},
        {city: 'Arvidsjaur', name: 'Arvidsjaur flygplats', iata: 'AJR', group: 7},
        {city: 'Borlänge', name: 'Dala Airport', iata: 'BLE', group: 7},
        {city: 'Bromma', name: 'Stockholm-Bromma flygplats', iata: 'BMA', group: 7},
        {city: 'Gällivare', name: 'Gällivare Lapland Airport', iata: 'GEV', group: 7},
        {city: 'Gävle', name: 'Gävle flygplats', iata: 'GVX', group: 7},
        {city: 'Göteborg', name: 'Göteborg City Airport', iata: 'GSE', group: 7},
        {city: 'Göteborg', name: 'Göteborg-Landvetter Airport', iata: 'GOT', group: 3},
        {city: 'Hagfors', name: 'Hagfors flygplats', iata: 'HFS', group: 7},
        {city: 'Halmstad', name: 'Halmstad City Airport', iata: 'HAD', group: 7},
        {city: 'Hemavan-Tärnaby', name: 'Hemavan Tärnaby Airport', iata: 'HMV', group: 7},
        {city: 'Hultsfred', name: 'Hultsfred-Vimmerby Airport', iata: 'HLF', group: 7},
        {city: 'Jönköping', name: 'Jönköping Airport', iata: 'JKG', group: 7},
        {city: 'Kalmar', name: 'Kalmar Öland Airport', iata: 'KLR', group: 7},
        {city: 'Karlstad', name: 'Karlstad Airport', iata: 'KSD', group: 7},
        {city: 'Kiruna', name: 'Kiruna Airport', iata: 'KRN', group: 7},
        {city: 'Kramfors-Sollefteå', name: 'Höga Kusten Airport', iata: 'KRF', group: 7},
        {city: 'Kristianstad', name: 'Kristianstad Österlen Airport', iata: 'KID', group: 7},
        {city: 'Köpenhamn', name: 'Københavns Lufthavn, Kastrup', iata: 'CPH', group: 2},
        {city: 'Linköping', name: 'Linköping City Airport', iata: 'LPI', group: 7},
        {city: 'Luleå', name: 'Luleå Airport', iata: 'LLA', group: 7},
        {city: 'Lycksele', name: 'Lycksele flygplats', iata: 'LYC', group: 7},
        {city: 'Malmö', name: 'Malmö Airport', iata: 'MMX', group: 5},
        {city: 'Mora', name: 'Mora-Siljan flygplats', iata: 'MXX', group: 7},
        {city: 'Norrköping', name: 'Norrköping flygplats', iata: 'NRK', group: 7},
        {city: 'Oskarshamn', name: 'Oskarshamn Airport', iata: 'OSK', group: 7},
        {city: 'Oslo', name: 'Oslo Lufthavn, Gardermoen', iata: 'OSL', group: 6},
        {city: 'Pajala', name: 'Pajala Airport', iata: 'PJA', group: 7},
        {city: 'Ronneby', name: 'Ronneby Airport', iata: 'RNB', group: 7},
        {city: 'Skavsta', name: 'Stockholm Skavsta Airport', iata: 'NYO', group: 4},
        {city: 'Skellefteå', name: 'Skellefteå Airport', iata: 'SFT', group: 7},
        {city: 'Skövde', name: 'Skövde Flygplats', iata: 'KVB', group: 7},
        {city: 'Storuman', name: 'Storumans flygplats', iata: 'SQO', group: 7},
        {city: 'Sundsvall-Timrå', name: 'Sundsvall Timrå Airport', iata: 'SDL', group: 7},
        {city: 'Sveg', name: 'Härjedalen Sveg Airport', iata: 'EVG', group: 7},
        {city: 'Torsby', name: 'Torsby flygplats', iata: 'TYF', group: 7},
        {city: 'Trollhättan-Vänersborg', name: 'Trollhättan-Vänersborgs flygplats', iata: 'THN', group: 7},
        {city: 'Umeå', name: 'Umeå Airport', iata: 'UME', group: 7},
        {city: 'Vilhelmina', name: 'Vilhelmina South Lapland Airport', iata: 'VHM', group: 7},
        {city: 'Visby', name: 'Visby Airport', iata: 'VBY', group: 7},
        {city: 'Västerås', name: 'Stockholm-Västerås flygplats', iata: 'VST', group: 7},
        {city: 'Växjö', name: 'Småland Airport', iata: 'VXO', group: 7},
        {city: 'Åre-Östersund', name: 'Åre Östersund Airport', iata: 'OSD', group: 7},
        {city: 'Ängelholm-Helsingborg', name: 'Ängelholm-Helsingborg Airport', iata: 'AGH', group: 7},
        {city: 'Örebro', name: 'Örebro flygplats', iata: 'ORB', group: 7},
        {city: 'Örnsköldsvik', name: 'Örnsköldsvik Airport', iata: 'OER', group: 7},
        {city: 'LIST.AIRPORT_NAME.IATA.OTHER', name: 'LIST.AIRPORT_NAME.IATA.OTHER', iata: 'OTHER', group: 8}
    ];

    return {
        getSwedishAirports: function () {
            swedishAirports.forEach(function (airport) {
                airport.name = $translate.instant(airport.name);
            });
            return swedishAirports;
        }
    };
}]);