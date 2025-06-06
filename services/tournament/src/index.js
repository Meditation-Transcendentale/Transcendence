import Fastify from 'fastify';
import fastifyCors from  '@fastify/cors';
import config from './config.js';
import { connect } from 'nats';
import TournamentService from './tournamentService'

async function start() {
    nc = await connect(config.NATS_URL);
    const tournamentService = new TournamentService(nc);
    const app = Fastify({ logger: true });
    await app.register(fastifyCors, { origin: '*' });
    app.decorate('tournamentService', tournamentService);
    app.decorate('natsClient', natsClient);
    app.addHook('onClose', async () => {
        tournamentService.shutdown();
        await natsClient.close();
    });

    const subNewTournament = nc.subscribe('games.tournament.create');
    (async () => {
        for await (const msg of subNewTournament) {
            //const playersList decode msg.data somehow
            const tournamentId = tournamentService.create(playerslist);
        }
            //send tournament id to the players uuid
    })
    
    await app.listen({ port: config.PORT, host: '0.0.0.0'});
    app.log.info(`HTTP API listening on ${config.PORT}`);

    const uwsApp = createUwsApp(config.WS_PATH, tournamentService);
    uwsApp.listen(config.WS_PORT, token => {
        if (!token) console.error('uWS failed to start');
        else console.log(`uWS WebSocket listening on ${config.WS_PORT}`);
    });
}

start().catch(console.error);