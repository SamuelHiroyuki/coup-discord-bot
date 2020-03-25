const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
	discord_id: {
		type: String,
		required: true
	},
	discord_avatar: {
		type: String,
		required: true
	},
	card1: {
		type: Number,
		required: true,
		default: 0
	},
	card2: {
		type: Number,
		required: true,
		default: 0
	},
	coins: {
		type: Number,
		required: true,
		default: 2
	}
});

module.exports = PlayerSchema;
