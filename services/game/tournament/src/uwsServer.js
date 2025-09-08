import uWS from 'uWebSockets.js';

export const tournamentSockets = new Map();

export function createUwsApp(path, tournamentService) {
    const app = uWS.App();

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

			if (payload.quit) {
				const updatedState = lobbyService.quit(payload.quit.tournamentId, payload.quit.uuid);
                app.publish(ws.tournamentId, updatedState)
            }
            if (payload.ready) {
                newState = await tournamentService.ready(ws.tournamentId, ws.userId);

                if (newState.gameId)
            }
        },

        close: (ws) => {

        }
    })

    return app;
}