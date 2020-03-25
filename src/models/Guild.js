const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
	discord_id: {
		type: String,
		required: true,
		unique: true
	},
	discord_name: {
		type: String,
		required: true
	},
	emojis: {
		type: Boolean,
		required: true,
		default: false
	}
});

module.exports = mongoose.model("Guild", GuildSchema);
