import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import config from './config.js';
import TournamentService from './tournamentService.js';
import { decodeTournamentCreate } from './proto/helper.js';

async function start() {
    await natsClient.connect(config.NATS_URL);

    const tournamentService = new TournamentService();
	const app = Fastify({
		logger: true,
		https: {
			key: fs.readFileSync(process.env.SSL_KEY),
			cert: fs.readFileSync(process.env.SSL_CERT)
		}
	});
    await app.register(fastifyCors, { origin: '*' });
    app.decorate('tournamentService', tournamentService);
    app.decorate('natsClient', natsClient);
    app.addHook('onClose', async () => {
        tournamentService.shutdown();
        await natsClient.close();
    });

    await app.listen({ port: config.PORT, host: '0.0.0.0' });
    app.log.info(`HTTPS API listening on ${config.PORT}`);

    const uwsApp = createUwsApp(config.WS_PATH, tournamentService);
    uwsApp.listen(config.WS_PORT, token => {
        if (!token) console.error('uWS failed to start');
        else console.log(`uWS WebSocket listening on ${config.WS_PORT}`);
    });

    const subNewTournament = nc.subscribe('games.tournament.create');
    (async () => {
        for await (const msg of subNewTournament) {
            const playersList = decodeTournamentCreate(msg.data);
            const tournamentId = tournamentService.create(playersList, uwsApp);

        }
        //send tournament id to the players uuid
    })
}

start().catch(console.error);