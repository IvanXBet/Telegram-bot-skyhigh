module.exports = {
	apps: [
		{
			name: 'telegram-bot-skyhigh',
			script: './index.js',
			node_args: '--experimental-modules', // добавим эту опцию
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
}
