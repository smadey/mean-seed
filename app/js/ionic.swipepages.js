(function(ionic) {

    var SwipeablePageController = ionic.controllers.ViewController.inherit({
        initialize: function(opts) {
            opts = ionic.extend({}, opts);

            this.ele = opts.ele;
            this.ele.style.width = '100%';
            this.ele.style.height = '100%';
            this.ele.style.position = 'relative';

            this.direction = opts.direction || 'horizontal';

            this.startX = this.startY = 0;
            this.x = this.y = 0;

            this.cards = [];
        },

        pushCard: function(card) {
            var self = this;

            var transitionDuration = 500,
                transitionTimingFunction = 'ease';

            this.cards.push(card);

            if(this.direction == 'horizontal') {
                card.ele.style.float = 'left';
                this.ele.style.width = this.cards.length * 100 + '%';
                angular.forEach(this.cards, function(c) {
                    c.ele.style.width = 100 / self.cards.length + '%';
                });

                ionic.onGesture('dragstart', function(e) {
                    self.startX = parseInt(angular.element(self.ele).css('left')) || 0;
                }, card.ele);

                ionic.onGesture('drag', function(e) {
                    window.requestAnimationFrame(function() {
                        self.x = e.gesture.deltaX * 0.4;
                        self.ele.style.left = self.startX + self.x + 'px';
                    });
                }, card.ele);

                ionic.onGesture('dragend', function(e) {
                    window.requestAnimationFrame(function() {
                        var index = angular.element(card.ele).index();

                        self.ele.style[ionic.CSS.TRANSITION] = 'left ' + transitionDuration + 'ms ' + transitionTimingFunction;

                        if(self.x < 0) { // swipe left
                            index = Math.min(index, self.cards.length - 2);
                            self.ele.style.left = (index + 1) * -100 + '%';
                        }
                        else if(self.x > 0) { // swipe right
                            index = Math.max(index, 1);
                            self.ele.style.left = (index - 1) * -100 + '%';
                        }

                        setTimeout(function() {
                          self.ele.style[ionic.CSS.TRANSITION] = 'none';
                        }, transitionDuration);
                    });
                }, card.ele);
            }
            else { // vertical
                ionic.onGesture('dragstart', function(e) {
                    self.startY = parseInt(angular.element(self.ele).css('top')) || 0;
                }, card.ele);

                ionic.onGesture('drag', function(e) {
                    window.requestAnimationFrame(function() {
                        self.y = e.gesture.deltaY * 0.4;
                        self.ele.style.top = self.startY + self.y + 'px';
                    });
                }, card.ele);

                ionic.onGesture('dragend', function(e) {
                    window.requestAnimationFrame(function() {
                        var index = angular.element(card.ele).index();

                        self.ele.style[ionic.CSS.TRANSITION] = 'top ' + transitionDuration + 'ms ' + transitionTimingFunction;

                        if(self.y < 0) { // swipe up
                            index = Math.min(index, self.cards.length - 2);
                            self.ele.style.top = (index + 1) * -100 + '%';
                        }
                        else if(self.y > 0) { // swipe down
                            index = Math.max(index, 1);
                            self.ele.style.top = (index - 1) * -100 + '%';
                        }

                        setTimeout(function() {
                          self.ele.style[ionic.CSS.TRANSITION] = 'none';
                        }, transitionDuration);
                    });
                }, card.ele);
            }
        }
    });

    var SwipeablePageView = ionic.views.View.inherit({
        /**
         * Initialize a card with the given options.
         */
        initialize: function(opts) {
            opts = ionic.extend({}, opts);

            this.ele = opts.ele;
            this.ele.style.width = '100%';
            this.ele.style.height = '100%';
        }
    });


    angular.module('ionic.swipe.pages', ['ionic'])

    .directive('swipePage', function() {
        return {
            restrict: 'E',
            template: '<div class="swipe-page" ng-transclude></div>',
            require: '^swipePages',
            replace: true,
            transclude: true,
            scope: {},
            compile: function(element, attr) {
                return function($scope, $element, $attr, swipePages) {
                    var swipePage = new SwipeablePageView({
                        ele: $element[0]
                    });

                    swipePages.pushCard(swipePage);

                };
            }
        };
    })

    .directive('swipePages', function() {
        return {
            restrict: 'E',
            template: '<div class="swipe-pages" ng-transclude></div>',
            replace: true,
            transclude: true,
            scope: {
                swipeDirection: '&'
            },
            controller: function($scope, $element, $attrs) {
                var swipePages = new SwipeablePageController({
                    ele: $element[0],
                    direction: $attrs.swipeDirection
                });

                return swipePages;
            }
        };
    });

})(window.ionic);
