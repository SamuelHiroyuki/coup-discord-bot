const Guild = require("../models/Guild");
const addEmojis = require("../utils/addEmojis");
const calcEmoji = require("../utils/calcEmoji");
const influences = require("../assets/json/influences.json");

module.exports = async receivedMessage => {
	const { channel, author, guild } = receivedMessage;

	const guildDB = await Guild.findOne({ discord_id: guild.id });

	if (Object.values(influences).reduce((a, b) => a + b, 0) > guildDB.emojis) {
		const emojisToAdd = calcEmoji(guildDB.emojis);
		const response = await addEmojis(guild, emojisToAdd);

		if (response.permissionError) {
			channel.send(
				`Hello ${author}, I need permission to add emojis to ${guild}. This will give the game a better experience.\rTo manually add these emojis, use the \`[configure]\` command.`
			);
		}

		if (response.addedEmojis) {
			guildDB.emojis += response.addedEmojis;
			guildDB.save();
			channel.send(`Added emojis to ${guild}.`);
		}

		response.failedEmojis.forEach(i =>
			channel.send(`${author}, I could not add emojis \`${i}\` to ${guild}.`)
		);
	} else {
		channel.send("All emojis are already configured!");
	}
};
