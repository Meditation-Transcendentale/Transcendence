// src/natsClient.js
import { connect } from 'nats';
let nc;

export default {
	/** @param {string} url */
	async connect(url) {
		nc = await connect({ servers: url });
		return nc;
	},

	/** @param {string} subject @param {Uint8Array} payload */
	publish(subject, payload) {
		if (!nc) throw new Error('NATS not connected');
		nc.publish(subject, payload);
	},

	/**
	 * @param {string} subject
	 * @param {(data: Uint8Array, msg: import('nats').Msg) => void} handler
	 */
	subscribe(subject, handler) {
		const sub = nc.subscribe(subject);
		(async () => {
			for await (const msg of sub) {
				handler(msg.data, msg);
			}
		})();
	},

	async close() {
		if (nc) await nc.close();
	}
};
