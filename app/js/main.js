require.config({
    paths: {
        'jquery': '../../bower_components/jquery/jquery',
        'angular': '../../bower_components/angular/angular',
        'angularAnimate': '../../bower_components/angular-animate/angular-animate',
        'angularResource': '../../bower_components/angular-resource/angular-resource',
        'angularSanitize': '../../bower_components/angular-sanitize/angular-sanitize',
        'angularUIRouter': '../../bower_components/angular-ui-router/release/angular-ui-router',
        'angularBootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap',
        'ionic': '../../bower_components/ionic/release/js/ionic',
        'ionicAngular': '../../bower_components/ionic/release/js/ionic-angular',
        'text': '../../bower_components/requirejs-text/text',
        'css': '../../bower_components/require-css/css',

        'superslidebox': 'ionic.superslidebox'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularAnimate': ['angular'],
        'angularResource': ['angular'],
        'angularSanitize': ['angular'],
        'angularUIRouter': ['angular'],
        'angularMocks': {
            deps: ['angular'],
            exports:'angular.mock'
        },
        'ionic': {
            exports: 'ionic'
        },
        'ionicAngular': ['angular', 'ionic', 'angularAnimate', 'angularUIRouter', 'angularSanitize'],
        'superslidebox': ['ionicAngular']
    },
});


require( [
    'angular',
    'app'
], function(angular, app) {
    'use strict';

    angular.bootstrap(document, [app.name]);
});
