const _ = require('lodash');
const influences = require('../assets/json/influences.json');

module.exports = emojis => {
	const values = Object.values(influences);
	const serverEmojis = values.filter(v => emojis & v);
	return _.difference(values, serverEmojis);
};
