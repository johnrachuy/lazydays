var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: '/views/templates/login.html',
            controller: 'HomeController'
        })
        .when('/site/:site_number', {
            templateUrl: '/views/templates/site.html',
            controller: 'SiteController'
        })
        .otherwise({
            redirectTo: 'home'
        });


}]);

