import natsClient from './natsClient.js';
import {
    decodeStateUpdate,
    decodeMatchCreateRequest,
    encodeMatchInput
} from './proto/helper.js';
import { predictBallState } from './physics.js';
import { topLevelSearch } from './bstar.js';
import { performance } from 'node:perf_hooks';
import { GameStateNode } from './GameStateNode.js';

export class AiManager {
    constructor(nc) {
        this.nc = nc;
        this.games = new Map(); // gameId -> {bestMove, profile, lastRun}

        this.subCreate = null;
        this.subState = null;
        this.subEnd = null;
    }

    async init(natsUrl) {
        this.nc = await natsClient.connect(natsUrl);

        const subCreate = this.nc.subscribe('games.ai.*.match.setup');
        (async () => {
            for await (const msg of subCreate) {
                const [, , gameId] = msg.subject.split('.');
                //const data = decodeMatchCreateRequest(msg.data);
                if (!this.games.has(gameId)) {
                    this.games.set(gameId, {
                        targetOffset: null,
                        profile: null, //toenable
                        lastRun: 0,
                    });
                }
            }
        })().catch(() => { });

        const subGetState = this.nc.subscribe(`games.ai.*.match.state`);
        (async () => {
            for await (const msg of subGetState) {
                // console.log(`NATS: state`);
                const [, , gameId] = msg.subject.split('.');

                const match = this.games.get(gameId);
                if (!match) {
                    console.log ("no match found");
                    continue;
                }

                let state;
                try {
                    state = decodeStateUpdate(msg.data);
                } catch {
                    console.log ("error decoding state");
                    continue;
                }

                if (!state?.balls?.length) continue;
                if (!state?.paddles || state.paddles.length < 2) continue;

                const now = performance.now();
                if (now - match.lastRun >= 1000) {
                    const node = this.stateToNode(state);
                    const result = topLevelSearch(node);
                    match.targetOffset = node.ballState.ballVel[0] >= 0 ? result?.aiPaddlePos : result?.futureBallState.ballPos[1];
                    match.lastRun = now;
                }

                if (match.targetOffset == null) continue;
                const myPaddle = state.paddles[1];
                const actualMove = myPaddle.move;
                const pos = myPaddle.offset;

                const diff = match.targetOffset - pos;

                let desiredMove = 0;
                if (diff > 0.1) desiredMove = 1;
                else if (diff < -0.1) desiredMove = -1;
                if (desiredMove !== actualMove) {
                    try {
                        this.nc.publish(`games.ai.${gameId.toString()}.match.input`, encodeMatchInput({ paddleId: 1, move: desiredMove }));
                    } catch {
                        continue;
                    }
                }
            }
        })().catch(() => { });

        const subEndGame = this.nc.subscribe(`games.ai.*.match.end`);
        (async () => {
            for await (const msg of subEndGame) {
                const [, , gameId] = msg.subject.split('.');
                this.games.delete(gameId);
            }
        })().catch(() => { });
    }

    
    async stop() {
        try { await this.subCreate?.drain(); } catch { }
        try { await this.subState?.drain(); } catch { }
        try { await this.subEnd?.drain(); } catch { }
        try { await this.nc?.drain(); } catch { }
    }
    
    async 

    stateToNode(state) {
        const b = state.balls[0];
        const ballState = {
            ballPos: [b.x, b.y],
            ballVel: [b.vx, b.vy]
        };
        const aiPaddle = state.paddles[1].offset;
        const playerPaddle = state.paddles[0].offset;
        const futureBallState = predictBallState(ballState.ballPos, ballState.ballVel);
        return new GameStateNode(
            ballState,
            aiPaddle,
            playerPaddle,
            futureBallState
        );
    }

};