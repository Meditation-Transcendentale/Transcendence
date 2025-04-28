export default {
	PORT: 5001,
	HEARTBEAT_INTERVAL: 30_000,
	NATS_URL: "nats://nats:4222",
	MAX_PLAYERS: {
		pong: { local: 1, ia: 1, online: 2 },
		pongBR: { default: 100 },
		pongIO: { default: 20 },
	},
}
