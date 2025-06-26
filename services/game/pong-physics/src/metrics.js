import Fastify from 'fastify';
import client from 'prom-client';

const app = Fastify({
    logger: true,
    https: {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT)
    }
});

client.collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
    res.type('text/plain');
    res.send(await client.register.metrics());
});

const start = async () => {
	try {
		await app.listen({ port: 5052, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();


