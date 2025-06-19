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
                ws.subscribe(tournamentId);
            } catch (err) {

            }
        },

        message: async (ws, message, isBinary) => {
            const buf = new Uint8Array(message);
            const payload = decodeClientMessage(buf);
            if (payload.ready) {
                newState = await tournamentService.ready(ws.tournamentId, ws.userId);
            }
        }
    })  

    return app;
}