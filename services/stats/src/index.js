import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, StringCodec } from "nats";

import { statusCode, returnMessages } from "./returnValues.js";
import handleGameFinished from "./natsHandler.js";
import statsRoutes from "./statsRoutes.js";

dotenv.config({ path: "../../.env" });

const app = Fastify({
	logger: true,
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

(async () => {
	const nc = await connect({ servers: process.env.NATS_URL });
	const sc = StringCodec();

	const sub = nc.subscribe("game.finished");
	for await (const msg of sub) {
		const data = JSON.parse(sc.decode(msg.data));
		handleGameFinished(data);
	}
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