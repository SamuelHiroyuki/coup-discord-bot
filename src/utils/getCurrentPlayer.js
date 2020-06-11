module.exports = (game, users) => {
	const playerIndex = game.players.findIndex(p => !p.playedThisRound);
	if (playerIndex !== -1) {
		const { user } = users[playerIndex];

		return { user, playerIndex };
	}
	return {};
	// Resetar todo mundo dps
};
