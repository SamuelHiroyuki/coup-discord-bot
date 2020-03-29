const Channel = require('../models/Channel');

module.exports = async ({ channel, author, guild }) => {
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({ discord_id: channel.id, guild_id: guild.id });

		return channel.send('You were no longer in the match.');
	}

	const inGame = game.players.some(p => p.discord_id === author.id);
	if (!inGame) {
		return channel.send('You were no longer in the match.');
	}

	if (game.started) {
		const playerIndex = game.players.findIndex(
			p => p.discord_id === author.id
		);

		game.players[playerIndex].toRemove = true;
		game.players[playerIndex].coins = 0;
		game.players[playerIndex].card1.isEliminated = true;
		game.players[playerIndex].card2.isEliminated = true;
		game.save();

		return channel.send('You have been removed from the match!');
	}

	game.players = game.players.filter(p => p.discord_id !== author.id);
	game.save();
	return channel.send('You have been removed from the match!');
};
