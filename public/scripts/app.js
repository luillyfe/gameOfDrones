'use strict';

/* App Module */

angular.module('gameOfDrone', [
  'ngRoute',
  'gameServices',
  'gameControllers'
])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'partials/start.html',
        controller: 'startCtrl'
      }).
      when('/round', {
        templateUrl: 'partials/round.html',
        controller: 'roundCtrl'
      }).
      when('/results', {
        templateUrl: 'partials/results.html',
        controller: 'resultsCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      });
  }]);
