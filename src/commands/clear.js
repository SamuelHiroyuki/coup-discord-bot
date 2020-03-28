const Channel = require('../models/Channel');

module.exports = async receivedMessage => {
	const { channel, author } = receivedMessage;

	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({ discord_id: channel.id });

		return channel.send('There are no players in the match.');
	}

	if (!game.players.length) {
		return channel.send('There are no players in the match.');
	}

	game.players = [];
	game.save();
	return channel.send(`${author} removed all players from the match!`);
};
