(function($angular, _) {
    'use strict';

    $angular.module('app')

        .directive('spork', ['$rootScope', '$compile', 'UtilityService', function spork($rootScope, $compile, utils) {

        var thingli = function(templateUrl, node, parent){
            window.console.log(node);
            var string = '';
            string += '<li>';
                string += '<div id="node-' + node.id + '">';
                    string += '<div class="node" ng-include="\'' + templateUrl + '\'"></div>';
                    if(parent) {
                        string += '<div class="line" ng-style="connector(' + node.id + ', ' + parent.id + ')"></div>';
                    }
                string += '</div>';
                string += thing(templateUrl, node);
            string += '</li>';

            return string;
        };

        var thing = function(templateUrl, node, root) {
            var string = '';
            if(node.children || root) {
                string += '<ul>';
                if(root) {
                    string += thingli(templateUrl, node);
                } else {
                    _.each(node.children, function(child){
                        string += thingli(templateUrl, child, node);
                    });
                }
                string += '</ul>';
            }

            return string;
        };

        var looper = function(model, templateUrl){
            var string = '';
            _.each(model, function(node){
                string += thing(templateUrl, node, true);
            });
            return string;
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=?',
                model: '=',
                templateUrl: '@'
            },

            controller: ['$scope', function controller($scope) {
                var me = this;

                this.defaultConfig = {};

                $scope.config = $.extend(true, $angular.copy(me.defaultConfig), $scope.config);
            }],

            template: '<div class="spork"></div>',

            link: function link(scope, element) {

                scope.connector = function connector(el, parent) {
                    if(parent !== false) {
                        el = $angular.element('#node-' + el);
                        parent = $angular.element('#node-' + parent);
                        var metrics = utils.getMetrics(el[0], parent[0], true);

                        return {
                            width: Math.round(metrics.lineLength) + 'px',
                            transform: 'translateY(-50%) rotate(' + Math.round(metrics.angleDegrees) + 'deg)'
                        };
                    }
                };

                var renderTemplate = function(model){
                    if(model) {
                        var template = looper(model, scope.templateUrl);
                        element.append($angular.element(template));

                        var compiled = $compile(element);
                        compiled(scope);

                    }
                };

                scope.$watch('model', function(n) {
                    renderTemplate(n);
                });
            }
        };
    }]);

})(window.angular, window._);
