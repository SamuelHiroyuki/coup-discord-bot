require("dotenv").config();
require("./database");

const Discord = require("discord.js");
const commands = require("./commands");

const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on("ready", () => {
	client.user.setActivity(" Coup");
});

client.on("message", receivedMessage => {
	const { author, content } = receivedMessage;

	if (author === client.user) return;

	if (content.startsWith("[") && content.endsWith("]")) {
		const command = commands[content];
		command && command.exec(receivedMessage);
	}
});
