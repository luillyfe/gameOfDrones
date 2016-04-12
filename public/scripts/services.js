'use strict';

/* Services */

angular.module('gameServices', [])

.factory('settings', ['$window', '$location',
  function ($window, $location) {
  	var game = {
  	  scope: {},
  	  players: [{name:'Player one', points:0}, {name:'Player Two', points:0}],
  	  moves: []
  	}
  	

    return {
      getStart: function () {
      	return { title: 'Enter player\'s names', playerOne: 'Player one',
      	    playerTwo: 'Player two', start: 'Start game' }
      },
	  getRounds: function () {
	  	return [
	      { title: 'Round One', playerMoves: game.players[0].name},
	      { title: 'Round Two', playerMoves: game.players[0].name},
	      { title: 'Last round', playerMoves: game.players[0].name}
	    ]
	  },
	  getResults: function () {
	  	var limit = this.getMoves().length-2,
	  	  moves = this.getMoves(),
	  	  points = 0,
	  	  winner = 'No winner'

	  	for (var i = 0; i <= limit; i=i+2) {
	  	  if (moves[i].greater===moves[i+1].name) points = points+1
	  	  else if (moves[i].lower===moves[i+1].name) points = points-1
	  	}
	    
	    if (points>0) winner = game.players[0].name
	    else if (points<0) winner = game.players[1].name

	  	return { title: 'We have a Winnner', winner: winner, message: 'is the new EMPEROR' }
	  },
	  setScope: function (scope) {
	  	game.scope = scope
	  },
	  setMoves: function (moves) {
	  	game.moves = moves
	  },
	  getMoves: function () {
	  	return game.moves
	  },
	  setPlayers: function (players) {
	  	game.players = (players[0].name === undefined && players[1].name === undefined) ?
	  	  game.players : players
	  },
	  getPlayers: function () {
	  	return game.players
	  },
	  getScore: function (moves) {
	  	var limit = moves.length-2
        game.players.forEach(function (player) {
          player.points = 0
        })

  	    if (Math.abs(moves.length % 2) == 1) return "You should finish a round!"

  	    for (var i = 0; i <= limit; i=i+2) {
  		  if (moves[i].greater===moves[i+1].name) {
  		    game.players[0].points = game.players[0].points+1
  		  } else if (moves[i].lower===moves[i+1].name) {
  		    game.players[1].points = game.players[1].points+1
  		  }
  	    }

  	    return game.players
  	  },
      redirect: function (url, refresh) {
        if(refresh || game.scope.$$phase) {
      	  $window.location.href = url
      	} else {
      	  $location.path(url)
      	  game.scope.$apply()
      	}
      }
    }
  }]);
