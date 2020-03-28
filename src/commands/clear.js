const Channel = require('../models/Channel');

module.exports = async ({ channel, author, guild }) => {
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({ discord_id: channel.id, guild_id: guild.id });

		return channel.send('There are no players in the match.');
	}

	if (!game.players.length) {
		return channel.send('There are no players in the match.');
	}

	game.players = [];
	game.save();
	return channel.send(`${author} removed all players from the match!`);
};
