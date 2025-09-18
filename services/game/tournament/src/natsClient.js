import { connect } from 'nats';
import dotenv from 'dotenv';
let nc;

dotenv.config();

export default {
	async connect(url) {
		nc = await connect({ 
			servers: url,
			token: process.env.NATS_GAME_TOKEN,
			tls: { rejectUnauthorized: false }
		});
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
