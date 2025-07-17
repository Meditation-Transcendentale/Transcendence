// src/uiService.js
import 'dotenv/config';
import natsClient from './natsClient.js';
import { startWsServer } from './uwsServer.js';
import {
	// NATS ↔ UI lifecycle
	decodeMatchSetup,
	encodeMatchStart,
	encodeMatchInput,
	encodeMatchQuit,
	decodeMatchEnd,
	// WS → client messages
	encodeWelcomeMessage,
	encodeGameStartMessage,
	encodeGameEndMessage,
	encodeServerMessage,
	decodeStateMessage,
	encodeErrorMessage,
	// WS ← NATS state update
} from './proto/helper.js';

export default class UIService {
	constructor() {
		this.readyPlayers = new Map(); // gameId → Set<uuid>
		this.allowedByGame = new Map(); // gameId → { players: string[], mode: string }
		this.sessions = new Map(); // uuid → { ws, role, gameId, mode, paddleId? }
		this.games = new Map(); // gameId → Set<sessionId>
		this.nc = null;
	}
	async start() {
		// 0) Connect to NATS
		const nc = await natsClient.connect(process.env.NATS_URL);
		this.nc = nc;

		// 1) Start µWS WebSocket server
		this.uwsApp = startWsServer({
			port: Number(process.env.SERVER_PORT) || 5004,
			handlers: {
				registerGame: this.handleRegisterGame.bind(this),
				paddleUpdate: this.handlePaddleUpdate.bind(this),
				quit: this.handleQuit.bind(this),
				ready: this.handleReady.bind(this),
				spectate: this.handleSpectate.bind(this),
			}
		});

		// 2) MatchSetup → record players & mode
		{
			const sub = nc.subscribe('games.*.*.match.setup');
			(async () => {
				for await (const m of sub) {
					const [, mode, gameId] = m.subject.split('.');
					const { players } = decodeMatchSetup(m.data);
					this.allowedByGame.set(gameId, { players, mode });
					this.games.set(gameId, new Set());
					console.log(`User Interface: New game setup ${gameId}`);
				}
			})();
		}

		// 3) StateUpdate → broadcast StateMessage
		{
			const sub = nc.subscribe('games.*.*.match.state');
			(async () => {
				for await (const m of sub) {
					const [, , gameId] = m.subject.split('.');
					const matchState = decodeStateMessage(m.data);
					const wsPayload = encodeServerMessage({
						state: matchState
					});
					this.uwsApp.publish(gameId, wsPayload, /* isBinary= */ true);
				}
			})();
		}

		// 4) MatchEnd → broadcast GameEndMessage & cleanup
		{
			const sub = nc.subscribe('games.*.*.match.end');
			(async () => {
				for await (const m of sub) {
					const [, , gameId] = m.subject.split('.');
					const { winner } = decodeMatchEnd(m.data);
					const buf = encodeServerMessage({ end: [winner] });
					for (const sid of this.games.get(gameId) || []) {
						const s = this.sessions.get(sid);
						if (s.ws.isAlive) {
							s.ws.send(buf, /* isBinary= */ true);
							s.ws.close();
						}
					}
					this.allowedByGame.delete(gameId);
					this.games.delete(gameId);
					console.log(`Game ${gameId} ended, winner paddleId=${winner}`);
				}
			})();
		}
	}

	handleRegisterGame(ws) {
		const { uuid, role, gameId } = ws;

		const setup = this.allowedByGame.get(gameId);
		if (!setup) {
			const errBuf = encodeErrorMessage({ message: 'Game not found' });
			ws.send(errBuf, true);
			console.log("GAME NOT FOUND");
			return ws.close();
		}

		const { players, mode } = setup;
		console.log("BR =====", mode);

		// 2) Reject if this player isn’t on the whitelist
		if (!players.includes(uuid)) {
			const errBuf = encodeErrorMessage({ message: 'Not allowed to join this game' });
			ws.send(errBuf, true);
			console.log("NOT ALLOWED TO JOIN");
			return ws.close();
		}

		// 3) Prevent double-registration
		// if (this.sessions.has(uuid)) {
		// 	const errBuf = encodeErrorMessage({ message: 'Already registered' });
		// 	ws.send(errBuf, true);
		// 	return ws.close();
		// }

		// 4) Register player
		this.sessions.set(uuid, { ws, role, gameId, mode });
		this.games.get(gameId).add(uuid);

		if (role !== 'spectator') {
			const paddleId = players.indexOf(uuid);
			this.sessions.get(uuid).paddleId = paddleId;

			const welcomeBuf = encodeServerMessage({
				welcome: { paddleId }
			});
			ws.send(welcomeBuf, true);
		}
	}

	handlePaddleUpdate(ws, { paddleId, move }) {
		// TODO maybe check if the paddle id is valid
		const sess = this.sessions.get(ws.uuid);
		console.log(paddleId, move, sess.mode);
		const topic = `games.${sess.mode}.${sess.gameId}.match.input`;
		natsClient.publish(topic, encodeMatchInput({ paddleId, move }));
	}

	handleQuit(ws) {
		const sess = this.sessions.get(ws.uuid);
		const topic = `games.${sess.mode}.${sess.gameId}.match.quit`;
		natsClient.publish(topic, encodeMatchQuit({ uuid: ws.uuid }));
		// ws.close();
	}

	handleReady(ws) {
		const { uuid, mode, gameId } = ws;
		const setup = this.allowedByGame.get(gameId);
		if (!setup) {
			return;
		}

		// 1) Mark this player as ready
		let readySet = this.readyPlayers.get(gameId);
		if (!readySet) {
			readySet = new Set();
			this.readyPlayers.set(gameId, readySet);
		}
		readySet.add(uuid);

		const { players } = setup;

		// 2) if all players are ready
		if (readySet.size === players.length) {
			const topic = `games.${mode}.${gameId}.match.start`;
			try {
				natsClient.publish(topic, encodeMatchStart({ gameId: gameId }));
			}
			catch (err) {
				console.log(err);
			}

			const buf = encodeGameStartMessage({});
			this.uwsApp.publish(gameId, buf, /* isBinary= */ true);

			this.readyPlayers.delete(gameId);
		}
	}

	handleSpectate(ws) {
		const { uuid } = ws;
		const sess = this.sessions.get(uuid);

		// 1) Must already be registered
		if (!sess) {
			//const err = encodeErrorMessage({ message: 'Session not found' });
			//ws.send(err, true);
			return ws.close();
		}

		// 2) Change role
		sess.role = 'spectator';
		delete sess.paddleId;
	}
}

