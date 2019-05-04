var app = angular.module('wine',["ngRoute"])
    .controller('wineCtrl',WineCtrl)
    .factory('wineApi',wineApi)
    .constant('apiUrl','http://localhost:1337');

function WineCtrl($scope, wineApi) {

    this.$onInit = function() {
        refreshVarieties();
        getReviewArray();
        getContinents();
        // $scope.searchReviews();
        getCountries();
        getFromCountries();
        console.log("init");
    };

    // $scope stuff and functions go here
    $scope.getReviewArray = getReviewArray;
    $scope.getCountries = getCountries;
    $scope.getFromCountries = getFromCountries;
    $scope.reviews = [];
    $scope.varieties = [];
    $scope.continents = [];
    $scope.searchResults = [];
    $scope.countries = [];
    $scope.country = 'country';
    $scope.countrySelect = '';

    var loading = false;

    function getReviewArray() {
        wineApi.getReviews()
            .then(function (success) {
                $scope.reviews = success.data[0];
                // console.log(success)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    $scope.isLoading = function isLoading(){
        return loading;
    };

    function refreshVarieties() {
        wineApi.getVarieties()
            .then(function (success) {
                $scope.varieties = success.data;
                // console.log(success)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getContinents() {
        wineApi.getContinents()
            .then(function (success) {
                $scope.continents = success.data;
                // console.log(success)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getCountries() {
        wineApi.getType($scope.country)
            .then(function (success) {
                $scope.countries = success.data;
                console.log(success);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // function getFromCountries() {
    //     wineApi.getFromCountry($scope.countrySelect)
    //         .then(function (success) {
    //             $scope.countries = success.data;
    //             console.log(success);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    }

    // function refreshReviews(){
    //     loading=true;
    //     $scope.errorMessage='';
    //     wineApi.getReviews()
    //         .success(function(data){
    //             $scope.reviews=data;
    //             loading=false;
    //         })
    //         .error(function () {
    //             $scope.errorMessage="Unable to load Reviews:  Database request failed";
    //             loading=false;
    //         });
    // }

    // needs to be "scoped" to work for some reason...
    $scope.searchReviews = function searchReviews(){
        // don't do anything if nothing has been changed
        if(!$scope.searchTerm && !$scope.variety && !$scope.vintage && !$scope.continent) {
            return;
        }
        wineApi.getSearch($scope.searchTerm,$scope.variety,$scope.vintage,$scope.continent)
            .then(function(success){
                $scope.reviews = success.data;
                // console.log($scope.reviews[0]);

            })
            .catch(function (error) {
                console.log(error);
            });

    }

}

function wineApi($http,apiUrl) {
    return {
        // get a random set of reviews for the main page
        getReviews: function() {
            var url = apiUrl +'/reviews';
            return $http.get(url);
        },

        // get list of varieties
        getVarieties: function(){
            var url = apiUrl + '/varieties';
            return $http.get(url);
        },

        // get list of continents
        getContinents: function(){
            var url = apiUrl + '/continents';
            return $http.get(url);
        },

        // get list of the type searched by and how many wines there are by each distinct type
        getType: function(type){
            var url = apiUrl + '/listAllOfType?type=' + type;
            return $http.get(url);
        },

        // search based on input from the search bar
        getSearch: function(searchTerm,variety,vintage,continent){
            var url = apiUrl + '/search?';
            if(searchTerm && searchTerm != "") {
                url += 'searchTerm=' + searchTerm + '&';
            }
            if(variety && variety != "") {
                url += 'variety=' + variety + '&';
            }
            if(vintage && vintage != "") {
                url += 'vintage=' + vintage + '&';
            }
            if(continent && continent != "") {
                url += 'continent=' + continent;
            }
            return $http.get(url);
        },

        // filter by country
        getFromCountry: function(country){
            var url = apiUrl + '/countries?country=' + country;
            return $http.get(url);
        },

        // sort by ratio of price to score (value)
        getValue: function() {
            var url = apiUrl + '/value';
            return $http.get(url);
        },

        // Filter by a taster
        getTaster: function(taster){
            var url = apiUrl + '/taster?filter=' + taster;
            return $http.get(url);
        },

        // Post a user review (not finished, feature may not end up being implemented)
        postReview: function(review) {
            var url = apiUrl + '/userReview';
            return $http.put(url);
        }

    };
}

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "main.html"
        })
        //countries
        .when("/countryList", {
            templateUrl : "./country/countryList.html"
        })
        .when("/countryHighRated", {
            templateUrl : "./country/countryHighRated.html"
        })
        .when("/countryBestValue", {
            templateUrl : "./country/countryBestValue.html"
        })
        .when("/countryExpensive", {
            templateUrl : "./country/countryExpensive.html"
        })
        .when("/countryCheap", {
            templateUrl : "./country/countryCheap.html"
        })
        .when("/countryDetails", {
            templateUrl : "./country/countryDetails.html"
        })
        //variety
        .when("/varietyList", {
            templateUrl : "./variety/varietyList.html"
        })
        .when("/varietyHighRated", {
            templateUrl : "./variety/varietyHighRated.html"
        })
        .when("/varietyBestValue", {
            templateUrl : "./variety/varietyBestValue.html"
        })
        .when("/varietyExpensive", {
            templateUrl : "./variety/varietyExpensive.html"
        })
        .when("/varietyCheap", {
            templateUrl : "./variety/varietyCheap.html"
        })
        //overall
        .when("/overallHighRated", {
            templateUrl : "./overall/overallHighRated.html"
        })
        .when("/overallBestValue", {
            templateUrl : "./overall/overallBestValue.html"
        })
        .when("/overallExpensive", {
            templateUrl : "./overall/overallExpensive.html"
        })
        .when("/overallCheap", {
            templateUrl : "./overall/overallCheap.html"
        })

        .when("/search", {
            templateUrl : "search.html"
        });
});
