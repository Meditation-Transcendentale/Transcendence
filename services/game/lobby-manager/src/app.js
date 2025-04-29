// services/lobby-manager/src/app.js

import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'

import config from './config.js'
import natsClient from './natsClient.js'
import lobbyRoutes from './routes/lobbyRoutes.js'
import lobbyStore from './store/lobbyStore.js'
import * as lobbyService from './services/lobbyService.js'

export async function buildApp() {
	const app = Fastify({ logger: false })

	app.decorate('lobbyStore', lobbyStore)
	app.decorate('lobbyService', lobbyService)

	app.addHook('onClose', async () => {
		lobbyStore.shutdown()
		await natsClient.close()
	})
	await app.register(fastifyCors, { origin: '*', credentials: true })

	await natsClient.connect(config.NATS_URL)

	app.register(lobbyRoutes, { prefix: '/lobby' })

	await app.ready()
	return app
}

