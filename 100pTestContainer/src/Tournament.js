import {
	decodeServerMessage,
	decodeTournamentServerMessage,
	encodeTournamentClientMessage,
} from "./proto/helper.js";
import { tournament } from "./proto/message.js";

export async function startGameTournament(user) {
	const uuid = user.uuid();
	const gameId = user.gameId();
	const url =
		`wss://${window.location.hostname}:7000/game?` +
		`uuid=${encodeURIComponent(uuid)}&` +
		`gameId=${encodeURIComponent(gameId)}`;
	const ws = new Websocket(url, { rejectUnauthorized: false });
	ws.binaryType = "arraybuffer";

	ws.onmessage = async (msg) => {
		const buf = new Uint8Array(msg.data);
		const payload = decodeServerMessage(buf);
		if (payload.end) {
			user.gameId(null);
			ws.close();
			return;
		}
	}
}

export async function settingUpTournament(user) {
	const uuid = user.uuid();
	const tournamentId = user.tournamentId();
	console.log (`${uuid}|${tournamentId}`);
	const url = `wss://${window.location.hostname
		}:7000/sacrifice?uuid=${encodeURIComponent(
			uuid
		)}&tournamentId=${encodeURIComponent(tournamentId)}`;

	const ws = new WebSocket(url, { rejectUnauthorized: false });
	ws.binaryType = "arraybuffer";

	ws.onmessage = async (msg) => {
		const buf = new Uint8Array(msg.data);
		const payload = decodeTournamentServerMessage(new Uint8Array(buf));

		if (payload.readyCheck) {
			const readyBuf = encodeTournamentClientMessage({ ready: {} });
			ws.send(readyBuf);
		}
		if (payload.startGame) {
			const gameId = payload.startGame.gameId;
			user.setGameId(gameId);
			ws.close();
		}
	};
}
