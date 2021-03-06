const Channel = require('../models/Channel');

module.exports = async ({ channel, author, guild }) => {
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({
			discord_id: channel.id,
			guild_id: guild.id,
			players: [{ discord_id: author.id, discord_author: author }],
		});

		return channel.send('You joined the match!');
	}

	if (game.started) {
		return channel.send('Sorry, the match has started.');
	}

	if (game.players.length > 25) {
		return channel.send(
			`Sorry ${author}, but we have reached the maximum number of players in a match.`
		);
	}

	const alreadyIn = game.players.some(p => p.discord_id === author.id);
	if (!alreadyIn) {
		game.players = [
			...game.players,
			{ discord_id: author.id, discord_author: author },
		];

		game.save();

		return channel.send('You joined the match!');
	}

	return channel.send('You are already in the match!');
};
