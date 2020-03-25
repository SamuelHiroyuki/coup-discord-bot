const Channel = require("../models/Channel");
const Discord = require("discord.js");

module.exports = async receivedMessage => {
	const { channel } = receivedMessage;
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		Channel.create({
			discord_id: channel.id,
			players: []
		});

		return channel.send("The match has not started yet.");
	}

	if (!game.started) {
		return channel.send("The match has not started yet.");
	}

	const embed = new Discord.MessageEmbed()
		.setColor("#FAA61A")
		.setTitle("List of players:")
		.addFields(
			{
				name: "Players:",
				value: Object.keys(commands).join("\n"),
				inline: true
			},
			{
				name: "Influences:",
				value: Object.keys(commands)
					.map(c => commands[c].description)
					.join("\n"),
				inline: true
			}
		);

	channel.send(embed);
};
