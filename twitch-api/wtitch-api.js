import axios from 'axios'
import 'dotenv/config.js'

// Функция для получения OAuth токена
async function getTwitchAccessToken() {
	try {
		const response = await axios.post(
			'https://id.twitch.tv/oauth2/token',
			null,
			{
				params: {
					client_id: process.env.TWITCH_CLIENT_ID,
					client_secret: process.env.TWITCH_CLIENT_SECRET,
					grant_type: 'client_credentials',
				},
			}
		)
		return { status: '1', token: response.data.access_token }
	} catch (error) {
		return { status: '0', error: error }
	}
}

async function checkStreamStatus() {

    const tokenResult = await getTwitchAccessToken()
    if (tokenResult.status != 1) {return tokenResult;} 

	try {
		const response = await axios.get(`https://api.twitch.tv/helix/streams`, {
			headers: {
				'Client-ID': process.env.TWITCH_CLIENT_ID,
				Authorization: `Bearer ${tokenResult.token}`,
			},
			params: {
				user_login: 'skyhightm',
			},
		})
		return { status: '1', live: response.data.data.length > 0 } 

	} catch (error) {
		return { status: '0', error: error } 
	}
}

export { checkStreamStatus }
