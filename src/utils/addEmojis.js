const path = require("path");
const influences = require("../assets/json/influences.json");

module.exports = async (guild, emojisToAdd) => {
	if (guild.me.permissions.has(["MANAGE_EMOJIS"])) {
		const infKeys = Object.keys(influences);
		const infValues = Object.values(influences);

		const inf = infValues.reduce((ac, i, index) => {
			if (emojisToAdd.includes(i)) {
				ac.push(index);
			}
			return ac;
		}, []);

		const responses = await Promise.all(
			inf.map(i =>
				guild.emojis
					.create(
						path.resolve(
							__dirname,
							"..",
							"assets",
							"images",
							`${infKeys[i]}.png`
						),
						`${infKeys[i]}_CoupBot`,
						{ reason: "Added by Golpinho - CoupBot" }
					)
					.catch(() => infKeys[i])
			)
		);

		return responses.reduce(
			(ac, r, index) => {
				if (r.id) {
					ac.addedEmojis += infValues[index];
				} else {
					ac.failedEmojis.push(r);
				}

				return ac;
			},
			{ addedEmojis: 0, failedEmojis: [], permissionError: false }
		);
	}

	return { addedEmojis: 0, failedEmojis: [], permissionError: true };
};
