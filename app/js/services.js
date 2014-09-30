define(['angular', 'alertify', 'angularResource'], function (angular, alertify) {
    'use strict';

    /* Services */

    alertify.warning = alertify.extend('warning');

    var appServices = angular.module('appServices', ['ngResource']);

    appServices.factory('BaseService', ['$resource', '$translate',
        function($resource, $translate) {
            var BaseService = function(url, paramsDefaults, actions) {
                var self = this;
                var resource = $resource(url, paramsDefaults, actions);

                angular.forEach(Object.keys(resource), function(key) {
                    self[key] = function(params, successCallback, errorCallback) {
                        var _successCallback = function(result) {
                            if(result.status == 'success') {
                                if(result.code) {
                                    $translate('msg.' + result.code).then(function(value) {
                                        alertify.success(value);
                                    });
                                }

                                successCallback(result.data);
                            }
                            else if(result.status == 'warning') {
                                if(result.code) {
                                    $translate('msg.' + result.code).then(function(value) {
                                        alertify.warning(value);
                                    });
                                }
                            }
                            else if(result.status == 'error') {
                                alertify.error(JSON.stringify(result.data));
                            }
                        };
                        resource[key].call(resource, params, _successCallback, errorCallback);
                    };
                });

                return this;
            };

            return BaseService;
        }
    ]);

    appServices.factory('User', ['BaseService',
        function(BaseService) {
            var User = new BaseService('/services/user/:id', { id: '@id' }, {
                update: { method: 'PUT' },
                login: { method: 'POST', url: '/services/user/login' },
                logout: { method: 'GET', url: '/services/user/logout' },
                islogin: { method: 'GET', url: '/services/user/islogin' }
            });

            return User;
        }
    ]);

    return appServices;
});
