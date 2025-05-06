// handlers.js
import { decodeMatchSetup, decodeStateUpdate } from './message.js';
import SessionManager from './sessionManager.js';
import natsInterface from './natsInterface.js';
import { startWsServer } from './wsServer.js';

export default async function registerHandlers() {
	await natsInterface.connect(process.env.NATS_URL);
	const sm = new SessionManager();

	natsInterface.subscribeMatchSetup((buf, msg) => {
		const req = decodeMatchSetup(buf);
		const mode = msg.subject.split('.')[1];
		sm.setMatchSetup(req.gameId, req.allowedUserIds, mode);
	});

	sm.on('gameReady', ({ gameId, mode }) => {
		natsInterface.publishMatchStart(mode, gameId);
	});

	const wsApp = startWsServer({
		port: Number(process.env.PORT) || 3000,
		onOpen: sm.handleOpen.bind(sm),
		onMessage: sm.handleMessage.bind(sm),
		onClose: sm.handleClose.bind(sm)
	});

	sm.on('paddleUpdate', ({ sessionId, data }) => {
		const info = sm.getSessionInfo(sessionId);
		if (!info) return;
		natsInterface.publishMatchInput(
			info.mode,
			info.gameId,
			[{ playerId: info.paddleId, ...data }]
		);
	});

	natsInterface.subscribeStateUpdates((buf) => {
		const { state } = decodeStateUpdate(buf);
		for (const sessionId of sm.getSessions(state.gameId)) {
			const info = sm.getSessionInfo(sessionId);
			if (info) info.ws.send(buf, /* isBinary= */ true);
		}
	});

	natsInterface.subscribeMatchEnd((data) => {
		const { gameId, winner } = JSON.parse(data);
		for (const sessionId of sm.getSessions(gameId)) {
			const info = sm.getSessionInfo(sessionId);
			if (info) {
				info.ws.send(JSON.stringify({ type: 'gameEnd', gameId, winner }));
				info.ws.close();
			}
		}
		sm.cleanupGame(gameId);
	});
}

