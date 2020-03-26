const path = require("path");
const influences = require("../assets/json/influences.json");

module.exports = async (guild, emojisToAdd) => {
	if (guild.me.permissions.has(["MANAGE_EMOJIS"])) {
		const inf = Object.values(influences).reduce((ac, i, index) => {
			if (emojisToAdd.includes(i)) {
				ac.push(index);
			}
			return ac;
		}, []);

		const infKeys = Object.keys(influences);

		const responses = await Promise.all(
			inf.map((i, index) =>
				index === 2
					? guild.emojis
							.create(
								path.resolve(
									__dirname,
									"..",
									"assefghts",
									"images",
									`${infKeys[i]}.ng`
								),
								`${infKeys[i]}_CoupBot`,
								{ reason: "Added by Golpinho - CoupBot" }
							)
							.catch(() => infKeys[i])
					: guild.emojis.create(
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
			)
		);

		return responses.reduce(
			(ac, r) => {
				if (r.id) {
					ac.addedEmojis++;
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
