const PlayerController = require('../controllers/PlayerController');

module.exports = async (game, playerIndex, botMessage) => {
	const user = game.players[playerIndex];
	botMessage = await botMessage.edit(
		`${user.discord_author} is claiming 'Foreign Aid'. Will someone block?`
	);

	PlayerController.addCoins(game, playerIndex, 2);
};
