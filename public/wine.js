var app = angular.module('wine',["ngRoute"])
    .controller('wineCtrl',WineCtrl)
    .factory('wineApi',wineApi)
    .constant('apiUrl','http://localhost:1337');

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "main.html"
        })
        .when("/featured", {
            templateUrl : "featured.html"
        })
        .when("/countries", {
            templateUrl : "countries.html"
        })
        .when("/value", {
            templateUrl : "value.html"
        })
        .when("/pagination", {
            templateUrl : "pag_index.html"
        })
        .when("/search", {
            templateUrl : "search.html"
        });
});

function WineCtrl($scope, wineApi) {
    // $scope stuff and functions go here
    $scope.getReviewArray = getReviewArray;
    $scope.reviews = [];
    $scope.varieties = ['Rosa', 'Syra', 'White Blend', 'Nic McPhee'];

    var loading = false;

    function getReviewArray() {
        wineApi.getReviews()
            .then(function (success) {
                $scope.reviews = success.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function isLoading(){
        return loading;
    }

    function refreshVarieties(){
        loading=true;
        $scope.errorMessage='';
        wineApi.getVarieties()
            .success(function(data){
                $scope.varieties=data;
                loading=false;
            })
            .error(function () {
                $scope.errorMessage="Unable to load Reviews:  Database request failed";
                loading=false;
            });
    }

    function refreshReviews(){
        loading=true;
        $scope.errorMessage='';
        wineApi.getReviews()
            .success(function(data){
                $scope.reviews=data;
                loading=false;
            })
            .error(function () {
                $scope.errorMessage="Unable to load Reviews:  Database request failed";
                loading=false;
            });
    }

    function searchReviews(){
        // navigate back to the home page
        $location.path('/');
        console.log($scope.searchRegex+$scope.variety+$scope.vintage+$scope.continent);
        loading = true;
        wineApi.getSearch($scope.searchRegex,$scope.variety,$scope.vintage,$scope.continent)
            .success(function(data){
                $scope.reviews=data;
                loading = false;
            })
            .error(function () {
                $scope.errorMessage="unable to load search: Database request failed";
                loading = false;
            });
    }

    getReviewArray();


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

        // search based on input from the search bar
        getSearch: function(searchRegex,variety,vintage,continent){
            var url = apiUrl + '/search?regex=' + searchRegex;
            if(variety) {
                url += '&variety=' + variety;
            }
            if(vintage) {
                url += '&vintage=' + vintage;
            }
            if(continent) {
                url += '&vintage=' + continent;
            }
            return $http.get(url);
        },

        // filter by country
        getFromCountry: function(country){
            var url = apiUrl + '/countries?filter=' + country;
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

