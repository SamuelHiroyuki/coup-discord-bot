const _ = require('lodash');
const Discord = require('discord.js');
const serverEmojis = require('../assets/json/serverEmojis.json');
const influences = require('../assets/json/influences.json');

module.exports = (influence, cardNum) => {
	const infKeys = Object.keys(influences);
	const embed = new Discord.MessageEmbed()
		.setColor('#2196F3')
		.setThumbnail(serverEmojis[influence].url)
		.setTitle(`Card ${cardNum}: ${_.capitalize(influence)}`);

	switch (influence) {
		case infKeys[0]:
			embed
				.setDescription(
					`\`\`\`json
"Tax"
\`\`\``
				)
				.addFields(
					{
						name: 'Character Action',
						value:
							'Take 3 coins from the Treasury.\n`(It cannot be blocked.)`',
						inline: false,
					},
					{
						name: 'Counteraction',
						value:
							'Claiming the Duke may counteract and block a player attempting to collect foreign aid.\n`The player trying to gain foreign aid receives no coins that turn.`',
						inline: false,
					}
				);
			break;
		case infKeys[1]:
			embed
				.setDescription(
					`\`\`\`css
[Blocks Assassination]
\`\`\``
				)
				.addField(
					`Counteraction`,
					'When you are being assassinated, you can claim the Contessa and block the assassination.\nThe assassination fails, but the fee paid by the player for the assassin remains spent.\n`(It cannot be blocked.)`'
				);
			break;
		case infKeys[2]:
			embed
				.setDescription(
					`\`\`\`ini
[Steal]
\`\`\``
				)
				.addFields(
					{
						name: 'Character Action',
						value: `Take 2 coins from another player. If they only have one coin, take only one.\n\`(Can be blocked by the Ambassador \`${serverEmojis.ambassador.code}\` or the Captain \`${serverEmojis.captain.code}\`)\``,
						inline: false,
					},
					{
						name: 'Counteraction',
						value: `The player who is being stolen can block extortion by claiming:\nThe \`Ambassador\`${serverEmojis.ambassador.code}\` \` or the \`Captain\`${serverEmojis.captain.code}\` \`.\n\`The player trying to steal receives no coins that turn.\``,
						inline: false,
					}
				);
			break;
		case infKeys[3]:
			embed
				.setDescription(
					`\`\`\`
Assassinate
\`\`\``
				)
				.addField(
					`Pay 3 coins to the Treasury and launch an assassination against another player. If successful that player immediately loses an influence.`,
					`\`(Can be blocked by the Contessa \`${serverEmojis.contessa.code}\`)\``
				);
			break;
		case infKeys[4]:
			embed
				.setDescription(
					`\`\`\`css
Exchange
\`\`\``
				)
				.addFields(
					{
						name: 'Character Action',
						value:
							'You can Exchange cards with the Court. Take two random cards from the deck and choose which one, if any, to exchange with the cards face-down. Then, return two cards to the deck.\n`(It cannot be blocked.)`',
						inline: false,
					},
					{
						name: 'Counteraction',
						value: `The player who is being stolen can block extortion by claiming:\nThe \`Ambassador\`${serverEmojis.ambassador.code}\` \` or the \`Captain\`${serverEmojis.captain.code}\` \`.\n\`The player trying to steal receives no coins that turn.\``,
						inline: false,
					}
				);
			break;
		case infKeys[5]:
			embed
				.setDescription(
					`\`\`\`html
< Exchange >             < Examine >
\`\`\``
				)
				.addFields(
					{
						name: 'Character Action 1',
						value:
							'You can Exchange a card with the Court. Draw 1 card and then return 1 card to the deck.\n`(It cannot be blocked.)`',
						inline: true,
					},
					{
						name: 'Character Action 2',
						value:
							'Choose a player; look at one of your cards, force or not the Exchange.\n`(It cannot be blocked.)`',
						inline: true,
					}
				);
			break;

		default:
			break;
	}

	return embed;
};
