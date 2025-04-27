export default {
	PORT: 3000,
	HEARTBEAT_INTERVAL: 30_000,
	NATS_URL: "nats://localhost:4222",
	MAX_PLAYERS: {
		pong: { local: 2, ia: 1, online: 2 },
		pongBR: { default: 2 },
		pongIO: { default: 4 },
	},
}
