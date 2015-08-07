(function($angular, _) {
    'use strict';

    angular.module('app', ['jamfu']).controller('AppController', ['$scope', 'UtilityService', function($scope, utils) {

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

        $scope.config = {
            templateUrl: 'sporklet.html'
        };

        $scope.doAddNode = function(node){
            // var item = utils.findDeep($scope.model, node.id);
            // var index = _.findWhere($scope.model, {id: node.id});
            if(!node.children) {
                node.children = [];
            }
            var i = node.children.length + 1;
            node.children.push({id: parseInt('' + node.id + i)});
            $scope.toggleMenu();
        };

        $scope.doRemoveNode = function(node){
            var found = utils.findDeep($scope.model, node.id, false, 'remove');
            window.console.log('remove', node.id, found);
            // $scope.model = _.filter($scope.model, function(n){
            //     return n.id !== node.id;
            // });
        };

        $scope.doEditNode = function(node){
            // var node = utils.findDeep($scope.model, node.id);
            window.console.log('edit', node.id, node);
        };


        $scope.toggleMenu = function(){
            $scope.showMenu = !$scope.showMenu;
        };


        $scope.showMenu = false;

        $scope.$on('spork:node:click', function(event, data){
            // var item = utils.findDeep($scope.model, node.id);
            $scope.node = data;
            $scope.showMenu = true;
            var e = $angular.element('#node-' + data.id)[0];
            var en = utils.getNumbers(e);
            var menu = $('#spork-menu')[0];
            $(menu).css({
                top: en.cy,
                left: en.r
            });


        });

    }]);

})(window.angular, window._);
