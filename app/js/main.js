require.config({
    paths: {
        'underscore': '../../lib/underscore/underscore',
        'jquery': '../../lib/jquery/dist/jquery',
        'bootstrap': '../../lib/bootstrap-sass-official/assets/javascripts/bootstrap',
        'moment': '../../lib/moment/moment',
        'momentLocale': '../../lib/moment/locale/zh-cn',
        'daterangepicker': '../../lib/bootstrap-daterangepicker/daterangepicker',
        'angular': '../../lib/angular/angular',
        'angularResource': '../../lib/angular-resource/angular-resource',
        'angularUIRouter': '../../lib/angular-ui-router/release/angular-ui-router',
        'angularSelect': '../../lib/angular-ui-select/dist/select',
        'angularCookies': '../../lib/angular-cookies/angular-cookies',
        'angularTranslate': '../../lib/angular-translate/angular-translate',
        'angularBootstrap': '../../lib/angular-bootstrap/ui-bootstrap-tpls',
        'swiper': '../../lib/swiper/dist/idangerous.swiper.min',
        'angularLoadingBar': '../../lib/angular-loading-bar/build/loading-bar.min',
        'swiperAnimation': '../../lib/swiper-smooth-progress/dist/idangerous.swiper.progress.min',
        'swiperScrollbar': '../../lib/swiper-scrollbar/dist/idangerous.swiper.scrollbar.min',
        'css': '../../lib/require-css/css',
        'alertify': '../../lib/alertify.js/lib/alertify',

        'i18nLoader': '../../i18n/loader',
        'ngSwiper': './ng-swiper',
    },
    shim: {
        'bootstrap': ['jquery'],
        'daterangepicker': ['moment', 'jquery'],
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angularResource': ['angular'],
        'angularUIRouter': ['angular'],
        'angularSelect': ['angular'],
        'angularCookies': ['angular'],
        'angularTranslate': ['angular', 'angularCookies'],
        'angularBootstrap': ['angular'],
        'angularLoadingBar': ['angular'],
        'swiperAnimation': ['swiper'],
        'swiperScrollbar': ['swiper']
    },
});


require( [
    'angular',
    'app'
], function(angular, app) {
    'use strict';

    // require('wechat').init({
    //     img_url: location.origin + '/img/logo.png',
    //     link: location.href,
    //     title: '',
    //     description: '',
    //     appid: ''
    // });

    angular.bootstrap(document, [app.name]);
});
