const PlayerController = require('../controllers/PlayerController');
const serverEmojis = require('../assets/json/serverEmojis.json');
const foreignAid = require('./foreignAid');

module.exports = async (_emoji, game, playerIndex, botMessage) => {
	switch (_emoji.id) {
		case serverEmojis.coin.id:
			await PlayerController.addCoins(game, playerIndex, 1);
			break;
		case serverEmojis.coins.id:
			await foreignAid(game, playerIndex, botMessage);
			break;
		case serverEmojis.card.id:
			break;
		case serverEmojis.duke.id:
			break;
		case serverEmojis.assassin.id:
			break;
		case serverEmojis.captain.id:
			break;

		default:
			break;
	}
};
