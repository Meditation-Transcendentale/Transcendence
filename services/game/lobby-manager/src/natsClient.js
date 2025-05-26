// src/natsClient.js
import { connect } from 'nats';
let nc;

export default {
	async connect(url) {
		nc = await connect({ servers: url });
		return nc;
	},

	publish(subject, uint8array) {
		nc.publish(subject, uint8array);
	},

	subscribe(subject, handler) {
		const sub = nc.subscribe(subject);
		(async () => {
			for await (const msg of sub) {
				handler(msg.data, msg);
			}
		})();
	},

	async request(subject, uint8array, opts = {}) {
		if (!nc) throw new Error('NATS client not connected');
		const msg = await nc.request(subject, uint8array, opts);
		return msg.data;
	},

	async close() {
		if (nc) await nc.close();
	}
};
