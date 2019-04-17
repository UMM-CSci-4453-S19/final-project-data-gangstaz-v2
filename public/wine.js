angular.module('wine',[])
    .controller('wineCtrl',WineCtrl)
    .factory('wineApi',wineApi)
    .constant('apiUrl','http://localhost:1337');

function WineCtrl($scope, wineApi) {
    // $scope stuff and functions go here
}

function wineApi($http,apiUrl) {
    return {
        // calls to api go here
    };
}

