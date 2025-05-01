export function registerLobbySubscriptions(natsClient, gameManager) {
	const sub = nc.subscribe('game.state');
	(async () => {
		for await (const msg of sub) {
			// const data = jc.decode(msg.data);
			gameManager.handlePhysicsResult(msg.data);
		}
	})();

	const subInput = nc.subscribe('game.input');
	(async () => {
		for await (const msg of subInput) {
			const data = jc.decode(msg.data);
			gameManager.handleInput(data);
		}
	})();

	const events = nc.subscribe('game.pong.events');
	(async () => {
		for await (const msg of events) {
			const ev = jc.decode(msg.data);
			if (ev.type === 'goal')
				gameManager._onGoal(ev);
		}
	})();


}
