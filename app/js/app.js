'use strict';

/* App Module */

var app = angular.module('App', [
    'ionic',
    'ionic.swipe.pages',
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
