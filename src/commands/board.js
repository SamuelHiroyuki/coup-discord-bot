const Channel = require('../models/Channel');
const listBoard = require('../utils/listBoard');

module.exports = async ({ channel, guild }) => {
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({
			discord_id: channel.id,
			guild_id: guild.id,
			players: [],
		});

		return channel.send('The match has not started yet.');
	}

	if (!game.started) {
		return channel.send('The match has not started yet.');
	}

	const embed = listBoard(game.players);

	return channel.send(embed);
};
