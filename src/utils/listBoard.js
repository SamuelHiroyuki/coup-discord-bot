const Discord = require("discord.js");
const serverEmojis = require("../assets/json/serverEmojis.json");

module.exports = players => {
	return new Discord.MessageEmbed()
		.setTitle("List of players")
		.setDescription("----------------------------------------------")
		.addFields(
			{
				name: "Play order:",
				value: players.map(g => g.discord_author).join("\n") + "\n\u200B",
				inline: true
			},
			{
				name: "\u200B",
				value: players
					.map(
						g =>
							`Card 1:  ${
								g.card1 === "eliminated"
									? ":skull_crossbones:"
									: serverEmojis["card"].code
							}`
					)
					.join("\n"),
				inline: true
			},
			{
				name: "\u200B",
				value: players
					.map(
						g =>
							`Card 2:  ${
								g.card2 === "eliminated"
									? ":skull_crossbones:"
									: serverEmojis["card"].code
							}`
					)
					.join("\n"),
				inline: true
			}
		);
};
