const mongoose = require('mongoose');
const PlayerSchema = require('./Player');

const ChannelSchema = new mongoose.Schema({
	discord_id: {
		type: String,
		required: true,
		unique: true,
	},
	treasury: {
		// Amount of coins in the treasure
		type: Number,
		required: true,
		default: 54,
	},
	variant: {
		type: String,
		required: true,
		enum: ['classic', 'inquisitor'],
		default: 'classic',
	},
	court: {
		// Remaining cards in the deck
		type: [String],
		required: true,
		default: [
			'duke',
			'contessa',
			'captain',
			'assassin',
			'ambassador',
			'duke',
			'contessa',
			'captain',
			'assassin',
			'ambassador',
			'duke',
			'contessa',
			'captain',
			'assassin',
			'ambassador',
		],
	},
	started: {
		type: Boolean,
		required: true,
		default: false,
	},
	players: {
		type: [PlayerSchema],
		required: true,
		default: [],
	},
});

module.exports = mongoose.model('Channel', ChannelSchema);
