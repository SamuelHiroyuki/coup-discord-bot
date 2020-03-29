const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
	influence: {
		type: String,
		required: true,
		default: 'none',
	},
	isEliminated: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = CardSchema;
