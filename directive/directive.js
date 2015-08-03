(function($angular, _) {
    'use strict';

    $angular.module('app').directive('spork', ['$window', function spork($window) {

        var getNumbers = function(target){
            var numbers = {};
            if(target) {
                numbers = {
                    t: target.getBoundingClientRect().top,
                    r: target.getBoundingClientRect().right,
                    b: target.getBoundingClientRect().bottom,
                    l: target.getBoundingClientRect().left,
                    w: target.clientWidth,
                    h: target.clientHeight,
                };
                // find x|y center
                numbers.cx = (numbers.l + (numbers.w/2));
                numbers.cy = (numbers.t + (numbers.h/2));
            }
            return numbers;
        };

        var getMetrics = function(el, parent, rtl, factor) {
            rtl = rtl || false;
            factor = factor || false;

            var en = getNumbers(el);
            var pn = getNumbers(parent);

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
            var angleDegrees = angleRadians * 180 / Math.PI;

            if(rtl) {
                // this because if the line orientation is right to left
                angleDegrees += 180;
            }

            // length of line between two points
            // last operation as this alters the number set
            var lineLength = Math.sqrt(((p1.x -= p2.x) * p1.x) + ((p1.y -= p2.y) * p1.y));

            if(factor) {
                lineLength = lineLength*factor;
            }

            return {
                lineLength: lineLength,
                angleRadians: angleRadians,
                angleDegrees: angleDegrees
            };
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=?',
                model: '='
            },

            controller: ['$scope', function controller($scope) {
                var me = this;

                this.defaultConfig = {};

                $scope.config = $.extend(true, _.clone(me.defaultConfig), $scope.config);

                $scope.connector = function connector(el, parent) {
                    el = $angular.element('#node-' + el)[0];
                    parent = $angular.element('#node-' + parent)[0];

                    var metrics = getMetrics(el, parent, true);

                    return {
                        width: Math.round(metrics.lineLength) + 'px',
                        transform: 'translateY(-50%) rotate(' + Math.round(metrics.angleDegrees) + 'deg)'
                    };
                };

            }],

            template: '' +
                '<div class="spork">' +
                    '<ul>' +
                        '<li ng-repeat="a in model">' +
                            '<div id="node-{{a.id}}">' +
                                 '<div class="node"><span class="label">{{a.id}}</span></div>' +
                            '</div>' +

                            '<ul ng-if="a.children.length">' +
                                '<li ng-repeat="b in a.children">' +
                                    '<div id="node-{{b.id}}">' +
                                        '<div class="node"><span class="label">{{b.id}}</span></div>' +
                                        '<div class="line" ng-style="connector(b.id, a.id)"></div>' +
                                    '</div>' +

                                    '<ul ng-if="b.children.length">' +
                                        '<li ng-repeat="c in b.children">' +
                                            '<div id="node-{{c.id}}">' +
                                                '<div class="node"><span class="label">{{c.id}}</span></div>' +
                                                '<div class="line" ng-style="connector(c.id, b.id)"></div>' +
                                            '</div>' +

                                            '<ul ng-if="c.children.length">' +
                                                '<li ng-repeat="d in c.children">' +
                                                    '<div id="node-{{d.id}}">' +
                                                        '<div class="node"><span class="label">{{d.id}}</span></div>' +
                                                        '<div class="line" ng-style="connector(d.id, c.id)"></div>' +
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
            }
        };
    }]);

})(window.angular, window._);
