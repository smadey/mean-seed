define(['angular', 'services'], function(angular) {
    'use strict';

    /* Controllers */

    var appControllers = angular.module('appControllers', ['appServices']);

    appControllers.controller('MainCtrl', ['$rootScope', '$state', '$translate', 'User',
        function($rootScope, $state, $translate, User) {

            function isLoginState(stateName) {
                return stateName == 'login';
            }

            function isBackendState(stateName) {
                return /^backend\..*/.test(stateName);
            }

            function hasPermission(stateName, hasLoggedOn) {
                if(isLoginState(stateName) && hasLoggedOn) {
                    $state.go('backend.home');
                    return false;
                }
                else if(isBackendState(stateName) && !hasLoggedOn) {
                    $state.go('login');
                    return false;
                }
                return true;
            }

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var toStateName = toState.name;

                if(isLoginState(toStateName) || isBackendState(toStateName)) {
                    if(typeof $rootScope.hasLoggedOn === 'undefined') {
                        User.islogin({}, function(isLogin) {
                            $rootScope.hasLoggedOn = !!isLogin;

                            if(!hasPermission(toStateName, $rootScope.hasLoggedOn)) {
                                event.preventDefault();
                            }
                        });
                    }
                    else {
                        if(!hasPermission(toStateName, $rootScope.hasLoggedOn)) {
                            event.preventDefault();
                        }
                    }
                }
            });

            $rootScope.langKey = $translate.preferredLanguage();

            $rootScope.setLng = function(langKey) {
                $rootScope.langKey = langKey;
                $translate.use(langKey);
            };

            $rootScope.user = {};
        }
    ]);

    return appControllers;
});
