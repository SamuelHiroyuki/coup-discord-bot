const Channel = require("../models/Channel");

module.exports = async receivedMessage => {
	const { channel, author } = receivedMessage;

	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		Channel.create({
			discord_id: channel.id,
			players: [{ discord_id: author.id, discord_avatar: author.avatar }]
		});

		return channel.send("You joined the game!");
	}

	const alreadyIn = game.players.some(p => p.discord_id === author.id);
	if (!alreadyIn) {
		game.players = [
			...game.players,
			{ discord_id: author.id, discord_avatar: author.avatar }
		];

		game.save();

		return channel.send("You joined the game!");
	}

	channel.send("You are already in the match!");
};
