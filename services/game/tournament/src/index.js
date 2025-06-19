import Fastify from 'fastify';
import fastifyCors from  '@fastify/cors';
import config from './config.js';
import { connect, JSONCodec } from 'nats';
import TournamentService from './tournamentService.js'

async function start() {
    nc = await connect(config.NATS_URL);
    const jc = JSONCodec()
    const tournamentService = new TournamentService(nc, jc);
    const app = Fastify({ logger: true });
    await app.register(fastifyCors, { origin: '*' });
    app.decorate('tournamentService', tournamentService);
    app.decorate('natsClient', natsClient);
    app.addHook('onClose', async () => {
        tournamentService.shutdown();
        await natsClient.close();
    });

    
    await app.listen({ port: config.PORT, host: '0.0.0.0'});
    app.log.info(`HTTP API listening on ${config.PORT}`);
    
    const uwsApp = createUwsApp(config.WS_PATH, tournamentService);
    uwsApp.listen(config.WS_PORT, token => {
        if (!token) console.error('uWS failed to start');
        else console.log(`uWS WebSocket listening on ${config.WS_PORT}`);
    });

    const subNewTournament = nc.subscribe('games.tournament.create');
    (async () => {
        for await (const msg of subNewTournament) {
            //const playersList decode msg.data somehow
            const tournamentId = tournamentService.create(playerslist, uwsApp);

        }
            //send tournament id to the players uuid
    })
}

start().catch(console.error);