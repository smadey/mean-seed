define([
    'angular',
    'ionic',
    'superslidebox',
    'filters',
    'services',
    'directives',
    'controllers'
], function (angular, ionic) {
        'use strict';

        /* App Module */

        var app = angular.module('App', [
            'ionic',
            'ionic.ui.superSlideBox',
            'ui.router.compat',
            'appFilters',
            'appServices',
            'appDirectives',
            'appControllers'
        ]);

        app.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider.state('home', {
                    url: '/',
                    templateUrl: 'views/index.html',
                    controller: 'MainCtrl'
                });
                $urlRouterProvider.otherwise('/');
            }
        ]);

        return app;
});
