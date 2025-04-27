import fp from 'fastify-plugin'
import lobbyStore from '../store/lobbyStore.js'
import * as lobbyService from '../services/lobbyService.js'

export default fp(async (fastify) => {
	// List lobbies
	fastify.get('/list', async (req, reply) => {
		const all = Array.from(lobbyStore.lobbies.values()).map(l => l.getState())
		reply.send(all)
	})

	// Create lobby
	fastify.post('/create', async (req, reply) => {
		const state = lobbyService.createLobby(req.body)
		reply.code(201).send(state)
	})

	// Get lobby info
	fastify.get('/:id', async (req, reply) => {
		const lobby = lobbyStore.getLobby(req.params.id)
		if (!lobby) return reply.code(404).send({ error: 'Not found' })
		return lobby.getState()
	})
})

