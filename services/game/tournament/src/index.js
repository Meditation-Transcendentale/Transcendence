import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import config from './config.js';
import TournamentService from './tournamentService.js';
import { decodeTournamentCreateRequest, encodeTournamentCreateResponse } from './proto/helper.js';
import natsClient from './natsClient.js';
import fs from 'fs';
import { createUwsApp } from './uwsServer.js';

async function start() {
    await natsClient.connect(process.env.NATS_URL);

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

    const subNewTournament = natsClient.subscribe('games.tournament.create');
    (async () => {
        for await (const msg of subNewTournament) {
            const playersList = decodeTournamentCreateRequest(msg.data);
            const tournamentId = tournamentService.create(playersList, uwsApp);
            const respTournamentCreate = encodeTournamentCreateResponse({
                tournamentId: tournamentId,
            });
            msg.respond(respTournamentCreate);
        }
        //send tournament id to the players uuid
    })
}

start().catch(console.error);