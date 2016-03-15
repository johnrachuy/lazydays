myApp.controller('SiteController', ['$scope', '$http', '$location', '$filter', '$routeParams', function($scope, $http, $location, $filter, $routeParams) {

    $scope.site_number = $routeParams.site_number;
    $scope.selectedName = null;
    $scope.customer_id = null;
    $scope.reservation_id = null;
    $scope.fk_customer_id = null;
    $scope.getNames = [];
    $scope.editForm = {};

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
            notes: $scope.notes,
            customer_id: $scope.customer_id,
            reservation_id: $scope.reservation_id,
            fk_customer_id: $scope.fk_customer_id
        };

        if ($scope.reservation_id > 1) {
            console.log('existing reservation');

            $http.post('/update_res', reservation).then(function(response) {
                $scope.post = response.data;

                $scope.site_class = null;
                $scope.check_in = null;
                $scope.check_out = null;
                $scope.first_name = null;
                $scope.last_name = null;
                $scope.phone = null;
                $scope.email = null;
                $scope.street_address = null;
                $scope.city = null;
                $scope.state = null;
                $scope.zip_code = null;
                $scope.people_num = null;
                $scope.pet_num = null;
                $scope.rate = null;
                $scope.tax = null;
                $scope.hold = null;
                $scope.notes = null;

                getSite();
            });
        } else if ($scope.customer_id > 1) {
            //if ($scope.exist[0]) {
                console.log('existing customer');

                $http.post('/post_exist', reservation).then(function(response) {
                    $scope.post = response.data;

                    $scope.site_class = null;
                    $scope.check_in = null;
                    $scope.check_out = null;
                    $scope.first_name = null;
                    $scope.last_name = null;
                    $scope.phone = null;
                    $scope.email = null;
                    $scope.street_address = null;
                    $scope.city = null;
                    $scope.state = null;
                    $scope.zip_code = null;
                    $scope.people_num = null;
                    $scope.pet_num = null;
                    $scope.rate = null;
                    $scope.tax = null;
                    $scope.hold = null;
                    $scope.notes = null;
                    $scope.selectedName = null;

                    getSite();
                });
            } else {
                console.log('new customer');

                $http.post('/post_res', reservation).then(function(response) {
                    $scope.post = response.data;

                    $scope.site_class = null;
                    $scope.check_in = null;
                    $scope.check_out = null;
                    $scope.first_name = null;
                    $scope.last_name = null;
                    $scope.phone = null;
                    $scope.email = null;
                    $scope.street_address = null;
                    $scope.city = null;
                    $scope.state = null;
                    $scope.zip_code = null;
                    $scope.people_num = null;
                    $scope.pet_num = null;
                    $scope.rate = null;
                    $scope.tax = null;
                    $scope.hold = null;
                    $scope.notes = null;

                    getSite();
                });
            }
        }

    $http.get('/get_names').then(function(response) {
        $scope.getNames = response.data;
        //console.log($scope.getNames);
    });

    $scope.existingCust = function(){
        $http.get('/get_exist/'+ $scope.selectedName).then(function(response) {
            $scope.exist = response.data;

            $scope.first_name = $scope.exist[0].first_name;
            $scope.last_name = $scope.exist[0].last_name;
            $scope.phone = $scope.exist[0].phone;
            $scope.email = $scope.exist[0].email;
            $scope.street_address = $scope.exist[0].street_address;
            $scope.city = $scope.exist[0].city;
            $scope.state = $scope.exist[0].state;
            $scope.zip_code = $scope.exist[0].zip_code;
            $scope.customer_id = $scope.exist[0].customer_id;
            //console.log($scope.exist);
        });
    };

    $scope.editRes = function(index) {
        $scope.editForm = $scope.siteData[index];

        $scope.site_class = $scope.editForm.site_class;
        $scope.check_in = new Date($scope.editForm.check_in);
        $scope.check_out = new Date($scope.editForm.check_out);
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
        $scope.reservation_id = $scope.editForm.reservation_id;
        $scope.fk_customer_id = $scope.editForm.fk_customer_id;
    };

    $scope.cancelRes = function() {
        var cancel = {
            reservation_id: $scope.editForm.reservation_id
        };

        $http.put('/cancel_res', cancel).then(function(response) {
            $scope.cancel = response.data;
            $scope.site_class = null;
            $scope.check_in = null;
            $scope.check_out = null;
            $scope.first_name = null;
            $scope.last_name = null;
            $scope.phone = null;
            $scope.email = null;
            $scope.street_address = null;
            $scope.city = null;
            $scope.state = null;
            $scope.zip_code = null;
            $scope.people_num = null;
            $scope.pet_num = null;
            $scope.rate = null;
            $scope.tax =null;
            $scope.hold = null;
            $scope.notes = null;

            getSite();
        });
    };

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