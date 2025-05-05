// src/routes/lobbyRoutes.js

export default async function lobbyRoutes(fastify, opts) {
	// List lobbies
	fastify.get('/list', async (request, reply) => {
		const all = Array.from(fastify.lobbyStore.lobbies.values()).map(l => l.getState())
		return all
	})

	// Create lobby
	fastify.post('/create', async (request, reply) => {
		const state = fastify.lobbyService.createLobby(request.body)
		reply.code(201).send(state)
	})

	// test route
	fastify.post('/test', async (request, reply) => {
		const state = fastify.lobbyService.createLobby(request.body)
		reply.code(201).send(state)
	})

	// Get lobby by ID
	fastify.get('/:id', async (request, reply) => {
		const lobby = fastify.lobbyStore.getLobby(request.params.id)
		if (!lobby) {
			return reply.code(404).send({ error: 'Not found' })
		}
		return lobby.getState()
	})
}

