require('dotenv').config();
require('./database');

const Discord = require('discord.js');
const commands = require('./commands');
const Guild = require('./models/Guild');
const Channel = require('./models/Channel');

const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
	client.user.setActivity(` Coup on ${client.guilds.cache.size} servers`);
});

client.on('guildCreate', async guild => {
	await Guild.create({
		discord_id: guild.id,
		discord_name: guild.name,
	});
	client.user.setActivity(` Coup on ${client.guilds.cache.size} servers`);
});

client.on('guildDelete', async guild => {
	await Guild.findOneAndRemove({ discord_id: guild.id });
	const channels = await Channel.find({ guild_id: guild.id });
	channels.forEach(c => c.remove());
	client.user.setActivity(` Coup on ${client.guilds.cache.size} servers`);
});

client.on('message', async receivedMessage => {
	const { author, content, type, channel } = receivedMessage;

	if (type === 'GUILD_MEMBER_JOIN' && client.user === author) {
		channel.send(
			`Sup @here, to see all available commands, use \`[help]\`.
To improve your gameplay, I recommend that you create my own text channel and enable 'Use External Emojis' option.
For a better gaming experience, you can run the command \`[emojis]\`.
			`
		);
	}

	if (author.bot) return;

	if (content.startsWith('[') && content.endsWith(']')) {
		const command = commands[content];
		if (command) command.exec(receivedMessage, client);
	}
});
