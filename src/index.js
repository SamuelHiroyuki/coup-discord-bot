require("dotenv").config();
require("./database");

const Discord = require("discord.js");
const commands = require("./commands");
const Guild = require("./models/Guild");
const addEmojis = require("./utils/addEmojis");

const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on("ready", () => {
	client.user.setActivity(" Coup");
});

client.on("guildCreate", async guild => {
	const guildDB = await Guild.create({
		discord_id: guild.id,
		discord_name: guild.name
	});

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
