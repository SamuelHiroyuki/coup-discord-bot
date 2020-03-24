const Discord = require("discord.js");

helpFunction = receivedMessage => {
	const embed = new Discord.MessageEmbed()
		.setColor("#8BC34A")
		.setTitle("Command list:")
		.addFields(
			{
				name: "Commands:",
				value: Object.keys(commands).join("\n"),
				inline: true
			},
			{
				name: "Description:",
				value: Object.keys(commands)
					.map(c => commands[c].description)
					.join("\n"),
				inline: true
			}
		);
	receivedMessage.channel.send(embed);
};

const commands = {
	"[help]": {
		description: "All available commands",
		exec: helpFunction
	},
	"[join]": {
		description: "Join the match",
		exec: receivedMessage =>
			receivedMessage.channel.send(
				`Okay ${receivedMessage.author}, I heard you, so stop!`
			)
	}
};

module.exports = commands;
