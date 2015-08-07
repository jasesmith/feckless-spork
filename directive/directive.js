(function($angular, _) {
    'use strict';

    angular.module('app')

    .directive('spork', ['UtilityService', function spork(utils) {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                model: '=',
                config: '=?'
            },

            controller: function($scope){
                $scope.doEnter = function(){
                    $scope.$emit('spork:mouseenter');
                };
                $scope.doLeave = function(){
                    $scope.$emit('spork:mouseleave');
                };
            },

            template: '' +
                '<div class="spork" ng-mouseleave="doLeave()" ng-mouseenter="doEnter()">' +
                    '<spork-ul model="model" config="config"></spork-ul>' +
                    '<ng-transclude></ng-transclude>' +
                '</div>',

            link: function link(scope, element) {
                var _defaultConfig = {};

                scope.config = $.extend(true, $angular.copy(_defaultConfig), scope.config);
            }
        };
    }])

    .directive('sporkUl', ['UtilityService', function sprocket(utils) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                parent: '=?',
                config: '='
            },

            template: '<ul><spork-li ng-repeat="node in model" node="node" parent="parent" config="config"></spork-li></ul>'
        };
    }])

    .directive('sporkLi', ['$compile', 'UtilityService', function sporklet($compile, utils) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                node: '=',
                parent: '=?',
                config: '='
            },

            controller: function($scope){
                $scope.doClick = function(node){
                    $scope.$emit('spork:node:click', node);
                };
                $scope.doEnter = function(node){
                    $scope.$emit('spork:node:mouseenter', node);
                };
                $scope.doLeave = function(node){
                    $scope.$emit('spork:node:mouseleave', node);
                };

                $scope.connector = function connector(node, parent) {
                    if(!_.isUndefined(parent)) {
                        node = $angular.element('#node-' + node.id);
                        parent = $angular.element('#node-' + parent.id);
                        var metrics = utils.getMetrics(node[0], parent[0], true);

                        return {
                            width: Math.round(metrics.lineLength) + 'px',
                            transform: 'translateY(-50%) rotate(' + Math.round(metrics.angleDegrees) + 'deg)'
                        };
                    }
                };
            },

            template: '' +
                '<li>' +
                    '<div id="node-{{node.id}}" ng-mouseleave="doLeave(node)" ng-mouseenter="doEnter(node)" ng-click="doClick(node)">' +
                        '<div class="node {{node.type}}" ng-include="config.templateUrl"></div>' +
                        '<div class="node-line {{node.line}}" ng-style="connector(node, parent)"></div>' +
                    '</div>' +
                '</li>',

            link: function (scope, element) {

                var _sporkUlString = '<spork-ul model="node.children" parent="node" config="config"></spork-ul>';

                var renderTemplate = function(){
                    if ($angular.isArray(scope.node.children)) {
        				$compile(_sporkUlString)(scope, function(cloned, scope){
                            element.append(cloned);
                        });
        			}
                };

                renderTemplate();

                scope.$watch('node.children', function(n, o){
                    if(n !== o) {
                        renderTemplate();
                    }
                });

    		}

        };
    }]);

})(window.angular, window._);
