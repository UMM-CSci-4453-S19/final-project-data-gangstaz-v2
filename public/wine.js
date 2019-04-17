angular.module('wine',[])
    .controller('wineCtrl',WineCtrl)
    .factory('wineApi',wineApi)
    .constant('apiUrl','http://localhost:1337');

function WineCtrl($scope, wineApi) {
    // $scope stuff and functions go here
    $scope.reviews = [
        {
            taster: {
                name: 'Roger Voss',
                twitter: '@vossroger'
            },
            title: 'Demetria 2010 RosÃ© (Santa Ynez Valley)',
            description: 'Bubblegummy and fresh in acidity, this rosÃ© tastes like a young Beaujolais, with strawberry and raspberry fruit. It\'s an enjoyable wine to wash down little tapas plates of olives, ham, salted nuts.',
            points: 87,
            price: 20

        },
        {
            taster: {
                name: 'Roger Voss',
                twitter: '@vossroger'
            },
            title: 'Demetria 2010 RosÃ© (Santa Ynez Valley)',
            description: 'Bubblegummy and fresh in acidity, this rosÃ© tastes like a young Beaujolais, with strawberry and raspberry fruit. It\'s an enjoyable wine to wash down little tapas plates of olives, ham, salted nuts.',
            points: 87,
            price: 20
        }
    ]
}

function wineApi($http,apiUrl) {
    return {
        // calls to api go here
    };
}

