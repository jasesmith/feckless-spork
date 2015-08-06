(function($angular, _) {
    'use strict';

    app
    .directive('spork', ['UtilityService', function spork(utils) {

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
                    window.console.log(el, parent);
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

                $scope.doClick = function(nodeId, action){
                    $scope.$emit('spork:node:click', {id: nodeId, action: action});
                };
            }],

            template: '' +
                '<div class="spork">' +
                    '<ul>' +
                        '<li ng-repeat="a in model">' +
                            '<div id="node-{{a.id}}">' +
                                '<div class="node">' +
                                    '<span class="label">{{a.id}}</span>' +
                                    '<div ng-click="doClick(a.id, \'add\')" class="node-action fa fa-plus-square"></div>' +
                                    '<div ng-click="doClick(a.id, \'remove\')" class="node-action fa fa-minus-square"></div>' +
                                '</div>' +
                                '<div class="line" ng-style="connector(a.id, false)"></div>' +
                            '</div>' +

                            '<ul ng-if="a.children.length">' +
                                '<li ng-repeat="b in a.children">' +
                                    '<div id="node-{{b.id}}">' +
                                        '<div class="node">' +
                                           '<span class="label">{{b.id}}</span>' +
                                           '<div ng-click="doClick(b.id, \'add\')" class="node-action fa fa-plus-square"></div>' +
                                           '<div ng-click="doClick(b.id, \'remove\')" class="node-action fa fa-minus-square"></div>' +
                                        '</div>' +
                                        '<div class="line" ng-style="connector(b.id, a.id)"></div>' +
                                    '</div>' +

                                    '<ul ng-if="b.children.length">' +
                                        '<li ng-repeat="c in b.children">' +
                                            '<div id="node-{{c.id}}">' +
                                                '<div class="node">' +
                                                   '<span class="label">{{c.id}}</span>' +
                                                   '<div ng-click="doClick(c.id, \'add\')" class="node-action fa fa-plus-square"></div>' +
                                                   '<div ng-click="doClick(c.id, \'remove\')" class="node-action fa fa-minus-square"></div>' +
                                                '</div>' +
                                                '<div class="line" ng-style="connector(c.id, b.id)"></div>' +
                                            '</div>' +

                                            '<ul ng-if="c.children.length">' +
                                                '<li ng-repeat="d in c.children">' +
                                                    '<div id="node-{{d.id}}">' +
                                                        '<div class="node">' +
                                                           '<span class="label">{{d.id}}</span>' +
                                                           '<div ng-click="doClick(d.id, \'add\')" class="node-action fa fa-plus-square"></div>' +
                                                           '<div ng-click="doClick(d.id, \'remove\')" class="node-action fa fa-minus-square"></div>' +
                                                        '</div>' +
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
                    // '<menu>' +
                    //     '<li>Add Node</li>' +
                    //     '<li>Delete Node</li>' +
                    //     '<li>Settings</li>' +
                    // '</menu>' +

                '</div>',

            link: function link(scope, element) {
            }
        };
    }]);

})(window.angular, window._);
