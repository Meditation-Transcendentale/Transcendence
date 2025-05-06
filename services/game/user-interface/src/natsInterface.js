// natsInterface.js
import natsClient from './natsClient.js';
import {
	encodeMatchInput
} from './message.js';

export default {
	async connect(natsUrl) {
		await natsClient.connect(natsUrl);
	},

	publishMatchStart(mode, gameId) {
		natsClient.publish(
			`games.${mode}.${gameId}.match.start`,
			JSON.stringify({ gameId })
		);
	},

	publishMatchInput(mode, gameId, inputs) {
		const buf = encodeMatchInput({ gameId, inputs });
		natsClient.publish(
			`games.${mode}.${gameId}.match.input`,
			buf
		);
	},

	subscribeMatchSetup(handler) {
		// handler: (buf, msg) => …
		natsClient.subscribeRaw('games.*.match.setup', handler);
	},

	subscribeStateUpdates(handler) {
		// handler: (buf, msg) => …
		natsClient.subscribeRaw('games.*.*.state.update', handler);
	},

	subscribeMatchEnd(handler) {
		// handler: (data, msg) => …
		natsClient.subscribe('games.*.*.match.end', handler);
	}
};

