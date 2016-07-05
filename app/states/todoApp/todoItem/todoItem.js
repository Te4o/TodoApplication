(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('todoItem', todoItem);
        
    function todoItem() {
        var directive = {
            templateUrl: './states/todoApp/todoItem/todoItem.html',
            restrict: 'E',
            controller: controller,
            scope: {
                data: '=',
                list: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'todo'];
    function controller($scope, todo) {
        $scope.vm = {};
        $scope.todo = todo;
        $scope.vm.show = false;
        $scope.save = save;
        $scope.edit = edit;
        $scope.remove = remove;
        

        function save() {
            $scope.vm.show = false;
            alertify.success('Edited Todo Item');
        }

        function edit() {
            $scope.vm.show = true;
        }

        function remove() {
            alertify.error('Deleted!');
        }


    }

}(angular));