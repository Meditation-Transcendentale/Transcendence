// services/lobby-manager/test/lobby.test.js

import { buildApp } from '../src/app.js'
import lobbyStore from '../src/store/lobbyStore.js'

let app

beforeAll(async () => {
	// Clear any existing lobbies
	lobbyStore.lobbies.clear()
	app = await buildApp()
})
afterAll(async () => {
	await app.close()
})

describe('Lobby HTTP API', () => {
	it('GET  /lobby/list   → 200 and empty array initially', async () => {
		const res = await app.inject({ method: 'GET', url: '/lobby/list' })
		expect(res.statusCode).toBe(200)
		expect(res.json()).toEqual([])
	})

	it('POST /lobby/create → 201 and returns lobby state', async () => {
		const payload = { mode: 'pong', map: 'classic', submode: 'online' }
		const res = await app.inject({
			method: 'POST',
			url: '/lobby/create',
			payload
		})
		expect(res.statusCode).toBe(201)
		const body = res.json()
		expect(body).toMatchObject({
			lobbyId: expect.any(String),
			mode: 'pong',
			map: 'classic',
			submode: 'online',
			maxPlayers: expect.any(Number),
			currentCount: 0,
			slotsRemaining: expect.any(Number),
			players: [],
			ready: [],
			status: 'waiting'
		})
		// store lobbyId for next test
		app.lobbyId = body.lobbyId
	})

	it('GET  /lobby/:id   → 200 and returns the same lobby', async () => {
		const { lobbyId } = app
		const res = await app.inject({ method: 'GET', url: `/lobby/${lobbyId}` })
		expect(res.statusCode).toBe(200)
		const body = res.json()
		expect(body.lobbyId).toBe(lobbyId)
		expect(body.players).toEqual([])
	})

	it('GET  /lobby/not-found → 404 when missing', async () => {
		const res = await app.inject({ method: 'GET', url: '/lobby/not-found' })
		expect(res.statusCode).toBe(404)
		expect(res.json()).toEqual({ error: 'Not found' })
	})
})

