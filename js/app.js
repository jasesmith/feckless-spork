(function($angular, _) {
    'use strict';

    angular.module('app', ['jamfu']).controller('AppController', ['$scope', 'UtilityService', function($scope, utils) {

        $scope.headline = 'Feckless Spork';
        $scope.icon = 'share-alt';

        $scope.model = [
            {id: 0, label: '', type: '', line: '', children: [
                {id: 1, label: '', type: '', line: '', children: [
                    {id: 11, label: '', type: 'other', line: 'remote', children: [
                        {id: 111, label: '', type: '', line: ''},
                        {id: 112, label: '', type: '', line: ''}
                    ]},
                    {id: 12, label: '', type: '', line: ''}
                ]},

                {id: 2, label: '', type: '', line: '', children: [
                    {id: 21, label: '', type: '', line: ''},
                    {id: 22, label: '', type: '', line: ''},
                    {id: 23, label: '', type: '', line: '', children: [
                        {id: 231, label: '', type: '', line: ''},
                        {id: 232, label: '', type: '', line: ''},
                        {id: 233, label: '', type: '', line: ''}
                    ]},
                    {id: 24, label: '', type: '', line: ''}
                ]},
            ]}
        ];

        $scope.config = {
            templateUrl: 'sporklet.html'
        };

        $scope.doAddNode = function(node){
            if(!node.children) {
                node.children = [];
            }
            var i = node.children.length + 1;
            node.children.push({id: parseInt('' + node.id + i)});
            $scope.toggleMenu();
        };

        $scope.doRemoveNode = function(node){
            var found = utils.findDeep($scope.model, node.id, false, 'remove');
            $scope.toggleMenu();
        };

        $scope.doEditNode = function(node){
            window.console.log('edit node', node.id, node);
        };

        $scope.toggleMenu = function(){
            $scope.showMenu = !$scope.showMenu;
        };

        $scope.showMenu = false;

        $scope.$on('spork:mouseenter', function(event){
            window.console.log('spork:mouseenter');
        });

        $scope.$on('spork:mouseleave', function(event){
            window.console.log('spork:mouseleave');
            $scope.showMenu = false;
        });

        $scope.$on('spork:node:mouseenter', function(event, node){
            window.console.log('spork:node:mouseenter', node.id);
            $scope.node = node;
            $scope.showMenu = true;
            var e = $angular.element('#node-' + node.id)[0];
            var en = utils.getNumbers(e);
            var menu = $('.spork-menu')[0];
            $(menu).css({
                top: en.cy,
                left: en.r
            });
        });

        $scope.$on('spork:node:click', function(event, node){
            window.console.log('spork:node:click', node.id);
            $scope.doAddNode(node);
        });

        $scope.$on('spork:node:mouseleave', function(event, node){
            window.console.log('spork:node:mouseleave', node.id);
        });

    }]);

})(window.angular, window._);
