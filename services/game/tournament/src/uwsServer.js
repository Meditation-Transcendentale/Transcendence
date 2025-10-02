import uWS from 'uWebSockets.js';
import { encodeTournamentServerMessage, decodeTournamentServerMessage, decodeTournamentClientMessage } from './proto/helper.js';

export const tournamentSockets = new Map();

export function createUwsApp(path, tournamentService) {
    const app = uWS.SSLApp({
        key_file_name: process.env.SSL_KEY || './ssl/key.pem',
        cert_file_name: process.env.SSL_CERT || './ssl/cert.pem'
    });

    app.ws(path, {
        idleTimeout: 120,

        upgrade: (res, req, context) => {
            try {
                const tournamentId = req.getQuery('tournamentId');
                const userId = req.getQuery('uuid');
                res.upgrade(
                    { tournamentId, userId },
                    req.getHeader('sec-websocket-key'),
                    req.getHeader('sec-websocket-protocol'),
                    req.getHeader('sec-websocket-extensions'),
                    context
                );
            } catch {
                res.writeStatus('500 Internal Server Error').end();
            }
        },

        open: (ws) => {
            try {
                let set = tournamentSockets.get(ws.tournamentId);
                if (!set) {
                    set = new Set();
                    tournamentSockets.set(ws.tournamentId, set);
                }
                set.add(ws);
                ws.subscribe(ws.tournamentId);
                ws.subscribe(`user.${ws.userId}`);
                console.log (`${ws.tournamentId}|${ws.userId}`);
                tournamentService.join(ws.tournamentId, ws.userId);
            } catch (err) {
                console.error(err);
                const buf = encodeTournamentServerMessage({ error: { message: err.message }});
                ws.send(buf, true);
            }
        },

        message: async (ws, message, isBinary) => {
            try {
                const payload = decodeTournamentClientMessage(new Uint8Array(message));

                if (payload.ready) {
                    console.log(`${ws.uuid} sent ready`);
                    await tournamentService.ready(ws, ws.tournamentId, ws.userId);
                    return;
                }

                if (payload.quit) {
                    console.log("QUIT RECEIVED");
                    tournamentService.quit(ws.tournamentId, ws.userId);
                    return;
                }
            } catch (err) {
                const buf = encodeTournamentServerMessage({ error: { message: err.message } });
                ws.send(buf, true);
            }
        },

        close: (ws) => {
            const set = tournamentSockets.get(ws.tournamentId);
            if (set) set.delete(ws);
        }
    });

    return app;
}
