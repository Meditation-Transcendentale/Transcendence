// natsClient.js
import { connect, StringCodec } from 'nats';
const sc = StringCodec();
let nc;

/**
 * A simple NATS client wrapper:
 *  - connect(url): initializes the connection
 *  - publish(subject, payload): string, JSON-object, or Uint8Array
 *  - subscribe(subject, handler): decodes to string and passes to handler
 *  - subscribeRaw(subject, handler): passes raw Uint8Array to handler
 */

export default {
	/** Connects (or reconnects) to the given NATS URL */
	async connect(url) {
		nc = await connect({ servers: url });
		return nc;
	},

	/**
	 * Publish a message.
	 * @param {string} subject 
	 * @param {string|Object|Uint8Array} payload 
	 */
	publish(subject, payload) {
		let data;
		if (payload instanceof Uint8Array) {
			data = payload;
		} else if (typeof payload === 'string') {
			data = sc.encode(payload);
		} else {
			data = sc.encode(JSON.stringify(payload));
		}
		nc.publish(subject, data);
	},

	/**
	 * Subscribe and decode each message to string.
	 * @param {string} subject 
	 * @param {(decoded: string, msg: import('nats').Msg) => void} handler 
	 */
	subscribe(subject, handler) {
		const sub = nc.subscribe(subject);
		(async () => {
			for await (const msg of sub) {
				const str = sc.decode(msg.data);
				handler(str, msg);
			}
		})();
	},

	/**
	 * Subscribe and deliver the raw Uint8Array.
	 * @param {string} subject 
	 * @param {(data: Uint8Array, msg: import('nats').Msg) => void} handler 
	 */
	subscribeRaw(subject, handler) {
		const sub = nc.subscribe(subject);
		(async () => {
			for await (const msg of sub) {
				handler(msg.data, msg);
			}
		})();
	}
};

