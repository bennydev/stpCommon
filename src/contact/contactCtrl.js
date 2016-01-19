"use strict";
angular.module('stpCommon.contact').controller('ContactInformationCtrl', ['$scope', 'ContactService', function($scope, ContactService) {
    $scope.groups = ContactService.getQuestionGroups();
    $scope.title = 'VIEW.SECTIONS.CONTACT_INFO.TITLE';

}]);