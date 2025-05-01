// ==== services/natsClient.js ====
import { connect, StringCodec } from 'nats';
const sc = StringCodec();
let nc;

export default {
	/** Connect once at startup */
	async connect(url) {
		nc = await connect({ servers: url });
		return nc;
	},

	/** Publish JSON or string as before */
	publish(subject, payload) {
		const data = typeof payload === 'string'
			? sc.encode(payload)
			: sc.encode(JSON.stringify(payload));
		nc.publish(subject, data);
	},

	/** Subscribe JSON as before */
	subscribe(subject, handler) {
		const sub = nc.subscribe(subject);
		(async () => {
			for await (const msg of sub) {
				const str = sc.decode(msg.data);
				handler(JSON.parse(str), msg);
			}
		})();
	},

	/**
	 * New: generic request that accepts either a Uint8Array (binary)
	 * or string/object (will be JSON-encoded), and returns the raw Msg.
	 */
	async request(subject, payload, opts = {}) {
		let data;
		if (payload instanceof Uint8Array) {
			data = payload;
		} else if (typeof payload === 'string') {
			data = sc.encode(payload);
		} else {
			data = sc.encode(JSON.stringify(payload));
		}
		// opts can include `{ timeout: 2000 }`, etc.
		return await nc.request(subject, data, opts);
	},

	async close() {
		if (nc) await nc.close();
	}
};

