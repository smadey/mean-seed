define(['angular'], function (angular) {
    'use strict';

    /* Filters */

    var appFilters = angular.module('appFilters', []);

    appFilters.filter('checkmark', function() {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        };
    });

    return appFilters;
});
