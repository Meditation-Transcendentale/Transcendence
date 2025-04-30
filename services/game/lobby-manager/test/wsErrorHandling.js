// test/wsErrorHandling.test.js
import { buildApp } from '../src/app.js'
import WebSocket from 'ws'
import { attach as attachWs } from '../src/ws/wsServer.js'
import natsClient from '../src/natsClient.js'
import lobbyStore from '../src/store/lobbyStore.js'

jest.mock('../src/natsClient.js')
jest.setTimeout(10000)

let app, port, wss

beforeAll(async () => {
	app = await buildApp()
	await app.listen({ port: 0, host: '0.0.0.0' })
	port = app.server.address().port
	wss = new WebSocket.Server({ server: app.server, path: '/lobbies' })
	attachWs(wss, natsClient)
})

afterAll(async () => {
	wss.clients.forEach(ws => ws.terminate())
	await new Promise(r => wss.close(r))
	await app.close()
	lobbyStore.shutdown()
})

test('invalid JSON yields error frame', done => {
	const ws = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=foo&userId=u1`)
	ws.on('open', () => ws.send('not-json'))
	ws.on('message', data => {
		const msg = JSON.parse(data)
		expect(msg).toMatchObject({ type: 'error', message: 'invalid JSON' })
		ws.terminate()
		done()
	})
})

test('unknown type yields error frame', done => {
	const ws = new WebSocket(`ws://127.0.0.1:${port}/lobbies?lobbyId=foo&userId=u1`)
	ws.on('open', () => ws.send(JSON.stringify({ type: 'nope', lobbyId: 'foo', userId: 'u1' })))
	ws.on('message', data => {
		const msg = JSON.parse(data)
		expect(msg).toMatchObject({ type: 'error', message: expect.stringContaining('Unknown message type') })
		ws.terminate()
		done()
	})
})

