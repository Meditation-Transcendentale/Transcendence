// services/lobby-manager/test/wsCleanupInterval.test.js
import { buildApp } from '../src/app.js'
import { Server as WebSocketServer } from 'ws'
import { attach as attachWs } from '../src/ws/wsServer.js'
import natsClient from '../src/natsClient.js'
import lobbyStore from '../src/store/lobbyStore.js'

jest.mock('../src/natsClient.js')

test('closing WebSocket server clears the heartbeat interval', async () => {
	// Spy on clearInterval
	const clearSpy = jest.spyOn(global, 'clearInterval')

	const app = await buildApp()
	await app.listen({ port: 0, host: '0.0.0.0' })

	const wss = new WebSocketServer({ server: app.server, path: '/lobbies' })
	attachWs(wss, natsClient)

	// Directly emit the 'close' event to trigger the cleanup handler
	wss.emit('close')

	expect(clearSpy).toHaveBeenCalled()

	clearSpy.mockRestore()
	await app.close()
	lobbyStore.shutdown()
})

