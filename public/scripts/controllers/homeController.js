myApp.controller('HomeController', ['$scope', '$location', function($scope, $location) {

    $scope.date = new Date();

    $scope.go = function(path) {
        $location.path(path);
    };

    console.log('Home Controller');
}]);