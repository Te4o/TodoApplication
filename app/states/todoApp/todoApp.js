(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('todoApp', todoApp)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('todoApp', {
                url: '/todo-app',
                template: '<todo-app></todo-app>'
            });
    }

    function todoApp() {
        var directive = {
            templateUrl: './states/todoApp/todoApp.html',
            restrict: 'E',
            controller: controller,
            scope: {
                name: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'todo', 'prompt', 'ngProgressFactory'];
    function controller($scope, todo, prompt, ngProgressFactory) {

        $scope.vm = {};
        $scope.listOfTodoLists = listOfTodoLists;
        $scope.todo = todo;
        $scope.addTodoList = addTodoList;

        // ng progress bar
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.start();
        $scope.progressbar.complete();  

        this.$onInit = function () {
            ngProgress.complete();
        };

        function addTodoList() {
             prompt({
                title: 'Enter a name of TODO list',
                input: true,
                label: 'Name',
                value: ''
             }).then(function(name) {
                todo.addList(name);
                name = '';
                
             }); 

        }

        function listOfTodoLists() {
            return todo.todoLists;
        } 
    }

}(angular));