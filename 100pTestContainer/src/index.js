// MAIN LOOP
import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import { decodeServerMessage, decodeTournamentServerMessage, encodeClientMessage, encodeTournamentClientMessage } from "./proto/helper";
import WebSocket from 'ws';
import { User } from './User';

dotenv.config({ path: "../../.env" });

const API_URL = 'https://api-gateway:3000';

async function userConnectionInit(nbuser, lobbyId) {
	console.log(`[PLAYER TEST] creating ${nbuser} users for lobbyId: ${lobbyId}`);
	for (let i = 1; i <= nbuser; i++) {

		let username = `user${i}`;
		let password = `Password${i}`;
		const response = await axios.post(`${API_URL}/auth/login`, {
			username: username,
			password: password
		}, {
			headers: { 'x-api-key': process.env.API_GATEWAY_KEY },
			httpsAgent: agent,
			withCredentials: true
		});
		const cookies = response.headers['set-cookie'];
		const user = await axios.get(`${API_URL}/info/me`, {
			headers: {
				'x-api-key': process.env.API_GATEWAY_KEY,
				'Cookie': cookies ? cookies.join('; ') : ''
			},
			httpsAgent: agent
		});

		const uuid = user.data.userInfo.uuid;
		console.log(username, 'uuid:', uuid);
	}

}

async function main() {
	console.log(`[PLAYER TEST] started`);
	const agent = new https.Agent({ rejectUnauthorized: false });
	const lobbyId = process.argv.slice(2);
	const nbuser = process.argv.slice(3);
	const Users = User[nbuser];
	await userConnectionInit(nbuser, lobbyId);
}

main().catch((err) => {
	console.error(`[TEST USER] fatal error:`, err);
	process.exit(1);
});

