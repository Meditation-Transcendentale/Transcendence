import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, JSONCodec } from "nats";

import { handleErrorsNatsNoReply } from "../../shared/handleErrors.mjs";
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import statsRoutes from "./statsRoutes.js";

dotenv.config({ path: "../../../.env" });

const app = Fastify({
	// logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

const verifyApiKey = (req, res, done) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== process.env.API_GATEWAY_KEY) {
		return res.code(statusCode.UNAUTHORIZED).send({ message: returnMessages.UNAUTHORIZED });
	}
	done();
}

app.addHook('onRequest', verifyApiKey);

const nats = await connect({ 
	servers: process.env.NATS_URL,
	token: process.env.NATS_TOKEN,
	tls: { rejectUnauthorized: false }
});
const jc = JSONCodec();

async function handleNatsSubscription(subject, handler) {
	const sub = nats.subscribe(subject);
	for await (const msg of sub) {
		try {
			await handler(msg);
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			const code = error.code || 500;
			if (msg.reply) {
				nats.publish(msg.reply, jc.encode({ success: false, status, message, code }));
			}
			console.error(`Error handling message on subject ${subject}:`, error);
		}
	}
}



handleErrorsNatsNoReply(async () => {
	await Promise.all([
		handleNatsSubscription("games.online.*.match.end", async (msg) => {
			nats.request('stats.addClassicMatchStatsInfos', msg.data, { timeout: 1000 });
		}),
		handleNatsSubscription("games.br.*.match.end", async (msg) => {
			nats.request('stats.addBRMatchStatsInfos', msg.data, { timeout: 1000 });
		}),
	]);
})();

app.register(statsRoutes);

const start = async () => {
	try {
		await app.listen({ port: 6000, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();

export { nats, jc };