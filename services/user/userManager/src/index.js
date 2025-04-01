import Fastify from 'fastify';
import { connect, StringCodec  } from 'nats';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: "../../../../.env" });

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
		return res.code(401).send({ message: 'Unauthorized' });
	}
	done();
}

app.addHook('onRequest', verifyApiKey);

let natsClient;
const sc = StringCodec();;
(async () => {
  natsClient = await connect({ servers: 'nats://nats:4222' });
  app.log.info('Connected to NATS');
})();


app.post('/user-update', async (req, res) => {

    // const userHeader = req.headers['user'];
    // if (!userHeader) {
    //     return res.code(400).send({ message: 'Unauthorized' });
    // }
    console.log("Sending message to NATS");
    const response = await natsClient.request('user.update', JSON.stringify({ reply: 'TEST' }), { timeout: 5000 });
    //natsClient.publish('user.update', sc.encode(req.body), { reply: 'user.update.response' });
    console.log(response.data);
}
);





const start = async () => {
	try {
		await app.listen({ port: 3005, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};




start();
