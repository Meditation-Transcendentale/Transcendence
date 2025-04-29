// ==== natsClient.js ====
import { connect, StringCodec } from 'nats';
const sc = StringCodec();
let nc;

export default {
	async connect(url) {
		nc = await connect({ servers: url });
		return nc;
	},
	publish(subject, payload) {
		const data = typeof payload === 'string'
			? sc.encode(payload)
			: sc.encode(JSON.stringify(payload));
		nc.publish(subject, data);
	},
	subscribe(subject, handler) {
		const sub = nc.subscribe(subject);
		(async () => {
			for await (const msg of sub) {
				const str = sc.decode(msg.data);
				handler(JSON.parse(str), msg);
			}
		})();
	},

	async close() {
		if (nc) await nc.close()
	}
};
