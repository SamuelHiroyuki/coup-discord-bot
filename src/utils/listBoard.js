const Discord = require('discord.js');
const serverEmojis = require('../assets/json/serverEmojis.json');

module.exports = players => {
	return new Discord.MessageEmbed()
		.setTitle('List of players')
		.setDescription('----------------------------------------------')
		.addFields(
			{
				name: 'Play order:',
				value: `${players
					.map(
						g =>
							`${g.discord_author} (${serverEmojis.coins.code}: ${g.coins})`
					)
					.join('\n')}\n\u200B`,
				inline: true,
			},
			{
				name: '\u200B',
				value: players
					.map(
						g =>
							`Card 1:  ${
								g.card1.isEliminated
									? serverEmojis[g.card1.influence].code
									: serverEmojis.card.code
							}`
					)
					.join('\n'),
				inline: true,
			},
			{
				name: '\u200B',
				value: players
					.map(
						g =>
							`Card 2:  ${
								g.card2.isEliminated
									? serverEmojis[g.card2.influence].code
									: serverEmojis.card.code
							}`
					)
					.join('\n'),
				inline: true,
			}
		);
};
