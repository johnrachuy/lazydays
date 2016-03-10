myApp.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.selectedName = null;
    $scope.getNames = [];

    $http.get('/get_names').then(function(response) {
        $scope.getNames = response.data;
        console.log($scope.getNames);
    });

    $scope.date = new Date();

    $scope.go = function(path) {
        $location.path(path);
    };

    console.log('Home Controller');
}]);