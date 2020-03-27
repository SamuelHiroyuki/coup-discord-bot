const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
	discord_id: {
		type: String,
		required: true
	},
	discord_author: {
		type: String,
		required: true
	},
	card1: {
		type: String,
		required: true,
		default: "none"
	},
	card2: {
		type: String,
		required: true,
		default: "none"
	},
	coins: {
		type: Number,
		required: true,
		default: 2
	},
	toRemove: {
		type: Boolean,
		required: true,
		default: false
	}
});

module.exports = PlayerSchema;
