const mongoose = require('mongoose');
const Card = require('./Card');

const PlayerSchema = new mongoose.Schema({
	discord_id: {
		type: String,
		required: true,
	},
	discord_author: {
		type: String,
		required: true,
	},
	card1: {
		type: Card,
		required: true,
		default: {
			influence: 'none',
			isEliminated: false,
		},
	},
	card2: {
		type: Card,
		required: true,
		default: {
			influence: 'none',
			isEliminated: false,
		},
	},
	coins: {
		type: Number,
		required: true,
		default: 2,
	},
	toRemove: {
		type: Boolean,
		required: true,
		default: false,
	},
	playedThisRound: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = PlayerSchema;
