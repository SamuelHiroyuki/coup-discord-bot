const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
	discord_id: {
		type: String,
		required: true,
		unique: true,
	},
	discord_name: {
		type: String,
		required: true,
	},
	emojis: {
		type: Number,
		required: true,
		default: 0,
	},
});

module.exports = mongoose.model('Guild', GuildSchema);
