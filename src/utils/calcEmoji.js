const influences = require("../assets/json/influences.json");

module.exports = emojis => {
	const values = Object.values(influences);
	const serverEmojis = values.filter(v => emojis & v);
	return values.filter(v => !serverEmojis.includes(v));
};
