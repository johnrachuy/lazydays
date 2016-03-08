var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController'
        })
        .when('/site', {
            templateUrl: '/views/templates/site.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: 'home'
        });


}]);