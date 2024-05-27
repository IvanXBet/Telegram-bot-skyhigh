import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config.js'

const bot = new TelegramBot(process.env.API_KEY_BOT, { polling: true })

bot.on('polling_error', err => console.log(err.data.error.message))

export async function messageListener() {
	bot.on('message', async msg => {
		const text = msg.text
		const chatID = msg.chat.id

		try {
			switch (text) {
				case '/start':
					await bot.sendMessage(chatID, 'Меню бота', {
						reply_markup: {
							keyboard: [
								['⭐️ Подписаться на оповещения о стриме'],
								['⭐️ Отписаться от оповещений'],
								['⭐️ Условия розыгрыша'],
								['⭐️ Участвовать в розыгрыше'],
								['❌ Закрыть меню'],
							],
							resize_keyboard: true,
						},
					})
					break

				case '❌ Закрыть меню':
					await bot.sendMessage(chatID, 'Меню закрыто', {
						reply_markup: {
							remove_keyboard: true,
						},
					})
					break

				case '/info':
					await bot.sendMessage(
						chatID,
						`Этого бота я создал в образовательных целях.\nУ него много функций, одна из них это уведомлять о начале моих стримов.\nСтримы тут: <a href='https://www.twitch.tv/skyhightm'>Ссылка на мой Twitch канал</a>`,
						{
							parse_mode: 'HTML',
							disable_web_page_preview: true,
						}
					)
					break

				case '/anons':
					return await bot.sendMessage(
						chatID,
						`Ты подписался на анонсы стримов.\nКогда начнется трансляция, я тебе пришлю уведомление.`
					)

				case '/admin':
					if (+chatID == process.env.ADMIN_ID) {
						const status = await checkStreamStatus()

						if ((status.status = 1)) {
							await bot.sendMessage(chatID, status.live)
						} else {
							console.log(status.error)
						}
						break
					} else {
						await bot.sendMessage(chatID, 'ТЫ НЕ АДМИН')
						break
					}

				default:
					return await bot.sendMessage(chatID, 'Я тебя не понимаю')
					break
			}
		} catch (error) {
			await bot.sendMessage(chatID, `${error}`)
		}
	})
}