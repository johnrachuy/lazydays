myApp.controller('SiteController', ['$scope', '$http', '$location', '$filter', '$routeParams', function($scope, $http, $location, $filter, $routeParams) {

    $scope.site_number = $routeParams.site_number;
    $scope.selectedName = null;
    $scope.getNames = [];

        getSite();

    $scope.setSeasonal = function() {
        $scope.rate = '1600.00';
    };

    $scope.setMonthly = function() {
        $scope.rate = '500.00';
    };

    $scope.setWeekly = function() {
        $scope.rate = '200.00';
    };

    $scope.setHoliday = function() {
        $scope.rate = '45.00';
    };

    $scope.setNightly = function() {
        $scope.rate = '40.00';
    };

    $scope.postForm = function() {
        var reservation = {
            site_number: $scope.site_number,
            site_class: $scope.site_class,
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
                $scope.site_class = '',
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

                getSite();
        });

        //console.log(reservation);
    };

    $http.get('/get_names').then(function(response) {
        $scope.getNames = response.data;
        //console.log($scope.getNames);
    });

    $scope.existingCust = function(){
        $http.get('/get_exist/'+ $scope.selectedName).then(function(response) {
            $scope.exist = response.data;
            //$scope.first_name =
            //$scope.last_name = $scope.existCust.last_name;
            console.log($scope.exist);
        });
    };

    $scope.editRes = function(index) {
         $scope.editForm = $scope.siteData[index];
        console.log($scope.editForm.site_class);
        $scope.site_class = $scope.editForm.site_class;
        //$scope.check_in = $scope.editForm.check_in;
        //$scope.check_out = $scope.editForm.check_out;
        $scope.first_name = $scope.editForm.first_name;
        $scope.last_name = $scope.editForm.last_name;
        $scope.phone = $scope.editForm.phone;
        $scope.email = $scope.editForm.email;
        $scope.street_address = $scope.editForm.street_address;
        $scope.city = $scope.editForm.city;
        $scope.state = $scope.editForm.state;
        $scope.zip_code = $scope.editForm.zip_code;
        $scope.people_num = $scope.editForm.people_num;
        $scope.pet_num = $scope.editForm.pet_num;
        $scope.rate = $scope.editForm.rate;
        $scope.tax = $scope.editForm.tax;
        $scope.hold = $scope.editForm.hold;
        $scope.notes = $scope.editForm.notes;
    };

    //$scope.editRes = function() {
    //    $http.get('/edit_res/'+ $scope.site_number).then(function(response) {
    //        $scope.siteData = response.data;
    //};



    function getSite() {
        $http.get('/get_site/'+ $scope.site_number).then(function(response) {
            $scope.siteData = response.data;
            //console.log($scope.siteData);
        });
    };

    $scope.go = function(path) {
        $location.path(path);
    };



    console.log('Site Controller');
}]);