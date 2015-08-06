(function($angular, _) {
    'use strict';
    var moduleDependencies = [
        'jamfu'
    ];

    $angular.module('app', moduleDependencies)
        .controller('AppController', ['$scope', 'UtilityService', function($scope, utils) {

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
                        {id: 231},
                        {id: 232},
                        {id: 233}
                    ]},
                    {id: 24}
                ]},
            ]}
        ];

        $scope.doClick = function($event){
            $scope.$emit('spork:node:click', {id: nodeId, action: action});
        };

        $scope.$on('spork:node:click', function(event, data){
            var item = utils.findDeep($scope.model, data.id);
            window.console.log(item);
        });

    }]);

})(window.angular, window._);
