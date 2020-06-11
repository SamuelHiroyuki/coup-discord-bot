const Discord = require('discord.js');
const serverEmojis = require('../assets/json/serverEmojis.json');
const { nextTurn } = require('../utils/nextTurn');

module.exports = async (guild, channel, game, users, board) => {
	const variableFields = [];
	const variableReactions = [];

	switch (game.variant) {
		case 'classic':
			variableReactions.push(serverEmojis.ambassador.id);
			variableFields.push({
				name: `(${serverEmojis.ambassador.code}) Ambassador - Exchange`,
				value:
					'Take two random cards from the deck and choose which one, if any, to exchange with the cards face-down. Then, return two cards to the deck.\n`(It cannot be blocked.)`',
			});
			break;

		case 'inquisitor':
			variableReactions.push(
				serverEmojis.inquisitor.id,
				serverEmojis.inquisitor2.id
			);
			variableFields.push(
				{
					name: `(${serverEmojis.inquisitor.code}) Inquisitor - Exchange`,
					value:
						'You can Exchange a card with the Court. Draw 1 card and then return 1 card to the deck.\n`(It cannot be blocked.)`',
				},
				{
					name: `(${serverEmojis.inquisitor2.code}) Inquisitor - Examine`,
					value:
						'Choose a player; look at one of your cards, force or not the Exchange.\n`(It cannot be blocked.)`',
				}
			);
			break;

		default:
			variableReactions.push(serverEmojis.ambassador.id);
			variableFields.push({
				name: `(${serverEmojis.ambassador.code}) Ambassador - Exchange`,
				value:
					'Take two random cards from the deck and choose which one, if any, to exchange with the cards face-down. Then, return two cards to the deck.\n`(It cannot be blocked.)`',
			});
			break;
	}

	const embed = new Discord.MessageEmbed()
		.setColor('#FFCA28')
		.setDescription("Now t's your turn. What will you do?")
		.addFields(
			{
				name:
					'--------------------------------------------------------------------------------------------',
				value: 'General Actions',
			},
			{
				name: `(${serverEmojis.coin.code}: 1) Income`,
				value: 'Take 1 coin from the Treasury.',
			},
			{
				name: `(${serverEmojis.coins.code}: 2) Foreign Aid`,
				value:
					'Take 2 coins from the Treasury. (Can be blocked by the Duke)',
			},
			{
				name: `(${serverEmojis.card.code}) Coup`,
				value:
					'Pay 7 coins to the Treasury and launch a Coup against another player. That player immediately loses an influence. A Coup is always successful. If you start your turn with 10 (or more) coins you are required to launch a Coup.',
			},
			{
				name:
					'--------------------------------------------------------------------------------------------',
				value: 'Character Actions',
			},
			{
				name: `(${serverEmojis.duke.code}) Duke - Tax`,
				value: 'Take 3 coins from the Treasury.',
			},
			{
				name: `(${serverEmojis.assassin.code}) Assassin - Assassinate`,
				value: `Pay 3 coins to launch an assassination against another player. If successful that player immediately loses an influence. \`(Can be blocked by the Contessa\`${serverEmojis.contessa.code}\`)\``,
			},
			{
				name: `(${serverEmojis.captain.code}) Captain - Steal`,
				value: `Take 2 coins from another player. If they only have one coin, take only one.\n\`(Can be blocked by the Ambassador \`${serverEmojis.ambassador.code}\` or the Captain \`${serverEmojis.captain.code}\`)\``,
			},
			...variableFields.map(vf => vf)
		);

	const reactions = [
		serverEmojis.coin.id,
		serverEmojis.coins.id,
		serverEmojis.card.id,
		serverEmojis.duke.id,
		serverEmojis.assassin.id,
		serverEmojis.captain.id,
		...variableReactions,
	];

	nextTurn(game, users, -1, reactions, embed, channel, board);
};
