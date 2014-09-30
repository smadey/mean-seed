define(['angular'], function (angular) {
    'use strict';

    /* Directives */

    var appDirectives = angular.module('appDirectives', []);

    appDirectives.directive('smadeyView', ['$stateParams', '$timeout', function($stateParams, $timeout) {
        return {
            restrict: 'A',
            scope: {
                footerHeight: '@'
            },
            link: function($scope, $element, $attr) {
                var previousOrientation = window.orientation;

                var initWidth = window.innerWidth;
                var initHeight = window.innerHeight;
                var transform;

                $element.css({
                    'height': '100%',
                    'position': 'relative',
                    '-webkit-transform-origin': 'center top',
                    '-moz-transform-origin': 'center top',
                    '-ms-transform-origin': 'center top',
                    '-o-transform-origin': 'center top',
                    'transform-origin': 'center top',
                    'width': '100%'
                });

                var checkOrientation = function() {
                    if(window.orientation !== previousOrientation){
                        previousOrientation = window.orientation;

                        $element.css({ width: initWidth + 'px', height: initHeight + 'px', margin: '0 auto' });

                        $timeout(function() {
                            if(previousOrientation === 90 || previousOrientation === -90) {
                                transform = 'scale(' + window.innerHeight / initHeight + ')';
                            }
                            else {
                                transform = '';
                            }

                            $element.css({
                                '-webkit-transform': transform,
                                '-moz-transform': transform,
                                '-ms-transform': transform,
                                '-o-transform': transform,
                                'transform': transform,
                            });
                        }, 1000);
                    }
                };

                window.addEventListener('resize', checkOrientation, false);
                window.addEventListener('orientationchange', checkOrientation, false);

                // (optional) Android doesn't always fire orientationChange on 180 degree turns
                setInterval(checkOrientation, 2000);


                var footerHeight = isNaN(parseInt($scope.footerHeight)) ? 81 : parseInt($scope.footerHeight);
                $scope.$stateParams = $stateParams;

                $scope.$watch('$stateParams.mode', function(newValue, oldValue) {
                    if(newValue == oldValue) return;

                    var isScale = newValue == 'scale';

                    if(isScale) {
                        transform = 'scale(' + ($element.height() - footerHeight) / $element.height() + ')';
                    }
                    else {
                        transform = '';
                    }

                    $element.css({
                        '-webkit-transform': transform,
                        '-moz-transform': transform,
                        '-ms-transform': transform,
                        '-o-transform': transform,
                        'transform': transform,
                    });

                    // hard for desktop
                    var prevHeight = $element.prev().height();
                    if(prevHeight) {
                        $element.css({ 'margin-top': isScale ? prevHeight : '' });
                    }
                });
            }
        };
    }]);

    return appDirectives;
});


