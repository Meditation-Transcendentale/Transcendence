import {
	decodeServerMessage,
	decodeTournamentServerMessage,
	encodeTournamentClientMessage,
} from "./proto/helper";

export async function startGameTournament(user) {
	const uuid = user.uuid();
	const gameId = user.gameId();
	const url =
		`wss://${window.location.hostname}:7000/game?` +
		`uuid=${encodeURIComponent(uuid)}&` +
		`gameId=${encodeURIComponent(gameId)}`;
	const ws = new Websocket(url);
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
	const url = `wss://${window.location.hostname
		}:5019/sacrifice?uuid=${encodeURIComponent(
			uuid
		)}&tournamentId=${encodeURIComponent(tournamentId)}`;

	const ws = new WebSocket(url);
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
			user.gameId(gameId);
			ws.close();
		}
	};
}
