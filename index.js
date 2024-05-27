import TelegramBot from 'node-telegram-bot-api'
import { checkStreamStatus } from './twitch-api/wtitch-api.mjs'
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

export async function messageListener() {
	bot.on('message', async msg => {
		const text = msg.text
		const chatID = msg.chat.id

		try {
			switch (text) {
				case '/start':
					return bot.sendMessage(chatID, `👋🏻`)

				case '/info':
					return await bot.sendMessage(
						chatID,
						`Этого бота я создал в образовательных целях.\nУ него много функций, одна из них это уведомлять о начале моих стримов.\nСтримы тут: <a href='https://www.twitch.tv/skyhightm'>Ссылка на мой Twitch канал</a>`,
						{
							parse_mode: 'HTML',
							disable_web_page_preview: true,
						}
					)

				case '/anons':
					return await sendTelegramMessage(
						chatID,
						`Ты подписался на анонсы стримов.\nКогда начнется трансляция, я тебе пришлю уведомление.`
					)

				case '/admin':
					if (+chatID == process.env.ADMIN_ID) {
						const status = await checkStreamStatus()

						if ((status.status = 1)) {
							return await sendTelegramMessage(chatID, status.live)
						} else {
							return console.log(status.error)
						}
					} else {
						return await sendTelegramMessage(chatID, 'ТЫ НЕ АДМИН')
						break
					}

				default:
					return await sendTelegramMessage(chatID, 'Я тебя не понимаю')
					break
			}
		} catch (error) {
			await sendTelegramMessage(chatID, `${error}`)
		}
	})
}

export async function sendTelegramMessage(chatID, message) {
	return bot.sendMessage(chatID, message)
}

botStart();
