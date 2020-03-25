const Channel = require("../models/Channel");

module.exports = async receivedMessage => {
	const { channel, author } = receivedMessage;

	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		Channel.create({ discord_id: channel.id });

		return channel.send("You were no longer in the match.");
	}

	const inGame = game.players.some(p => p.discord_id === author.id);
	if (!inGame) {
		return channel.send("You were no longer in the match.");
	}

	game.players = game.players.filter(p => p.discord_id !== author.id);
	game.save();
	channel.send("You have been removed from the match!");
};
