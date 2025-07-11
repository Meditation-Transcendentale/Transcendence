// src/config.js
export default {
	PORT: 5001,
	WS_PORT: 5011,
	HEARTBEAT_INTERVAL: 30_000,
	NATS_URL: 'nats://nats_game:4222',
	WS_PATH: '/lobbies',
	MAX_PLAYERS: {
		ia: 1,
		online: 2,
		local: 1,
		br: 1,
		pongIO: 20,
	},
};
