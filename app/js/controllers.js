'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('MainCtrl', ['$scope', 'Invitation',
    function($scope, Invitation) {
        $scope.intro = { title: '酒会简介', content: '专注移动29年', imgs: ['', '', ''] };
    }
]);
