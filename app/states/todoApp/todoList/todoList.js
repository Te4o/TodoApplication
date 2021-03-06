(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('todoList', todoList);
        
    function todoList() {
        var directive = {
            templateUrl: './states/todoApp/todoList/todoList.html',
            restrict: 'E',
            controller: controller,
            scope: {
                data: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'todo'];
    function controller($scope, todo) {
        $scope.vm = {};
        $scope.addTodoIntoList = addTodoIntoList;
        $scope.todo = todo;
        $scope.vm.show = false;
        $scope.save = save;
        $scope.edit = edit;
        $scope.remove = remove;
        $scope.submitForm = submitForm;

        function addTodoIntoList() {
            todo.addATodo($scope.data.id, $scope.vm.name);
            $scope.userForm.name.$pristine = true;
            $scope.vm.name = ''; //flush the field for name
        }

        function save() {
            $scope.vm.show = false;
            alertify.success('Edited todo item');
        }

        function edit() {
            $scope.vm.show = true;
        }
 
        function remove() {
            alertify.error('Deleted!');
        }

        function submitForm() {
            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                alert('our form is amazing');
            }
        }



    }

}(angular));