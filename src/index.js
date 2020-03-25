require("dotenv").config();
require("./database");

const Discord = require("discord.js");
const commands = require("./commands");
const Guild = require("./models/Guild");

const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on("ready", () => {
	client.user.setActivity(" Coup");
});

client.on("guildCreate", guild => {
	Guild.create({
		discord_id: guild.id,
		discord_name: guild.name
	});
	// duke
	// contessa
	// captain
	// assassin
	// inquisitor
	// ambassador
});

client.on("guildDelete", async guild => {
	await Guild.findOneAndRemove({ discord_id: guild.id });
});

client.on("message", receivedMessage => {
	const { author, content } = receivedMessage;

	if (author.bot) return;

	if (content.startsWith("[") && content.endsWith("]")) {
		const command = commands[content];
		command && command.exec(receivedMessage);
	}
});
