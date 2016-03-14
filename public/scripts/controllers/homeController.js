myApp.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.date = new Date();
    $scope.tomorrow = new Date();
    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);

    $scope.getMap = function () {
        getMap();
    };

    getMap();

    function getMap() {
        $http.get('/get_map/'+ $scope.date).then(function(response) {
            $scope.mapData = response.data;
            //console.log($scope.mapData);
            for(var i = 1; i < 100; i++) {
                var thing = '#site' + i;
                var site = document.querySelector(thing);
                if(site) {
                    // site is NOT null
                    var $site = angular.element(site);
                    $site.removeClass('booked');
                }
            }
            for(var j = 0; j < $scope.mapData.length; j++) {
                //console.log($scope.mapData[j]);
                var csite = document.querySelector('#site' + $scope.mapData[j].site_number);
                if(csite) {
                    // site is NOT null
                    var $csite = angular.element(csite);
                    $csite.addClass('booked');
                }
            }

        });
    };

    $scope.nextDay = function() {
        $scope.tomorrow = new Date();
    };

    $scope.prevDay = function() {

    };

    $scope.selectedName = null;
    $scope.getNames = [];

    $http.get('/get_names').then(function(response) {
        $scope.getNames = response.data;
    });

    $scope.getInfo = function() {
        $http.get('/get_info/'+ $scope.selectedName).then(function(response) {
            $scope.viewData = response.data;
        });
    };

    $scope.go = function(path) {
        $location.path(path);
    };

    console.log('Home Controller');
}]);

myApp.directive('site', function() {
    return {
        scope:{},
        restrict: 'E',
        link: function(scope, element, attrs) {
            //element.addClass('booked');
            //element.bind('click', function(e){element.toggleClass('booked')});
        }
    }
});