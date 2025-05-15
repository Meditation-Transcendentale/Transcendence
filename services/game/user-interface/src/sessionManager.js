// sessionManager.js
import { EventEmitter } from 'events';

export default class SessionManager extends EventEmitter {
	constructor(disconnectTimeoutMs = 15000) {
		super();
		this.allowedByGame = new Map(); // gameId → [ userId, ... ]
		this.sessionsByGame = new Map(); // gameId → Set<sessionId>
		this.sessionInfo = new Map(); // sessionId → { ws, gameId, userId, paddleId, mode }
		this.wsBySession = new Map(); // sessionId → ws
		this.spectatorByGame = new Map();
		this.disconnectTimers = new Map();
		this.disconnectTimeout = disconnectTimeoutMs;
	}

	// Called when GameManager sends MatchSetup
	setMatchSetup(gameId, allowedUserIds, mode) {
		console.log(allowedUserIds);
		this.allowedByGame.set(gameId, { allowedUserIds, mode });
		this.sessionsByGame.set(gameId, new Set());
	}

	handleOpen(ws) {
		const { sessionId, role, gameId } = ws;
		ws.sessionId = sessionId;
		ws.role = role;
		ws.gameId = gameId;
		if (role === 'spectator') {
			this.spectatorsByGame
				.get(gameId)
				.add(ws);
		} else {
			this.wsBySession.set(sessionId, ws);
			this.sessionInfo.set(sessionId, { ws, role });
		}
		ws.send(JSON.stringify({ type: 'welcome', sessionId, role }));
	}

	handleMessage(ws, message, isBinary) {
		if (ws.role === 'spectator') return;
		if (isBinary) return;
		let msg;
		try { msg = JSON.parse(Buffer.from(message).toString()); }
		catch { return; }

		const sessionId = ws.sessionId;
		if (msg.type === 'registerGame') {
			console.log(msg.data);
			const { gameId, uuid } = msg.data;
			this.registerGame(sessionId, gameId, uuid);
		}
		else if (msg.type === 'paddleUpdate') {
			this.emit('paddleUpdate', { sessionId, data: msg.data });
		}
	}

	handleClose(ws) {
		const sessionId = ws.sessionId;
		const info = this.sessionInfo.get(sessionId);
		if (!info || !info.gameId) return;

		const { gameId } = info;
		this.sessionsByGame.get(gameId).delete(sessionId);

		// schedule forced game end if they do not return
		const key = `${gameId}:${sessionId}`;
		const timer = setTimeout(() => {
			this.emit('disconnectTimeout', { sessionId, gameId });
			this.cleanupSession(sessionId);
		}, this.disconnectTimeout);
		this.disconnectTimers.set(key, timer);
	}

	registerGame(sessionId, gameId, userId) {
		const info = this.sessionInfo.get(sessionId);
		const ws = this.wsBySession.get(sessionId);
		const setup = this.allowedByGame.get(gameId);
		console.log("setup")
		console.log(setup);
		if (!setup || !setup.allowedUserIds.includes(userId)) {
			return ws.send(JSON.stringify({ type: 'error', message: 'Not allowed to join this game' }));
		}

		const { allowedUserIds, mode } = setup;
		const sessions = this.sessionsByGame.get(gameId);

		if (!info.gameId) {
			// assign paddle based on index in allowedUserIds
			const paddleId = allowedUserIds.indexOf(userId);
			sessions.add(sessionId);
			Object.assign(info, { ws, gameId, userId, paddleId, mode });
			ws.send(JSON.stringify({ type: 'registered', gameId, paddleId }));

			// once everyone in allowedUserIds has connected, emit “gameReady”
			if (sessions.size === allowedUserIds.length) {
				this.emit('gameReady', { gameId: gameId.toString(), mode });
			}
		} else {
			ws.send(JSON.stringify({
				type: 'registered',
				gameId,
				paddleId: info.paddleId
			}));
		}
	}

	cleanupSession(sessionId) {
		const info = this.sessionInfo.get(sessionId);
		if (info && info.gameId) {
			this.sessionsByGame.get(info.gameId).delete(sessionId);
		}
		this.sessionInfo.delete(sessionId);
		this.wsBySession.delete(sessionId);
	}

	cleanupGame(gameId) {
		this.allowedByGame.delete(gameId);
		this.sessionsByGame.delete(gameId);
	}

	getSessions(gameId) {
		return this.sessionsByGame.get(gameId) || new Set();
	}

	getSessionInfo(sessionId) {
		return this.sessionInfo.get(sessionId);
	}
}

