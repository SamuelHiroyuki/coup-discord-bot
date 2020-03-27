const _ = require("lodash");
const Channel = require("../models/Channel");
const pmInfluence = require("../utils/pmInfluence");
const courts = require("../assets/json/courts.json");

module.exports = async receivedMessage => {
	const { channel, guild } = receivedMessage;
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({
			discord_id: channel.id,
			players: []
		});

		return channel.send(
			"At least 3 players are required to start the game. Call more friends."
		);
	}

	if (game.started) {
		return channel.send("The match has already started.");
	}

	// if (game.players.length < 3) {
	// 	return channel.send(
	// 		"At least 3 players are required to start the game. Call more friends."
	// 	);
	// }

	let additionalCards = [];
	if (game.players.length > 6 && game.players.length <= 8) {
		additionalCards = courts.additionalCards[game.variant];
	}

	if (game.players.length >= 9) {
		additionalCards = new Array(2)
			.fill(courts.additionalCards[game.variant])
			.flat();
	}

	game.treasury = 54 - game.players.length * 2;
	game.court = _.shuffle([...courts[game.variant], ...additionalCards]);
	game.players = _.shuffle(game.players);
	game.players.forEach(p => {
		p.coins = 2;
		p.card1 = game.court.splice(Math.random() * game.court.length, 1)[0];
		p.card2 = game.court.splice(Math.random() * game.court.length, 1)[0];

		const user = guild.members.cache.find(
			u => u.id === p.discord_author.replace(/[^a-zA-Z0-9]/g, "")
		);

		try {
			// user.send(
			// 	`Hey ${user}, keep calm and get ready! Below are their influences:`
			// );
			// user.send(pmInfluence(p.card1, 1));
			// user.send(pmInfluence(p.card2, 2));
			user.send(pmInfluence("duke", 2));
			user.send(pmInfluence("contessa", 2));
			user.send(pmInfluence("captain", 2));
			user.send(pmInfluence("assassin", 2));
			user.send(pmInfluence("ambassador", 2));
			user.send(pmInfluence("inquisitor", 2));
		} catch (error) {
			console.log(error);
			p.toRemove = true;
			channel.send(
				`An error occurred while trying to contact ${p.discord_author}`
			);
		}
	});

	game.players = game.players.filter(p => !p.toRemove);
	// game.started = true;

	// if (game.players.length < 3) {
	// 	return channel.send(
	// 		"At least 3 players are required to start the game. Call more friends."
	// 	);
	// }

	game.save();
	return channel.send("The match has started! Prepare your lies and cries.");
};
