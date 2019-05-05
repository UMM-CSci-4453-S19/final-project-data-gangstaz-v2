var app = angular.module('wine',["ngRoute"])
    .controller('wineCtrl', WineCtrl)
    .factory('wineApi', wineApi)
    .constant('apiUrl','http://localhost:1337');

function WineCtrl($scope, wineApi) {

    this.$onInit = function () {
        refreshVarieties();
        getReviewArray();
        getContinents();
        getCountries();
        // getFromCountries();
        getHighestRatedCountry();
        getBestValue();
        getHighestPriceCountry();
        getCheapestPriceCountry();
        getHighestPriceVariety();
        getHighestRatedVariety();
        getBestValueVariety();
        getCheapestPriceVariety();
        getHighestPriceOverall();
        getHighestRatedOverall();
        getBestValueOverall();
        getCheapestPriceOverall();
    };

    // $scope stuff and functions go here
    $scope.getReviewArray = getReviewArray;
    $scope.reviews = [];

    $scope.getCountries = getCountries;
    $scope.countries = [];
    $scope.selectCountry = 'country';

    $scope.getHighestRatedCountry = getHighestRatedCountry;
    $scope.countriesHighestRated = [];

    $scope.getCheapestPriceCountry = getCheapestPriceCountry;
    $scope.countriesCheapestPrice = [];

    $scope.getBestValue = getBestValue;
    $scope.countriesBestValue = [];

    ////////////////////////////////////////////////////////
    $scope.getHighestPriceVariety = getHighestPriceVariety;
    $scope.varietyHighestPrice = [];

    $scope.getHighestRatedVariety = getHighestRatedVariety;
    $scope.varietyHighestRated = [];

    $scope.getBestValueVariety = getBestValueVariety;
    $scope.varietyBestValue = [];

    $scope.getCheapestPriceVariety = getCheapestPriceVariety;
    $scope.varietyCheapestPrice = [];

    $scope.getHighestPriceOverall = getHighestPriceOverall;
    $scope.overallHighestPrice = [];

    $scope.getHighestPriceCountry = getHighestPriceCountry;
    $scope.countriesHighestPrice = [];
    ////////////////////////////////////////////////////////

    $scope.getHighestRatedOverall = getHighestRatedOverall;
    $scope.overallHighestRated = [];

    $scope.getBestValueOverall = getBestValueOverall;
    $scope.overallBestValue = [];

    $scope.getCheapestPriceOverall = getCheapestPriceOverall;
    $scope.overallCheapestPrice = [];

    $scope.varieties = [];
    $scope.continents = [];
    $scope.searchResults = [];

    $scope.getFromCountries = getFromCountries;
    $scope.specificCountryDetails = [];


    var loading = false;

    function getReviewArray() {
        wineApi.getReviews()
            .then(function (success) {
                $scope.reviews = success.data[0];
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    $scope.isLoading = function isLoading() {
        return loading;
    };

    function refreshVarieties() {
        wineApi.getVarieties()
            .then(function (success) {
                $scope.varieties = success.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getContinents() {
        wineApi.getContinents()
            .then(function (success) {
                $scope.continents = success.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getCountries() {
        wineApi.getType($scope.selectCountry)
            .then(function (success) {
                $scope.countries = success.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getHighestRatedCountry() {
        wineApi.getHighestRatedCountry($scope.selectCountry)
            .then(function (success) {
                $scope.countriesHighestRated = success.data[0];
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getCheapestPriceCountry() {
        wineApi.getCheapestPriceCountry()
            .then(function (success) {
                $scope.countriesCheapestPrice = success.data[0];
                console.log(success.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // function getCheapestPriceVariety() {
    //     wineApi.getCheapestPriceVariety()
    //         .then(function (success) {
    //             $scope.varietyCheapestPrice = success.data[0];
    //             // console.log(success.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }

    function getBestValue() {
        wineApi.getBestValue($scope.selectCountry)
            .then(function (success) {
                $scope.countriesBestValue = success.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /////////////////////////////////////////////////////////////
    function getHighestPriceVariety() {
        wineApi.getHighestPriceVariety()
            .then(function (success) {
                $scope.varietyHighestPrice = success.data[0];
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getHighestRatedVariety() {
        wineApi.getHighestRatedVariety()
            .then(function (success) {
                $scope.varietyHighestRated = success.data[0];
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getBestValueVariety() {
        wineApi.getBestValueVariety()
            .then(function (success) {
                $scope.varietyBestValue = success.data;
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getCheapestPriceVariety() {
        wineApi.getCheapestPriceVariety()
            .then(function (success) {
                $scope.varietyCheapestPrice = success.data[0];
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getHighestPriceOverall() {
        wineApi.getHighestPriceOverall()
            .then(function (success) {
                $scope.overallHighestPrice = success.data[0];
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getHighestPriceCountry(type) {
        wineApi.getHighestPriceCountry(type)
            .then(function (success) {
                $scope.countriesHighestPrice = success.data[0];
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /////////////////////////////////////////////////////////////

    function getHighestRatedOverall() {
        wineApi.getHighestRatedOverall()
            .then(function (success) {
                $scope.overallHighestRated = success.data[0];
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getBestValueOverall() {
        wineApi.getBestValueOverall()
            .then(function (success) {
                $scope.overallBestValue = success.data;
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getCheapestPriceOverall() {
        wineApi.getCheapestPriceOverall()
            .then(function (success) {
                $scope.overallCheapestPrice = success.data[0];
                // console.log(success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getFromCountries(country) {
        wineApi.getFromCountry(country)
            .then(function (success) {
                $scope.specificCountryDetails = success.data;
                $scope.specificCountry = success.data[0].country;
                // console.log(success.data[0].country);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    // needs to be "scoped" to work for some reason...
    $scope.searchReviews = function searchReviews() {
        // don't do anything if nothing has been changed
        if (!$scope.searchTerm && !$scope.variety && !$scope.vintage && !$scope.continent) {
            return;
        }
        wineApi.getSearch($scope.searchTerm, $scope.variety, $scope.vintage, $scope.continent)
            .then(function (success) {
                $scope.reviews = success.data;
                // console.log($scope.reviews[0]);

            })
            .catch(function (error) {
                console.log(error);
            });

    }

}

function wineApi($http, apiUrl) {
    return {
        // get a random set of reviews for the main page
        getReviews: function () {
            var url = apiUrl + '/reviews';
            return $http.get(url);
        },

        // get list of varieties
        getVarieties: function () {
            var url = apiUrl + '/varieties';
            return $http.get(url);
        },

        // get list of continents
        getContinents: function () {
            var url = apiUrl + '/continents';
            return $http.get(url);
        },

        // get list of the type searched by and how many wines there are by each distinct type
        getType: function (type) {
            var url = apiUrl + '/listAllOfType?type=' + type;
            return $http.get(url);
        },

        // get highest rated wine from each distinct type
        getHighestRatedCountry: function () {
            var url = apiUrl + '/highestRatedCountry';
            return $http.get(url);
        },

        // get highest rated wine from each distinct type
        getCheapestPriceCountry: function () {
            var url = apiUrl + '/cheapestPriceCountry';
            return $http.get(url);
        },

        // get highest rated wine from each distinct type
        getBestValue: function (type) {
            var url = apiUrl + '/bestValue?type=' + type;
            return $http.get(url);
        },

        ////////////////////////////////////////////////////
        // get highest priced wine from each distinct variety
        getHighestPriceVariety: function(){
            var url = apiUrl + '/highestPriceVariety';
            return $http.get(url);
        },

        // get highest rated wine from each distinct variety
        getHighestRatedVariety: function(){
            var url = apiUrl + '/highestRatedVariety';
            return $http.get(url);
        },

        // get best valued wine overall
        getBestValueVariety: function(){
            var url = apiUrl + '/bestValueVariety';
            return $http.get(url);
        },

        // get cheapest priced wine overall
        getCheapestPriceVariety: function(){
            var url = apiUrl + '/cheapestPriceVariety';
            return $http.get(url);
        },

        // get highest priced wine overall
        getHighestPriceOverall: function () {
            var url = apiUrl + '/highestPriceOverall';
            return $http.get(url);
        },

        // get highest rated wine from each distinct type
        getHighestPriceCountry: function () {
            var url = apiUrl + '/highestPriceCountry';
            return $http.get(url);
        },
        ////////////////////////////////////////////////////

        // get highest rated wine overall
        getHighestRatedOverall: function () {
            var url = apiUrl + '/highestRatedOverall';
            return $http.get(url);
        },

        // get best valued wine overall
        getBestValueOverall: function () {
            var url = apiUrl + '/bestValueOverall';
            return $http.get(url);
        },

        // get cheapest priced wine overall
        getCheapestPriceOverall: function () {
            var url = apiUrl + '/cheapestPriceOverall';
            return $http.get(url);
        },

        // search based on input from the search bar
        getSearch: function (searchTerm, variety, vintage, continent) {
            var url = apiUrl + '/search?';
            if (searchTerm && searchTerm != "") {
                url += 'searchTerm=' + searchTerm + '&';
            }
            if (variety && variety != "") {
                url += 'variety=' + variety + '&';
            }
            if (vintage && vintage != "") {
                url += 'vintage=' + vintage + '&';
            }
            if (continent && continent != "") {
                url += 'continent=' + continent;
            }
            return $http.get(url);
        },

        // filter by country
        getFromCountry: function (country) {
            var url = apiUrl + '/countries?country=' + country;
            // console.log("url is: " + url);
            return $http.get(url);
        },

        // sort by ratio of price to score (value)
        getValue: function () {
            var url = apiUrl + '/value';
            return $http.get(url);
        },

        // Filter by a taster
        getTaster: function (taster) {
            var url = apiUrl + '/taster?filter=' + taster;
            return $http.get(url);
        },

        // Post a user review (not finished, feature may not end up being implemented)
        postReview: function (review) {
            var url = apiUrl + '/userReview';
            return $http.put(url);
        }

    };
}

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html"
        })
        //countries
        .when("/countryList", {
            templateUrl: "./country/countryList.html"
        })
        .when("/countryHighRated", {
            templateUrl: "./country/countryHighRated.html"
        })
        .when("/countryBestValue", {
            templateUrl: "./country/countryBestValue.html"
        })
        .when("/countryExpensive", {
            templateUrl: "./country/countryExpensive.html"
        })
        .when("/countryCheap", {
            templateUrl: "./country/countryCheap.html"
        })
        .when("/countryDetails", {
            templateUrl: "./country/countryDetails.html"
        })
        //variety
        .when("/varietyList", {
            templateUrl: "./variety/varietyList.html"
        })
        .when("/varietyHighRated", {
            templateUrl: "./variety/varietyHighRated.html"
        })
        .when("/varietyBestValue", {
            templateUrl: "./variety/varietyBestValue.html"
        })
        .when("/varietyExpensive", {
            templateUrl: "./variety/varietyExpensive.html"
        })
        .when("/varietyCheap", {
            templateUrl: "./variety/varietyCheap.html"
        })
        .when("/varietyDetails", {
            templateUrl : "./variety/varietyDetails.html"
        })
        //overall
        .when("/overallHighRated", {
            templateUrl: "./overall/overallHighRated.html"
        })
        .when("/overallBestValue", {
            templateUrl: "./overall/overallBestValue.html"
        })
        .when("/overallExpensive", {
            templateUrl: "./overall/overallExpensive.html"
        })
        .when("/overallCheap", {
            templateUrl: "./overall/overallCheap.html"
        })

        .when("/search", {
            templateUrl: "search.html"
        });
});


