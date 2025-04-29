// services/lobby-manager/test/wsMultiClient.test.js
import { buildApp } from '../src/app.js'
import WebSocket, { Server as WebSocketServer } from 'ws'
import { attach as attachWs } from '../src/ws/wsServer.js'
import natsClient from '../src/natsClient.js'
import lobbyStore from '../src/store/lobbyStore.js'

// mock NATS so no real broker is needed
jest.mock('../src/natsClient.js')
jest.setTimeout(15000)

let app, port, wss

beforeAll(async () => {
	// 1) Start Fastify on a random port
	app = await buildApp()
	await app.listen({ port: 0, host: '0.0.0.0' })
	port = app.server.address().port

	// 2) Wire up WS on /lobbies
	wss = new WebSocketServer({ server: app.server, path: '/lobbies' })
	attachWs(wss, natsClient)
})

afterAll(async () => {
	// Terminate any open clients
	wss.clients.forEach(ws => ws.terminate())
	// Close WS server
	await new Promise(r => wss.close(r))
	// Close Fastify (runs onClose hooks)
	await app.close()
	// Clear lobby cleanup interval
	lobbyStore.shutdown()
})

test('Both clients see start when all ready', async () => {
	// A) Create a lobby via HTTP
	const { lobbyId } = (
		await app.inject({
			method: 'POST',
			url: '/lobby/create',
			payload: { mode: 'pong', map: 'x', submode: 'online' }
		})
	).json()

	// B) Spin up two WS clients
	const wsA = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=A`)
	const wsB = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=B`)

	// Wait for both to connect
	await Promise.all([
		new Promise(r => wsA.once('open', r)),
		new Promise(r => wsB.once('open', r))
	])

	// Have them join
	wsA.send(JSON.stringify({ type: 'join', lobbyId, userId: 'A' }))
	wsB.send(JSON.stringify({ type: 'join', lobbyId, userId: 'B' }))

	// Wait for both to receive a 'start' message
	await new Promise((resolve, reject) => {
		let aReady = false, bReady = false
		const finish = () => {
			if (aReady && bReady) {
				wsA.close()
				wsB.close()
				resolve()
			}
		}
		const onMsgA = data => {
			const m = JSON.parse(data)
			if (m.type === 'start') {
				aReady = true
				finish()
			}
		}
		const onMsgB = data => {
			const m = JSON.parse(data)
			if (m.type === 'start') {
				bReady = true
				finish()
			}
		}
		wsA.on('message', onMsgA)
		wsB.on('message', onMsgB)

		// Now signal ready
		wsA.send(JSON.stringify({ type: 'ready', lobbyId, userId: 'A' }))
		wsB.send(JSON.stringify({ type: 'ready', lobbyId, userId: 'B' }))

		// Timeout guard
		setTimeout(() => {
			reject(new Error('Timed out waiting for both clients to see start'))
		}, 10000)
	})
})

