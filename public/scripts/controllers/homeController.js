myApp.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.date = new Date();

    $scope.getMap = function () {
        getMap();
    };

    getMap();

    function getMap() {
        $http.get('/get_map/'+ $scope.date).then(function(response) {
            $scope.mapData = response.data;
            console.log($scope.mapData);
            for(var i = 1; i < 100; i++) {
                var thing = '#site' + i;
                var site = document.querySelector(thing);
                if(site) {
                    // site is NOT null
                    var $site = angular.element(site);
                    $site.removeClass('seasonal monthly weekly holiday nightly');
                }
            }
            for(var j = 0; j < $scope.mapData.length; j++) {
                //console.log($scope.mapData[j]);
                var csite = document.querySelector('#site' + $scope.mapData[j].site_number);
                if(csite) {
                    var $csite = angular.element(csite);
                    switch ($scope.mapData[j].site_class) {
                        case 'seasonal':
                            $csite.addClass('seasonal');
                            break;
                        case 'monthly':
                            $csite.addClass('monthly');
                            break;
                        case 'weekly':
                            $csite.addClass('weekly');
                            break;
                        case 'holiday':
                            $csite.addClass('holiday');
                            break;
                        case 'nightly':
                            $csite.addClass('nightly');
                            break;
                    };
                }
            }
        });
    };

    $scope.selectedName = null;
    $scope.getNames = [];

    $http.get('/get_names').then(function(response) {
        $scope.getNames = response.data;
    });

    $scope.getInfo = function() {
        $http.get('/get_info/'+ $scope.selectedName).then(function(response) {
            $scope.viewData = response.data;
            $scope.selectedName = null;
        });
    };

    $scope.go = function(path) {
        $location.path(path);
    };



    $scope.today = function() {
        $scope.date = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }


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