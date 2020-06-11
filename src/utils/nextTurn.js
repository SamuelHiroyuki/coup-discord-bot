const getCurrentPlayer = require('./getCurrentPlayer');
const handleUserAction = require('../actions/index');
const listBoard = require('./listBoard');

async function nextTurn(
	game,
	users,
	_playerIndex,
	reactions,
	embed,
	channel,
	board,
	message,
	botMessage
) {
	const { user, playerIndex } = getCurrentPlayer(game, users);

	if (_playerIndex === -1) {
		message = await channel.send(embed.setTitle(`${user.username} turn:`));
		botMessage = await channel.send('Choose your action!');
		reactions.map(reaction => message.react(reaction));
	} else {
		message.edit(embed.setTitle(`${user.username} turn:`));

		board.edit(listBoard(game.players, playerIndex));
	}

	const collected = await message.awaitReactions(
		(reaction, u) => {
			if (u.id !== user.id && !u.bot) {
				reaction.users.remove(u.id);
			}
			return reactions.includes(reaction.emoji.id) && u.id === user.id;
		},
		{ max: 1 }
	);
	const { _emoji } = collected.first();

	message.reactions.cache.forEach(reaction => {
		reaction.users.cache.forEach(userReaction => {
			if (!userReaction.bot) {
				reaction.users.remove(userReaction.id);
			}
		});
	});

	game.players[playerIndex].playedThisRound = true;
	await handleUserAction(_emoji, game, playerIndex, botMessage);

	nextTurn(
		game,
		users,
		playerIndex,
		reactions,
		embed,
		channel,
		board,
		message,
		botMessage
	);
}

module.exports.nextTurn = nextTurn;
