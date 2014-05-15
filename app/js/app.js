'use strict';

/* App Module */

var app = angular.module('App', [
    'ionic',
    'ionic.ui.superSlideBox',
    'appDirectives',
    'appControllers',
    'appFilters',
    'appServices'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.
        state('intro', {
            url: '/',
            templateUrl: 'views/index.html',
            controller: 'InvitationCtrl'
        });
        $urlRouterProvider.otherwise('/');
    }
]);
