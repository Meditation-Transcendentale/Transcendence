// services/lobby-manager/test/ws.test.js
import { buildApp } from '../src/app.js'
import WebSocket from 'ws'
import natsClient from '../src/natsClient.js'
import * as wsServer from '../src/ws/wsServer.js'
import lobbyStore from '../src/store/lobbyStore.js'

// Mock NATS
jest.mock('../src/natsClient.js')

jest.setTimeout(10000)
let app, port, wss
beforeAll(async () => {
	app = await buildApp()
	await app.listen({ port: 0, host: '0.0.0.0' })
	port = app.server.address().port

	wss = new WebSocket.Server({ server: app.server, path: '/lobbies' })
	wsServer.attach(wss, natsClient)
})

afterAll(async () => {
	wss.close();
	await app.close()
	lobbyStore.shutdown()
})

test('WS join + ready flow triggers start', done => {
	(async () => {
		const { lobbyId } = (await app.inject({
			method: 'POST',
			url: '/lobby/create',
			payload: { mode: 'pong', map: 'classic', submode: 'online' }
		})).json()

		const ws = new WebSocket(
			`ws://127.0.0.1:${port}/lobbies?lobbyId=${lobbyId}&userId=u1`
		)

		ws.onopen = () => {
			ws.send(JSON.stringify({ type: 'join', lobbyId, userId: 'u1' }))
			ws.send(JSON.stringify({ type: 'ready', lobbyId, userId: 'u1' }))
		}

		let sawUpdate = false
		ws.onmessage = ev => {
			const msg = JSON.parse(ev.data)
			if (msg.type === 'lobby.update') sawUpdate = true
			if (msg.type === 'start') {
				expect(sawUpdate).toBe(true)
				ws.close()
				done()
			}
		}
	})().catch(done)
})

