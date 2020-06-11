const _ = require('lodash');
const Channel = require('../models/Channel');
const pmInfluence = require('../utils/pmInfluence');
const listBoard = require('../utils/listBoard');
const play = require('../functions/play');
const courts = require('../assets/json/courts.json');

module.exports = async ({ channel, guild }) => {
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({
			discord_id: channel.id,
			guild_id: guild.id,
			players: [],
		});

		return channel.send(
			'At least 3 players are required to start the game. Call more friends.'
		);
	}

	if (game.started) {
		return channel.send('The match has already started.');
	}

	// if (game.players.length < 3) {
	// 	return channel.send(
	// 		"At least 3 players are required to start the game. Call more friends."
	// 	);
	// }

	// let additionalCards = [];
	// if (game.players.length > 6 && game.players.length <= 8) {
	// 	additionalCards = courts.additionalCards[game.variant];
	// }

	// if (game.players.length >= 9) {
	// 	additionalCards = new Array(2)
	// 		.fill(courts.additionalCards[game.variant])
	// 		.flat();
	// }

	const users = [];
	// game.treasury = 54 - game.players.length * 2;
	// game.court = _.shuffle([...courts[game.variant], ...additionalCards]);
	// game.players = _.shuffle(game.players);
	game.players.forEach(p => {
		// p.coins = 2;
		// p.card1 = {
		// 	influence: game.court.splice(
		// 		Math.random() * game.court.length,
		// 		1
		// 	)[0],
		// 	isEliminated: false,
		// };
		// p.card2 = {
		// 	influence: game.court.splice(
		// 		Math.random() * game.court.length,
		// 		1
		// 	)[0],
		// 	isEliminated: false,
		// };

		const user = guild.members.cache.find(
			u => u.id === p.discord_author.replace(/[^a-zA-Z0-9]/g, '')
		);

		try {
			// user.send(
			// 	`Hey ${user}, below are your influences from the match at '${channel.name} (${guild.name})'. Keep calm and get ready!`
			// );
			// user.send(pmInfluence(p.card1.influence, 1));
			// user.send(pmInfluence(p.card2.influence, 2));
			users.push(user);
		} catch (error) {
			console.log(error);
			p.toRemove = true;
			channel.send(
				`An error occurred while trying to contact ${p.discord_author}`
			);
		}
	});

	game.players = game.players.filter(p => !p.toRemove);
	game.started = true;

	// if (game.players.length < 3) {
	// 	return channel.send(
	// 		"At least 3 players are required to start the game. Call more friends."
	// 	);
	// }

	const embed = listBoard(game.players, 0);

	game.save();
	channel.send('The match has started!');
	const board = await channel.send(embed);
	return play(guild, channel, game, users, board);
};
