const _ = require("lodash");
const Channel = require("../models/Channel");
const influences = require("../assets/json/influences.json");
const courts = require("../assets/json/courts.json");

module.exports = async receivedMessage => {
	const { channel } = receivedMessage;
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		Channel.create({
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

	game.started = true;
	game.treasury = 54;
	game.court = _.shuffle([...courts[game.variant], ...additionalCards]);
	game.players = _.shuffle(game.players);
	game.players.forEach(p => {
		p.coins = 2;
		p.card1 =
			influences[game.court.splice(Math.random() * game.court.length, 1)];
		p.card2 =
			influences[game.court.splice(Math.random() * game.court.length, 1)];
	});

	game.save();
	return channel.send("The match has started! Prepare your lies and cries.");
};
