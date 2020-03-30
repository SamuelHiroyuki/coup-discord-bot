module.exports = async ({ channel }) => {
	// const embed = new Discord.MessageEmbed()
	// 	.setColor('#FFCA28')
	// 	.setTitle('Rules')
	// 	.addFields(
	// 		{
	// 			name: ':small_orange_diamond: Start',
	// 			value:
	// 				'Each player starts the game with 2 coins and 2 influences (cards/characters).',
	// 		},
	// 		{
	// 			name: ':small_orange_diamond: Object',
	// 			value: 'To be the last player with influence in the game.',
	// 		},
	// 		{
	// 			name: ':small_orange_diamond: The influence',
	// 			value:
	// 				'Each player has a maximum of 2 influences.\n\nWhen the player loses an influence it is revealed to all other players.\n\nThe revealed card no longer provides influence and is visible to everyone.\n\nWhen the player loses all his influences he is exiled and loses the game.\n\n`The player always selects what influence he will reveal.`',
	// 		},
	// 		{
	// 			name: ':small_orange_diamond: The game',
	// 			value:
	// 				'Each turn a player chooses one action (General ou Character) only.\n\n`A player may not pass.`\n\nAfter the action is chosen other players have an opportunity to challenge or counteract that action.\n\nIf an action is not challenged or counteracted, the action automatically succeeds.\n\n`Challenges are resolved first before any action or counteraction is resolved.`\n\nWhen a player has lost all their influence, they are immediately out of the game.',
	// 		},
	// 		{
	// 			name: ':small_orange_diamond: Actions',
	// 			value:
	// 				'A player may choose any action they want and can afford.\n\nIf they choose a Character Action a player must claim that the required character is one of their face down cards.\n\n`They can be telling the truth or bluffing.`\n\nThey do not need to reveal any of their face down cards unless they are challenged. \n\nIf they are not challenged they automatically succeed.\n\n`If a player starts their turn with 10 (or more) coins they must launch a Coup that turn as their only action.`',
	// 		},
	// 		{
	// 			name: ':small_orange_diamond: General Actions',
	// 			value:
	// 				'`Always available`\n\n- Income: Take 1 coin from the Treasury.\n\n- Foreign Aid: Take 2 coins from the Treasury. `(Can be blocked by the Duke)`\n\n- Coup: Pay 7 coins to the Treasury and launch a Coup against another player. That player immediately loses an influence. A Coup is always successful.\n\n`If you start your turn with 10 (or more) coins you are required to launch a Coup.`',
	// 		},
	// 		{
	// 			name: ':small_orange_diamond: Character Actions',
	// 			value:
	// 				'Select a character to see their actions.\n\n`If challenged a player must show they influence the relevant character`',
	// 		},
	// 		{
	// 			name: ':small_orange_diamond: Counteractions',
	// 			value:
	// 				"`Counteractions can be taken by other players to intervene or block a player's action.`\n\nCounteractions operate like character actions. Players may claim to influence any of the characters and use their abilities to counteract another player.\n\n`They may be telling the truth or bluffing.`\n\nThey do not need to show any cards unless challenged.\n\nCounteractions may be challenged, but if not challenged they automatically succeed. \n\nIf an action is successfully counteracted, the action fails but any coins paid as the cost of the action remain spent.",
	// 		},
	// 		{
	// 			name: '\u200B',
	// 			value:
	// 				'-Duke (Blocks Foreign Aid): Any player claiming the Duke may counteract and block a player attempting to collect foreign aid.\n\n`The player trying to gain foreign aid receives no coins that turn.`\n\n-Contessa (Blocks Assassination): The player who is being assassinated may claim the Contessa and counteract to block the assassination.\n`The assassination fails but the fee paid by the player for the assassin remains spent.`\n\n-Ambassador/Captain (Blocks Stealing): The player who is being stolen from may claim either the Ambassador or the Captain and counteract to block the steal.\n`The player trying to steal receives no coins that turn.`',
	// 		}
	// 	);
	return channel.send(
		'https://www.inboardgame.com.br/wp-content/uploads/Coup-Livro-de-Regras-Manual-Mandala-Jogos.pdf'
	);
};
