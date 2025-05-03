// services/gameManagerNats.js
import { connect } from 'nats';
import * as matchCreate from './handlers/matchCreate.js';
import * as physicsRequest from './handlers/physicsRequest.js';
import * as stateUpdate from './handlers/stateUpdate.js';
import * as matchInput from './handlers/matchInput.js';

const handlers = [
	matchCreate,
	physicsRequest,
	stateUpdate,
	matchInput
];

export async function startGameManager(natsUrl) {
	const nc = await connect({ servers: natsUrl });
	console.log('Game Manager connected to NATS');

	for (const { subject, handle } of handlers) {
		const sub = nc.subscribe(subject);
		console.log(`  Subscribed to ${subject}`);

		; (async () => {
			for await (const msg of sub) {
				try {
					await handle(msg, nc);
				} catch (err) {
					console.error(`Error handling ${subject}:`, err);
				}
			}
		})();
	}
}

