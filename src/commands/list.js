const Channel = require("../models/Channel");
const Discord = require("discord.js");

module.exports = async receivedMessage => {
	const { channel } = receivedMessage;
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({
			discord_id: channel.id,
			players: []
		});

		return channel.send("There are no players in the match.");
	}

	if (!game.players.length) {
		return channel.send("There are no players in the match.");
	}

	const embed = new Discord.MessageEmbed()
		.setColor("#FAA61A")
		.setTitle("List of players:")
		.addField(
			"-----------------------------------------------",
			game.players.map(g => g.discord_author).join("\n"),
			true
		);

	channel.send(embed);
};
