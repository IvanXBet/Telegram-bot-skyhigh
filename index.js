import TelegramBot from 'node-telegram-bot-api'
import { checkStreamStatus } from './twitch-api/wtitch-api.mjs'

import { messageListener } from './controllers/messageController.js'
import 'dotenv/config.js'


const bot = new TelegramBot(process.env.API_KEY_BOT, { polling: true })

export async function botStart() {
	bot.setMyCommands([
		{ command: '/start', description: 'Запустить бота' },
		{ command: '/anons', description: 'Получать уведомления о начале стрима' },
		{ command: '/info', description: 'Информация о боте' },
		{ command: '/menu', description: 'Дополнительное меню' },
	])

	await messageListener()
}



export async function sendTelegramMessage(chatID, message) {
	return bot.sendMessage(chatID, message)
}

botStart();

console.log('Bot is running...');
