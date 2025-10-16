// src/uiService.js
import "dotenv/config";
import natsClient from "./natsClient.js";
import { startWsServer } from "./uwsServer.js";
import {
	// NATS ↔ UI lifecycle
	decodeMatchSetup,
	encodeMatchStart,
	encodeMatchInput,
	encodeMatchQuit,
	decodeMatchEnd,
	decodeMatchEndBr,
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
		const nc = await natsClient.connect(process.env.NATS_URL);
		this.nc = nc;
		this.uwsApp = startWsServer({
			port: Number(process.env.SERVER_PORT) || 5004,
			handlers: {
				registerGame: this.handleRegisterGame.bind(this),
				paddleUpdate: this.handlePaddleUpdate.bind(this),
				quit: this.handleQuit.bind(this),
				ready: this.handleReady.bind(this),
				spectate: this.handleSpectate.bind(this),
			},
		});

		{
			const sub = nc.subscribe("games.*.*.match.setup");
			(async () => {
				for await (const m of sub) {
					const [, mode, gameId] = m.subject.split(".");
					const { players } = decodeMatchSetup(m.data);
					this.allowedByGame.set(gameId, { players, mode });
					this.games.set(gameId, new Set());
					console.log(`User Interface: New game setup ${gameId}`);
				}
			})();
		}

		{
			const sub = nc.subscribe("games.*.*.match.state");
			(async () => {
				for await (const m of sub) {
					const [, , gameId] = m.subject.split(".");
					const matchState = decodeStateMessage(m.data);
					const wsPayload = encodeServerMessage({
						state: matchState,
					});
					this.uwsApp.publish(gameId, wsPayload, /* isBinary= */ true);
				}
			})();
		}

		{
			const sub = nc.subscribe('games.*.*.match.end');
			(async () => {
				for await (const m of sub) {
					const [, mode, gameId] = m.subject.split('.');

					let buf;
					if (mode === 'br') {
						const endData = decodeMatchEndBr(m.data);
						buf = encodeServerMessage({ endBr: endData });
					} else {
						const endData = decodeMatchEnd(m.data);
						buf = encodeServerMessage({ end: endData });
					}

					for (const sid of this.games.get(gameId) || []) {
						const s = this.sessions.get(sid);
						if (s && s.gameId === gameId && s.ws.isAlive) {
							s.ws.send(buf, /* isBinary= */ true);
							s.ws.close();
						}
						this.sessions.delete(sid);
					}
					this.allowedByGame.delete(gameId);
					this.games.delete(gameId);
					this.readyPlayers.delete(gameId);
				}
			})();
		}
	}

	handleRegisterGame(ws) {
		const { uuid, role, gameId } = ws;

		const setup = this.allowedByGame.get(gameId);
		if (!setup) {
			const errBuf = encodeErrorMessage({ message: "Game not found" });
			ws.send(errBuf, true);
			console.log("GAME NOT FOUND");
			return ws.close();
		}

		const { players, mode } = setup;

		if (!players.includes(uuid)) {
			this.sessions.set(uuid, { ws, role: 'spectator', gameId, mode, uuid });
			this.games.get(gameId).add(uuid);
			this.handleSpectate(ws);
			return;
		}
		this.sessions.set(uuid, { ws, role, gameId, mode, uuid });
		this.games.get(gameId).add(uuid);

		if (role !== "spectator") {
			const paddleId = players.indexOf(uuid);
			this.sessions.get(uuid).paddleId = paddleId;

			const welcomeBuf = encodeServerMessage({
				welcome: { paddleId },
			});
			ws.send(welcomeBuf, true);
		}
	}

	handlePaddleUpdate(ws, { paddleId, move }) {
		const sess = this.sessions.get(ws.uuid);
		const topic = `games.${sess.mode}.${sess.gameId}.match.input`;
		natsClient.publish(topic, encodeMatchInput({ paddleId, move }));
	}

	handleQuit(ws) {
		const sess = this.sessions.get(ws.uuid);
		if (!sess) return;

		const { uuid, mode, gameId, role } = sess;

		if (role !== 'spectator') {
			const topic = `games.${mode}.${gameId}.match.quit`;
			natsClient.publish(topic, encodeMatchQuit({ uuid }));
		}

		this.sessions.delete(uuid);

		const gameSessionSet = this.games.get(gameId);
		if (gameSessionSet) {
			gameSessionSet.delete(uuid);
		}

		const readySet = this.readyPlayers.get(gameId);
		if (readySet) {
			readySet.delete(uuid);
		}
	}

	handleReady(ws) {
		const { uuid, mode, gameId } = ws;
		const setup = this.allowedByGame.get(gameId);
		if (!setup) {
			console.log(`[UI] Ready handler: setup not found for gameId ${gameId}`);
			return;
		}

		let readySet = this.readyPlayers.get(gameId);
		if (!readySet) {
			readySet = new Set();
			this.readyPlayers.set(gameId, readySet);
		}
		readySet.add(uuid);

		const { players, mode: setupMode } = setup;

		const gameMode = mode || setupMode;

		let requiredPlayers = players.length;
		if (gameMode === 'br') {
			const realPlayers = players.filter(p => !p.startsWith('bot-'));
			requiredPlayers = realPlayers.length;
			console.log(`[UI] BR ready check: ${readySet.size}/${requiredPlayers} real players ready (${players.length} total including bots)`);
		}

		if (readySet.size === requiredPlayers) {
			console.log(`[UI] All players ready! Starting game ${gameId}`);
			const topic = `games.${gameMode}.${gameId}.match.start`;

			const startBuff = encodeServerMessage({
				start: {}
			});
			this.uwsApp.publish(gameId, startBuff, /* isBinary= */ true);

			try {
				natsClient.publish(topic, encodeMatchStart({ gameId: gameId }));
			}
			catch (err) {
				console.log(err);
			}

			this.readyPlayers.delete(gameId);
		}
	}

	handleSpectate(ws) {
		const { uuid } = ws;
		const sess = this.sessions.get(uuid);

		if (!sess) {
			return ws.close();
		}

		sess.role = 'spectator';
		delete sess.paddleId;

		const welcomeBuf = encodeServerMessage({
			welcome: { paddleId: -1 },
		});
		ws.send(welcomeBuf, true);
	}
}
