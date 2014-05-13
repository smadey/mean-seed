'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('InvitationCtrl', ['$scope', 'Invitation',
    function($scope, Invitation) {
        $scope.intros = [
            { title: '酒会简介', content: '专注移动29年', imgUrl: '' },
            { title: '酒会简介', content: '专注移动30年', imgUrl: '' },
            { title: '酒会简介', content: '专注移动31年', imgUrl: '' },
        ];
    }
]);
