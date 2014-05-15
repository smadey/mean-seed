'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('MainCtrl', ['$scope', 'Invitation',
    function($scope, Invitation) {
        $scope.introPics = ['intro1', 'intro2', 'intro3'];
    }
]);
