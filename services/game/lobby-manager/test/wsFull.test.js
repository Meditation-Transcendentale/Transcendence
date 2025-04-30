// services/lobby-manager/test/wsFull.test.js

import { buildApp } from '../src/app.js'
import WebSocket from 'ws'
import { attach as attachWs } from '../src/ws/wsServer.js'
import natsClient from '../src/natsClient.js'
import lobbyStore from '../src/store/lobbyStore.js'

// mock NATS so no real broker needed
jest.mock('../src/natsClient.js')

// give a bit more time for WS handshake
jest.setTimeout(10000)

let app, port, wss

beforeAll(async () => {
	// 1) Build & start Fastify
	app = await buildApp()
	await app.listen({ port: 0, host: '0.0.0.0' })
	port = app.server.address().port

	// 2) Attach WS server on /lobbies
	wss = new WebSocket.Server({ server: app.server, path: '/lobbies' })
	attachWs(wss, natsClient)
})

afterAll(async () => {
	// 1) Force-close any remaining client sockets
	wss.clients.forEach(ws => ws.terminate())

	// 2) Close the WS server
	await new Promise(resolve => wss.close(resolve))

	// 3) Shut down Fastify (triggers onClose → clears NATS + store interval)
	await app.close()

	// 4) Extra safety: clear lobby cleanup timer
	lobbyStore.shutdown()
})

test('3rd client gets error when lobby is full', done => {
	; (async () => {
		// Create a 2-player lobby
		const { lobbyId } = (await app.inject({
			method: 'POST',
			url: '/lobby/create',
			payload: { mode: 'pong', map: 'x', submode: 'online' }
		})).json()

		// Spin up two clients to fill it
		const ws1 = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=u1`)
		const ws2 = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=u2`)

		// Wait for both to connect and join
		await Promise.all([
			new Promise(r => ws1.on('open', r)),
			new Promise(r => ws2.on('open', r))
		])
		ws1.send(JSON.stringify({ type: 'join', lobbyId, userId: 'u1' }))
		ws2.send(JSON.stringify({ type: 'join', lobbyId, userId: 'u2' }))

		// Third client should get an error
		const ws3 = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=u3`)
		ws3.on('open', () => {
			ws3.send(JSON.stringify({ type: 'join', lobbyId, userId: 'u3' }))
		})
		ws3.on('message', data => {
			const msg = JSON.parse(data)
			expect(msg).toMatchObject({
				type: 'error',
				message: expect.stringMatching(/full/)
			})
			// Clean up this client too
			ws1.terminate()
			ws2.terminate()
			ws3.terminate()
			done()
		})
	})().catch(err => done(err))
})

