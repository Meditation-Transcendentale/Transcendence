import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import config from './config.js';
import TournamentService from './tournamentService.js';
import { decodeTournamentCreateRequest, encodeTournamentCreateResponse } from './proto/helper.js';
import natsClient from './natsClient.js';
import fs from 'fs';
import { createUwsApp } from './uwsServer.js';
import { tournament } from './proto/message.js';

async function start() {
    const nc = await natsClient.connect(process.env.NATS_URL);

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

    const subCreate = nc.subscribe('games.tournament.create');
    (async () => {
        for await (const msg of subCreate) {
            const req = decodeTournamentCreateRequest(msg.data);
            console.log(`${req}|${req.players}|${req.players[0]}|${req.players[1]}|${req.players[2]}|${req.players[3]}|`)
            const tournamentId = tournamentService.create(req.players, uwsApp);
            const respTournamentCreate = encodeTournamentCreateResponse({
                tournamentId: tournamentId,
            });
            console.log(tournamentId);
            msg.respond(respTournamentCreate);
        }
    })();
}

start().catch(console.error);