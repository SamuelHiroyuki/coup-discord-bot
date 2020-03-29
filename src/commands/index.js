const Discord = require('discord.js');

function helpFunction(receivedMessage) {
	const embed = new Discord.MessageEmbed()
		.setColor('#8BC34A')
		.setTitle('Command list:')
		.addFields(
			{
				name: 'Commands:',
				value: Object.keys(commands).join('\n'),
				inline: true,
			},
			{
				name: 'Description:',
				value: Object.keys(commands)
					.map(c => commands[c].description)
					.join('\n'),
				inline: true,
			}
		);
	receivedMessage.channel.send(embed);
}

const commands = {
	'[help]': {
		description: 'List all available commands.',
		exec: helpFunction,
	},
	'[join]': {
		description: 'Join the match.',
		exec: require('./join'),
	},
	'[leave]': {
		description: 'Leave the match.',
		exec: require('./leave'),
	},
	'[list]': {
		description:
			'List all players in the match (works like the `[board]` command).',
		exec: require('./list'),
	},
	'[mode]': {
		description: 'Select the game mode.',
		exec: receivedMessage =>
			receivedMessage.channel.send(
				`Okay ${receivedMessage.author}, I heard you, so stop!`
			),
	},
	'[start]': {
		description: 'Start the game.',
		exec: require('./start'),
	},
	'[board]': {
		description: 'Shows the match situation.',
		exec: require('./board'),
	},
	'[clear]': {
		description: 'Remove all players from the match.',
		exec: require('./clear'),
	},
	'[rules]': {
		description: 'List all game rules.',
		exec: receivedMessage =>
			receivedMessage.channel.send(
				`Okay ${receivedMessage.author}, I heard you, so stop!`
			),
	},
	'[emojis]': {
		description: 'Checks whether the server has the emojis and adds them.',
		exec: require('./emojis'),
	},
};

module.exports = commands;
