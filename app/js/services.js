'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Invitation', ['$resource',
    function($resource) {
        var Invitation = $resource('/services/invitation/:id', {}, {
            update: { method: 'PUT'}
        });
        return Invitation;
    }
]);
