(function (angular) {
    'use strict';

    angular.module('app', ['ui.router','cgPrompt', 'ngProgress', 'ngValid'])
    .config(config)
    .run(run);

    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/todo-app');
    }

    run.$inject = [];
    function run() {
        
    }

})(angular);
