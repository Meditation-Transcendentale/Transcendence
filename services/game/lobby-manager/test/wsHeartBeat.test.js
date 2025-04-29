// services/lobby-manager/test/wsHeartbeatDisconnect.test.js
import { buildApp } from '../src/app.js'
import WebSocket, { Server as WebSocketServer } from 'ws'
import { attach as attachWs } from '../src/ws/wsServer.js'
import natsClient from '../src/natsClient.js'
import lobbyStore from '../src/store/lobbyStore.js'

jest.mock('../src/natsClient.js')
jest.setTimeout(10000)

let app, port, wss

beforeAll(async () => {
	// 1) Bring up the HTTP+WS server
	app = await buildApp()
	await app.listen({ port: 0, host: '0.0.0.0' })
	port = app.server.address().port

	// 2) Attach your wsServer
	wss = new WebSocketServer({ server: app.server, path: '/lobbies' })
	attachWs(wss, natsClient)
})

afterAll(async () => {
	// tear down everything
	wss.clients.forEach(ws => ws.terminate())
	await new Promise(r => wss.close(r))
	await app.close()
	lobbyStore.shutdown()
})

test('disconnecting a client broadcasts updated lobby state', async () => {
	// A) Create a new lobby via HTTP
	const { lobbyId } = (await app.inject({
		method: 'POST',
		url: '/lobby/create',
		payload: { mode: 'pong', map: 'x', submode: 'online' }
	})).json()

	// B) Open two WebSocket clients
	const ws1 = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=u1`)
	const ws2 = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=u2`)

	// Wait for both to connect
	await Promise.all([
		new Promise(r => ws1.once('open', r)),
		new Promise(r => ws2.once('open', r)),
	])

	// C) Have both join
	ws1.send(JSON.stringify({ type: 'join', lobbyId, userId: 'u1' }))
	ws2.send(JSON.stringify({ type: 'join', lobbyId, userId: 'u2' }))

	// D) Listen for the sequence of lobby.update messages on ws2
	await new Promise((resolve, reject) => {
		let step = 0

		ws2.on('message', data => {
			const m = JSON.parse(data)
			if (m.type !== 'lobby.update') return

			step += 1
			if (step === 1) {
				// first update: only u1 is in players
				expect(m.players).toEqual(['u1'])
				// now trigger client1 to disconnect
				ws1.close()
			}
			else if (step === 2) {
				// second update: after ws2.join, both u1 & u2
				expect(m.players.sort()).toEqual(expect.arrayContaining(['u1', 'u2']))
			}
			else if (step === 3) {
				// third update: after ws1 close, only u2 remains
				expect(m.players).toEqual(['u2'])
				ws2.close()
				resolve()
			}
		})

		// Safety timeout
		setTimeout(() => reject(new Error('Timed out waiting for lobby updates')), 5000)
	})
})

