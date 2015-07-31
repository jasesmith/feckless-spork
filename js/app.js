(function($angular, _) {
    'use strict';

    $angular.module('app', ['jamfu'])
    .controller('AppController', ['$scope', function($scope) {

        $scope.headline = 'Feckless Spork';
        $scope.icon = 'share-alt';

        $scope.model = [
            {id: 0, children: [
                {id: 1, children: [
                    {id: 11, children: [
                        {id: 111},
                        {id: 112}
                    ]},
                    {id: 12}
                ]},

                {id: 2, children: [
                    {id: 21},
                    {id: 22},
                    {id: 23, children: [
                        {id: 231}
                    ]}
                ]},

                {id: 3, children: [
                    // {id: 31, children: [
                    //     {id: 311},
                    //     {id: 312},
                    //     {id: 313}
                    // ]},
                    // {id: 32}
                ]},

                // {id: 4, children: [
                //     {id: 41}
                // ]},
                //
                // {id: 5}
            ]}
        ];

    }]);
})(window.angular, window._);
