module.exports = {
	apps: [
		{
			name: 'telegram-bot-skyhigh',
			script: './index.js',
			interpreter: '/usr/bin/node', // Укажите путь к вашей установленной версии Node.js
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
}
