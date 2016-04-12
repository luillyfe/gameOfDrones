'use strict';

/* Controllers */

angular.module('gameControllers', ['gameServices'])

.controller('startCtrl', ['$scope', 'settings', function($scope, settings) {
  $scope.game = settings.getStart()
  
  $scope.redirect = function(url) {
  	settings.setPlayers([{name:$scope.playerOne, points:0}, 
  	  {name:$scope.playerTwo, points:0}])

  	settings.setScope($scope)
    settings.redirect(url)
  }
  
}])

.controller('roundCtrl', ['$scope', '$http', 'settings', function($scope, $http, settings) {
	$http({method: 'GET', url:'/api/rules.json'}).then(function(response) {
  	$scope.moves = response.data
  	$scope.moveChose = response.data[0]
  });

  var game = {
    players: settings.getPlayers(),
    moves: [],
    rounds: settings.getRounds()
  }
	$scope.round = game.rounds[0]
	$scope.players = game.players

	$scope.setRound = function () {
    try { game.moves.push(JSON.parse($scope.moveChose))
    } catch(e) { 
      alert('You should choose an move!')
      return 
    }

	  if ($scope.roundIndex === 2 && $scope.round.playerMoves === game.players[1].name) {
	    $scope.roundIndex = 0
	    $scope.round = game.rounds[$scope.roundIndex]

  	  settings.setScope($scope)
  	  settings.setMoves(game.moves)
      settings.redirect('#/results')
	  } else if ($scope.round.playerMoves === game.players[1].name) {
	  	setPlayer()
	  	
      $scope.roundIndex = $scope.roundIndex + 1
	    $scope.round = game.rounds[$scope.roundIndex]
	    $scope.players = settings.getScore(game.moves)
	  } else { setPlayer() }
	}

	var setPlayer = function () {
	  $scope.round.playerMoves = ($scope.round.playerMoves === game.players[0].name) 
	    ? game.players[1].name : game.players[0].name
	}

	var setRoundWinner = function () {
	  //
	}

}])

.controller('resultsCtrl', ['$scope', 'settings', function($scope, settings) {
  $scope.results = settings.getResults()
  
  $scope.redirect = function(url) {
  	//settings.setPlayers([$scope.playerOne, $scope.playerTwo]);

  	settings.setScope($scope)
    settings.redirect(url)
  }
  
}])
