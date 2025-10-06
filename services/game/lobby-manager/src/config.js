// src/config.js
export default {
	PORT: 5001,
	WS_PORT: 5011,
	HEARTBEAT_INTERVAL: 500_000, //TODO TO CHANGE
	NATS_URL: 'nats://nats_game:4222',
	WS_PATH: '/lobbies',
	MAX_PLAYERS: {
		ai: 1,
		online: 2,
		local: 1,
		br: 100,
		pongIO: 20,
		tournament: 16,
	},
};
