// services/natsClient.js
import { connect, StringCodec } from 'nats';
const sc = StringCodec();
let nc;

export default {
	/** Call once at startup */
	async connect(url) {
		nc = await connect({ servers: url });
		return nc;
	},

	/** Publish JSON or string */
	publish(subject, payload) {
		const data = typeof payload === 'string'
			? sc.encode(payload)
			: sc.encode(JSON.stringify(payload));
		nc.publish(subject, data);
	},

	/** Simple JSON subscription */
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
	 * Binary request/reply helper.
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
		return await nc.request(subject, data, opts);
	},

	/**
	 * Raw subscription: hands you the Uint8Array and the Msg,
	 */
	subscribeRaw(subject, handler) {
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

