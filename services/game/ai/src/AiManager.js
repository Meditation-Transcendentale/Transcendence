import natsClient from './natsClient';
import {
    decodeStateUpdate,
    encodeStateUpdate,
    decodeMatchSetup
} from './proto/helper';

export class AiManager {
    constructor(nc) {
        this.nc = nc;
        this.games = new Map(); // gameId -> {bestMove, profile}
    }

    async init(natsUrl) {
        this.nc = await natsClient.connect(natsUrl);


        const subCreate = this.nc.subscribe('games.ia.*.match.setup');
        (async () => {
            for await (const msg of subCreate) {
                const [, , gameId] = msg.subject.split('.');
                //const data = decodeMatchCreateRequest(msg.data);
                this.games.set(gameId.toString(), {
                    bestMove: null,
                    profile: null //data.profile to change when added
                })
            }
        })

        const subGetState = nc.subscribe(`games.ia.*.match.state`);
        (async () => {
            for await (const msg of subGetState) {
                const [, , gameId] = msg.subject.split('.');
                const state = decodeStateUpdate(msg.data);
                const nextPosition = processState(state);
                processMove(nextPosition);

                const match = this.games.get(gameId);
                if (!match) {
                    console.error (`match not found`);
                    break;
                }

                setInterval (() => {
                    match.bestMove = getBestMove(state);
                }, 1000);

            }
        })();
    }

}