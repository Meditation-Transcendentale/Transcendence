// services/lobby-manager/src/index.js

import { buildApp } from './app.js'
import { WebSocketServer } from 'ws'
import config from './config.js'
import wsServer from './ws/wsServer.js'
import natsClient from './natsClient.js'

async function start() {
	const app = await buildApp()

	const server = app.server

	const wss = new WebSocketServer({ server, path: '/lobbies' })
	wsServer.attach(wss, natsClient)

	await app.listen({ port: config.PORT, host: '0.0.0.0' })
	app.log.info(`Lobby Manager listening on port ${config.PORT}`)
}

start().catch(err => {
	console.error('Failed to start Lobby Manager:', err)
	process.exit(1)
})

