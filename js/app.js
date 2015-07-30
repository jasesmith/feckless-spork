(function($angular, _) {
    'use strict';

    $angular.module('app', ['jamfu'])
    .controller('AppController', ['$scope', function($scope) {

        $scope.headline = 'Feckless Spork';
        $scope.icon = 'share-alt';

    }]);
})(window.angular, window._);
