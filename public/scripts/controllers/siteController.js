myApp.controller('SiteController', ['$scope', '$http', '$location', '$filter', '$routeParams', function($scope, $http, $location, $filter, $routeParams) {

    $scope.site_number = $routeParams.site_number;

    $scope.postForm = function() {
        var reservation = {
            site_number: $scope.site_number,
            site_class: $scope.site.class,
            check_in: $scope.check_in,
            check_out: $scope.check_out,
            first_name : $scope.first_name,
            last_name: $scope.last_name,
            phone: $scope.phone,
            email: $scope.email,
            street_address: $scope.street_address,
            city: $scope.city,
            state: $scope.state,
            zip_code: $scope.zip_code,
            people_num: $scope.people_num,
            pet_num: $scope.pet_num,
            rate: $scope.rate,
            tax: $scope.tax,
            hold: $scope.hold,
            notes: $scope.notes
        };

        $http.post('/post_res', reservation).then(function(response) {
                $scope.post = response.data;
                $scope.site.class = '',
                $scope.check_in = '',
                $scope.check_out = '',
                $scope.first_name = '',
                $scope.last_name = '',
                $scope.phone = '',
                $scope.email = '',
                $scope.street_address = '',
                $scope.city = '',
                $scope.state = '',
                $scope.zip_code = '',
                $scope.people_num = '',
                $scope.pet_num = '',
                $scope.rate = '',
                $scope.tax = '',
                $scope.hold = '',
                $scope.notes = ''
        });
        console.log(reservation);

    };

    $scope.go = function(path) {
        $location.path(path);
    };



    console.log('Site Controller');
}]);