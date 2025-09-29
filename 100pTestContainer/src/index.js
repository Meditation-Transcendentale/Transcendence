// MAIN LOOP
import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import { decodeServerMessage, decodeTournamentServerMessage, encodeClientMessage, encodeTournamentClientMessage } from "./proto/helper";
import WebSocket from 'ws';
import { User } from './User';
import { settingUpTournament, startGameTournament } from './Tournament';

dotenv.config({ path: "../../.env" });

const API_URL = 'https://api-gateway:3000';

function lobbyConnectionInit(user) {
	const url = `wss://localhost:7000/lobbies?uuid=${encodeURIComponent(uuid)}&lobbyId=${encodeURIComponent(id)}`;
	const ws = new WebSocket(url);
	ws.binaryType = "arraybuffer";

	this.ws.onopen = (e) => {
	}

	this.ws.onmessage = (msg) => {
		const buf = new Uint8Array(msg.data);
		const payload = decodeServerMessage(buf);
		if (payload.error != null)
			return;

		if (payload.start != null) {
			const gameId = payload.start.gameId;
			user.gameId(gameId);
			this.ws?.close();
		}

		if (payload.startTournament != null) {
			const tournamentId = payload.startTournament.tournamentId;
			user.tournamentId(tournamentId);
			this.ws?.close();
		}
	}

	this.ws.onclose = () => {
	}

	this.ws.onerror = (err) => {
		console.warn(err);
	}
}

async function lobbySetup(users, nbuser) {
	for (let i = 0; i < nbuser; i++) {
		lobbyConnectionInit(users[i]);
	}
}

async function gameSetup(users, nbuser) {
	for (let i = 0; i < nbuser; i++) {
		if (users[i].gameId)
			startGameTournament(users[i]);
	}
}

async function tournamentSetup(users, nbuser) {
	for (let i = 0; i < nbuser; i++) {
		settingUpTournament(users[i]);
	}
}

async function userConnectionInit(Users, nbuser, lobbyId) {
	console.log(`[PLAYER TEST] connection ${nbuser} users for lobbyId: ${lobbyId}`);
	for (let i = 0; i < nbuser; i++) {

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
		Users[i] = new User(uuid, lobbyId);
		console.log(username, 'uuid:', uuid);
	}

}

async function main() {
	console.log(`[PLAYER TEST] started`);
	const agent = new https.Agent({ rejectUnauthorized: false });
	const lobbyId = process.argv.slice(2);
	const nbuser = process.argv.slice(3);
	const users = User[nbuser];
	await userConnectionInit(users, nbuser, lobbyId);
	await lobbySetup();
	if (users[1].tournamentId) {
		for (let i = 0; i < Math.log2(nbuser); i++) {
			await tournamentSetup(users, nbuser);
			await gameSetup(users, nbuser);
		}
	}
	console.log("The end");

}

main().catch((err) => {
	console.error(`[TEST USER] fatal error:`, err);
	process.exit(1);
});

