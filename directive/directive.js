(function($angular, _) {
    'use strict';

    $angular.module('app').directive('spork', ['$window', function spork($window) {
        var getAngle = function(x1, y1, x2, y2) {
            var dy = y2 - y1;
            var dx = x2 - x1;
            return Math.atan2(dy, dx) * 180 / Math.PI; // range (-PI, PI]
            // theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
            // if (theta < 0) theta = 360 + theta; // range [0, 360)
            // return theta;
        }

        var getNumbers = function(target){
            var numbers = {};
            if(target) {
                numbers = {
                    t: Math.floor(target.getBoundingClientRect().top),
                    r: Math.floor(target.getBoundingClientRect().right),
                    b: Math.floor(target.getBoundingClientRect().bottom),
                    l: Math.floor(target.getBoundingClientRect().left),
                    w: Math.floor(target.clientWidth),
                    h: Math.floor(target.clientHeight),
                };
                numbers.cx = (numbers.l + (numbers.h/2));
                numbers.cy = (numbers.t + (numbers.w/2));

                // numbers.x = getXpos(pos, numbers);
                // numbers.y = getYpos(pos, numbers);
            }
            return numbers;
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=?',
                model: '='
            },

            controller: ['$scope', function controller($scope) {

                $scope.lineLength = function lineLength(el, parent) {
                    el = $('#node-' + el);
                    parent = $('#node-' + parent);

                    var en = getNumbers(el[0]);
                    var pn = getNumbers(parent[0]);
                    var p1 = {
                    	x: en.cx,
                    	y: en.cy
                    };
                    var p2 = {
                    	x: pn.cx,
                    	y: pn.cy
                    };

                    // angle in radians
                    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

                    // angle in degrees
                    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
                    // this because we are working the lines right to left
                    angleDeg += 180;

                    var l = Math.sqrt(((p1.x -= p2.x) * p1.x) + ((p1.y -= p2.y) * p1.y));
                    // d = getAngle(x1, y1, x2, y2);

                    window.console.log(l, angleDeg);

                    return {
                        width: l + 'px',
                        transform: 'translateY(-50%) rotate(' + angleDeg + 'deg)'
                    };
                };

            }],

            template: '' +
                '<div class="spork {{config.style}}">' +
                    '<ul>' +
                        '<li ng-repeat="a in model">' +
                            '<div id="node-{{a.id}}">' +
                                 '<div class="node"><span class="label">{{a.id}}</span></div>' +
                            '</div>' +

                            '<ul ng-if="a.children.length">' +
                                '<li ng-repeat="b in a.children">' +
                                    '<div id="node-{{b.id}}">' +
                                        '<div class="node"><span class="label">{{b.id}}</span></div>' +
                                        '<div class="line" ng-style="lineLength(b.id, a.id)"></div>' +
                                    '</div>' +

                                    '<ul ng-if="b.children.length">' +
                                        '<li ng-repeat="c in b.children">' +
                                            '<div id="node-{{c.id}}">' +
                                                '<div class="node"><span class="label">{{c.id}}</span></div>' +
                                                '<div class="line" ng-style="lineLength(c.id, b.id)"></div>' +
                                            '</div>' +

                                            '<ul ng-if="c.children.length">' +
                                                '<li ng-repeat="d in c.children">' +
                                                    '<div id="node-{{d.id}}">' +
                                                        '<div class="node"><span class="label">{{d.id}}</span></div>' +
                                                        '<div class="line" ng-style="lineLength(d.id, c.id)"></div>' +
                                                    '</div>' +

                                                '</li>' +
                                            '</ul>' +
                                        '</li>' +
                                    '</ul>' +
                                '</li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</div>',

            link: function link(scope, element) {
                var defaultConfig = {};
                scope.config = $.extend(true, $angular.copy(defaultConfig), scope.config);
            }
        };
    }]);

})(window.angular, window._);
