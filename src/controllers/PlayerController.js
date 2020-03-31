const Discord = require('discord.js');
const serverEmojis = require('../assets/json/serverEmojis.json');

class PlayerController {
	addCoins(game, playerIndex, coins) {
		game.players[playerIndex].coins += coins;
		game.save();

		return game;
	}

	// coup(game, user, playerIndex) {}
}

module.exports = new PlayerController();
