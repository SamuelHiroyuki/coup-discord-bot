let { games, defaultGameData, defaultPlayerData } = require("../database");

module.exports = receivedMessage => {
	const { channel, author } = receivedMessage;

	if (!games.some(g => g.id === channel.id)) {
		games = [...games, { ...defaultGameData, id: channel.id }];
	}

	const gameIndex = games.findIndex(g => g.id === channel.id);

	const playerIndex = games[gameIndex].players.findIndex(
		g => g.id === author.id
	);

	if (playerIndex === -1) {
		games[gameIndex].players = [
			...games[gameIndex].players,
			{ ...defaultPlayerData, id: author.id }
		];

		return channel.send("You joined the game!");
	}

	channel.send("You are already in the match!");
};

// const fs = require("fs");
// const path = require("path");
// const databasePath = path.resolve(
// 	__dirname,
// 	"..",
// 	"database",
// 	`${channelId}.json`
// );

// fs.readFile(databasePath, (err, data) => {
// 	if (err) {
// 		data = defaults;
// 		fs.writeFile(databasePath, JSON.stringify(data), err => {
// 			if (err) {
// 				return receivedMessage.channel.send(
// 					"Sorry, it looks like something went wrong. Try again."
// 				);
// 			}
// 		});
// 	}

// 	console.log(receivedMessage);
// 	console.log(data);
// });
