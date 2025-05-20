// src/config.js
export default {
	PORT: 5001,
	HEARTBEAT_INTERVAL: 30_000,
	NATS_URL: 'nats://nats:4222',
	WS_PATH: '/lobbies',

	MAX_PLAYERS: {
		ia: 1,
		online: 2,
		local: 1,
		pongBR: 100,
		pongIO: 20,
	},
};
