const Discord = require('discord.js');
const Channel = require('../models/Channel');
const listBoard = require('../utils/listBoard');

module.exports = async ({ channel, guild }) => {
	const game = await Channel.findOne({ discord_id: channel.id });

	if (!game) {
		await Channel.create({
			discord_id: channel.id,
			guild_id: guild.id,
			players: [],
		});

		return channel.send('There are no players in the match.');
	}

	if (!game.players.length) {
		return channel.send('There are no players in the match.');
	}

	const embed = game.started
		? listBoard(game.players)
		: new Discord.MessageEmbed()
				.setTitle('List of players:')
				.addField(
					'-----------------------------------------------',
					`\u200B\n${game.players
						.map(g => g.discord_author)
						.join('\n')}\n\u200B`,
					true
				);

	return channel.send(embed);
};
