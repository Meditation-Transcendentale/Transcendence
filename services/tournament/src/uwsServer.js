import uWS from 'uWebSockets.js';

const sockets = new Map();

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
            sockets.set(tournamentId, sockets.get(tournamentId) || new Set());
            sockets.get(tournamentId).add(ws);

            try {
                /**
                 * Join 
                 */
                // const state = tournamentService.join(tournamentId, ws.userId);
                // const buf = encode

            } catch (err) {

            }
        },

        message: async (ws, message, isBinary) => {
            const buf = new Uint8Array(message);
            const payload = decodeClientMessage(buf);
            if (payload.ready) {
                tournamentService
            }
        }
    })
}