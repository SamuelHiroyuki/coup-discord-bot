const fs = require("fs");

module.exports = (databasePath, game) =>
	new Promise((resolve, reject) => {
		fs.writeFile(databasePath, JSON.stringify(game), err => {
			if (err) {
				reject(err);
				return channel.send(
					"Sorry, it looks like something went wrong. Try again."
				);
			}
		});
		resolve();
	});
