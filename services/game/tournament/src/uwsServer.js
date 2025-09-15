import uWS from 'uWebSockets.js';
import { readFileSync } from 'fs';
import { encodeServerMessage } from './proto/helper.js';

export const tournamentSockets = new Map();

export function createUwsApp(path, tournamentService) {
    const key = readFileSync(process.env.SSL_KEY || './ssl/key.pem', 'utf8');
    const cert = readFileSync(process.env.SSL_CERT || './ssl/cert.pem', 'utf8');
    const app = uWS.SSLApp({
        key_file_name: process.env.SSL_KEY,
        cert_file_name: process.env.SSL_CERT
    });

    app.ws(path, {
        idleTimeout: 60,

        upgrade: (res, req, context) => {
            const fullQuery = req.getQuery();
            const params = new URLSearchParams(fullQuery);
            const session = {
                userId: params.get('uuid'),
                tournamentId: params.get('tournamentId')
            };
            res.upgrade(
                session,
                req.getHeader('sec-websocket-key'),
                req.getHeader('sec-websocket-protocol'),
                req.getHeader('sec-websocket-extensions'),
                context
            );
        },

        open: (ws) => {
            ws.isAlive = true;
            const { tournamentId } = ws;
            tournamentSockets.set(tournamentId, tournamentSockets.get(tournamentId) || new Set());
            tournamentSockets.get(tournamentId).add(ws);

            try {
                const state = tournamentService.join(tournamentId, ws.userId);
                const buf = encodeServerMessage({ update: { tournamentId: state.id, players: state.players, tournamentRoot: state.root } });
                ws.subscribe(tournamentId);
                app.publish(tournamentId, buf, true);
            } catch (err) {
                const buf = encodeServerMessage({ error: { message: err.message } });
                ws.send(buf, true);
            }
        },

        message: async (ws, message, isBinary) => {
            const buf = new Uint8Array(message);
            const payload = decodeClientMessage(buf);

            if (payload.quit) lobbyService.quit(payload.quit.tournamentId, payload.quit.uuid);
            if (payload.ready) await tournamentService.ready(ws, ws.tournamentId, ws.userId);
        },

        close: (ws) => {

        }
    })

    return app;
}