export const apps = [
	{
		name: 'telegram-bot-skyhigh',
		script: './index.js',
		node_args: '--experimental-modules', // Убедитесь, что этот флаг установлен
		env: {
			NODE_ENV: 'development',
		},
		env_production: {
			NODE_ENV: 'production',
		},
	},
]
