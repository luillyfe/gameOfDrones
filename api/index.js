const express 	 = require('express');
const router 	 = express.Router();
const path 		 = require('path');
const fs   		 = require('fs');
const Firebase   = require("firebase");
const ajv        = require('ajv')
const gameSchema = require('../common/game.json')

const DATA_DIR = path.join(__dirname, '..', 'data');
const validate = ajv().compile(gameSchema)

router.get('*.json', (req, res) => {
  //const readable = fs.createReadStream(path.join(DATA_DIR, req.url))
  //readable.pipe(res)
  res.sendFile(path.join(DATA_DIR, req.url))
});

router.post('/games', (req, res) => {
  const errors = []
  const winnerIsAplayer = (game) => {
  	var isWinnerAplayer = false
  	
  	if (game.playerOne===game.winner || game.playerTwo===game.winner) 
  	  isWinnerAplayer = true
  	else errors.push({message: 'winner should be a player'})

  	return isWinnerAplayer
  }
  
  if (validate(req.body) && winnerIsAplayer(req.body)) {
  	const gameStore  = new Firebase("https://blazing-torch-8884.firebaseio.com")
  
    gameStore.push(req.body)
    res.send({message: 'Game saved successfully'});
  } else {
  	errors.push(validate.errors)

  	res.status(400)
  	res.send(errors)
  }
});

module.exports = router;
