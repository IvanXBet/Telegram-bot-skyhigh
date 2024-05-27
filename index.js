
import { checkStreamStatus } from './twitch-api/wtitch-api.mjs'

import { messageListener } from './controllers/messageController.js'
import 'dotenv/config.js'




export async function botStart() {
	await messageListener()
}


botStart();

console.log('Bot is running...');
