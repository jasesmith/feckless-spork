(function($angular, _) {
    'use strict';

    $angular.module('app').directive('spork', ['$window', function spork($window) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=?'
            },

            controller: ['$scope', function controller($scope) {

            }],

            template: '' +
                '<div class="spork {{config.style}}">' +
                '</div>',

            link: function link(scope, element) {
                var defaultConfig = {};
                scope.config = $.extend(true, $angular.copy(defaultConfig), scope.config);
            }
        };
    }]);

})(window.angular, window._);
