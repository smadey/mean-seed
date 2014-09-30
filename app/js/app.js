define([
    'angular',
    'bootstrap',
    'angularUIRouter',
    'angularSelect',
    'angularCookies',
    'angularTranslate',
    'i18nLoader',
    'filters',
    'services',
    'directives',
    'controllers'
], function(angular) {
        'use strict';

        var app = angular.module('App', [
            'ui.router',
            'ui.select',
            'ngCookies',
            'pascalprecht.translate',
            'appFilters',
            'appServices',
            'appDirectives',
            'appControllers'
        ]);

        app.config(['$translateProvider', 'uiSelectConfig', function($translateProvider, uiSelectConfig) {
            uiSelectConfig.theme = 'bootstrap';

            $translateProvider.useStaticFilesLoader({ prefix: './i18n/translate/', suffix: '.json' });
            $translateProvider.preferredLanguage(window.navigator.language || 'zh-CN');
            $translateProvider.useLocalStorage();

        }]).config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$controllerProvider',
            function($stateProvider, $urlRouterProvider, $compileProvider, $controllerProvider) {

                var lazyModule = function(options) {
                    var abstract = !!options.abstract;
                    var url = options.url;
                    var templateUrl = options.templateUrl;
                    var moduleUrl = options.moduleUrl;

                    return {
                        abstract: abstract,
                        url: options.url,
                        template: '<div class="lazy-module" ng-include="templateUrl" ng-controller="controller"></div>',
                        resolve: {
                            module: ['$q',
                                function($q) {
                                    var deferred = $q.defer();

                                    require([moduleUrl], function(module) {
                                        module = angular.isFunction(module) ? { controller: module } : module ? module : {};

                                        if(!angular.isArray(module.directives)) {
                                            module.directives = [];
                                        }
                                        if(!angular.isFunction(module.controller) && !angular.isArray(module.controller)) {
                                            module.controller = function() {};
                                        }

                                        angular.forEach(module.directives, function(directive) {
                                            $compileProvider.directive(directive.name, directive.factory);
                                        });

                                        $controllerProvider.register(module.controller);

                                        deferred.resolve({
                                            templateUrl: templateUrl,
                                            controller: module.controller
                                        });
                                    });

                                    return deferred.promise;
                                }
                            ]
                        },
                        controller: ['$scope', 'module',
                            function($scope, module) {
                                $scope.templateUrl = module.templateUrl;
                                $scope.controller = module.controller;
                            }
                        ]
                    };
                };

                // $urlRouterProvider.when('', '/');

                $stateProvider.state('home', {
                    url: '/',
                    templateUrl: '../view/index.html',
                    controller: function() {

                    }
                });

                $urlRouterProvider.otherwise('/');
            }
        ]);

        return app;
});
