define(['angular', 'services'], function (angular) {
    'use strict';

    /* Controllers */

    var appControllers = angular.module('appControllers', ['appServices']);

    appControllers.controller('MainCtrl', ['$scope', 'Invitation',
        function($scope, Invitation) {
            $scope.introPics = ['intro1', 'intro2', 'intro3'];
        }
    ]);

    return appControllers;
});
