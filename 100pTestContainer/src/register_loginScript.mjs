import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import WebSocket from 'ws';

dotenv.config({ path: "../../.env" });

const API_URL = 'https://api-gateway:3000';

function decodeServerMessage(buffer) {
	try {
		const text = new TextDecoder().decode(buffer);
		return JSON.parse(text);
	} catch (error) {
		return buffer;
	}
}

async function main()
{
	const agent = new https.Agent({ rejectUnauthorized: false });
	let lobbyId = null;
	for (let i = 1; i <= 20; i++) {

		let username = `user${i}`;
		let password = `Password${i}`;
		// console.log("lobbyId:", lobbyId);


		try {
			await axios.post(`${API_URL}/register`, {
				username: username,
				password: password
			}, { headers: { 'x-api-key': process.env.API_GATEWAY_KEY }, httpsAgent: agent });

			// console.log(`Registered: ${username}`);

			const response = await axios.post(`${API_URL}/auth/login`, {
				username: username,
				password: password
			}, { 
				headers: { 'x-api-key': process.env.API_GATEWAY_KEY }, 
				httpsAgent: agent, 
				withCredentials: true 
			});

			const cookies = response.headers['set-cookie'];

			// console.log(`Logged in: ${username}`);
			
			if (i == 1) {
				const state = await axios.post(`${API_URL}/lobby/create`,{
					mode: 'br',
					map: 'default'
				}, {
					headers: {
						'x-api-key': process.env.API_GATEWAY_KEY,
						'Cookie': cookies ? cookies.join('; ') : ''
					}, 
					httpsAgent: agent
				});

				lobbyId = state.data.lobbyId;
				// console.log('Created a battle royale lobby:', lobbyId);
			}

			const user = await axios.get(`${API_URL}/info/me`, { 
				headers: { 
					'x-api-key': process.env.API_GATEWAY_KEY, 
					'Cookie': cookies ? cookies.join('; ') : ''
				},
				httpsAgent: agent
			});

			const uuid = user.data.userInfo.uuid;
			console.log(username, 'uuid:', uuid);

			// const url = `wss://172.17.0.1:7000/lobbies?uuid=${encodeURIComponent(uuid)}&lobbyId=${encodeURIComponent(lobbyId)}`;
			// const ws = new WebSocket(url, {
			// 	rejectUnauthorized: false,
			// 	headers: {
			// 		'Cookie': cookies ? cookies.join('; ') : ''
			// 	}
			// });

			// ws.onmessage = (msg) => {
			// 	const buf = new Uint8Array(msg.data);
			// 	const payload = decodeServerMessage(buf);
			// 	console.log('Decoded payload:', payload);
			// };

			// ws.onopen = () => {
			// 	console.log(`✅ WebSocket connected for ${username}`);
			// };

			// ws.onerror = (error) => {
			// 	console.error(`❌ WebSocket error for ${username}:`, error);
			// };

			// ws.onclose = () => {
			// 	console.log(`🔌 WebSocket closed for ${username}`);
			// };

			// if (i > 1) {
			// 	const searchResponse = await axios.post(`${API_URL}/info/search`, {
			// 		identifier: `user${i - 1}`,
			// 		type: 'username'
			// 	}, { 
			// 		headers: { 
			// 			'x-api-key': process.env.API_GATEWAY_KEY, 
			// 			'Cookie': cookies ? cookies.join('; ') : ''
			// 		}, 
			// 		httpsAgent: agent });

			// 	console.log('Searched:', `user${i - 1}`, 'UUID:', searchResponse.data.data.uuid);

				// await axios.post(`${API_URL}/friends/add`, {
				// 	inputUuid: searchResponse.data.data.uuid
				// }, { 
				// 	headers: { 
				// 		'x-api-key': process.env.API_GATEWAY_KEY, 
				// 		'Cookie': cookies ? cookies.join('; ') : ''
				// 	}, 
				// 	httpsAgent: agent });

				// console.log('Friend request sent to:', `user${i - 1}`);
			// }

		}
		catch (error) {
			console.error(`Error with ${username}:`, error.response ? error.response.data : error.message);
		}
	}


}

main();

// creation lobby pong br : route 
// rejoindre ws lobby
