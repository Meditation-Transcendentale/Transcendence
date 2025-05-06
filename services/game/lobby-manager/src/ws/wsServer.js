// services/lobby-manager/src/ws/wsServer.js

import * as lobbyService from '../services/lobbyService.js'

const lobbySockets = new Map()  // lobbyId → Set<ws>

export function attach(wss, natsClient) {
	const interval = setInterval(() => {
		wss.clients.forEach(ws => {
			if (!ws.isAlive) return ws.terminate()
			ws.isAlive = false
			ws.ping()
		})
	}, 30_000)

	wss.on('connection', (ws, req) => {
		const params = new URL(req.url, `http://${req.headers.host}`).searchParams
		ws.lobbyId = params.get('lobbyId')
		ws.userId = params.get('userId')
		ws.isAlive = true

		// Join lobby group
		if (!lobbySockets.has(ws.lobbyId)) lobbySockets.set(ws.lobbyId, new Set())
		lobbySockets.get(ws.lobbyId).add(ws)

		ws.on('pong', () => { ws.isAlive = true })

		ws.on('message', async data => {
			let msg
			try { msg = JSON.parse(data) }
			catch { return ws.send(JSON.stringify({ type: 'error', message: 'invalid JSON' })) }

			try {
				let state
				switch (msg.type) {
					case 'join':
						state = lobbyService.join(msg.lobbyId, msg.userId)
						broadcast(ws.lobbyId, { type: 'lobby.update', ...state })
						break

					case 'ready':
						state = lobbyService.ready(msg.lobbyId, msg.userId)
						broadcast(ws.lobbyId, { type: 'lobby.update', ...state })
						if (state.status === 'starting') {
							broadcast(ws.lobbyId, {
								type: 'start',
								gameId: state.gameId,
								settings: {}
							});
						}
						break

					case 'heartbeat':
						lobbyService.heartbeat(msg.lobbyId, msg.userId)
						break

					default:
						throw new Error(`Unknown message type: ${msg.type}`)
				}
			} catch (err) {
				ws.send(JSON.stringify({ type: 'error', message: err.message }))
			}
		})

		ws.on('close', () => {
			lobbySockets.get(ws.lobbyId)?.delete(ws)
			lobbyService.leave(ws.lobbyId, ws.userId)
			const newState = lobbyService.getState(ws.lobbyId)
			broadcast(ws.lobbyId, { type: 'lobby.update', ...newState })
		})
	})

	wss.on('close', () => clearInterval(interval))
}

function broadcast(lobbyId, msg) {
	const clients = lobbySockets.get(lobbyId) || []
	const data = JSON.stringify(msg)
	for (const client of clients) {
		if (client.readyState === client.OPEN) client.send(data)
	}
}

