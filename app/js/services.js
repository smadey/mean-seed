define(['angular', 'angularResource'], function (angular) {
    'use strict';

    /* Services */

    var appServices = angular.module('appServices', ['ngResource']);

    appServices.factory('User', ['$resource',
        function($resource) {
            var User = $resource('/services/user/:id', {}, {
                update: { method: 'PUT'}
            });
            return User;
        }
    ]);

    return appServices;
});
