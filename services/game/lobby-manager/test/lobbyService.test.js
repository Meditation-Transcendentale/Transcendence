// services/lobby-manager/test/lobbyService.test.js
import * as svc from '../src/services/lobbyService.js'
import lobbyStore from '../src/store/lobbyStore.js'
import natsClient from '../src/natsClient.js'

// Mock NATS so we can see publishes
jest.mock('../src/natsClient.js')

describe('lobbyService', () => {
	beforeEach(() => {
		// reset the in-memory store
		lobbyStore.lobbies.clear()
		natsClient.publish.mockClear()
	})

	test('createLobby sets correct maxPlayers per mode/submode', () => {
		const l1 = svc.createLobby({ mode: 'pong', map: 'x', submode: 'online' })
		expect(l1.maxPlayers).toBe(2)

		const l2 = svc.createLobby({ mode: 'pong', map: 'x', submode: 'ia' })
		expect(l2.maxPlayers).toBe(1)

		const l3 = svc.createLobby({ mode: 'pongIO', map: 'x', submode: 'whatever' })
		expect(l3.maxPlayers).toBe(20)  // default for pongIO

		const l4 = svc.createLobby({ mode: 'pongBR', map: 'x', submode: 'whatever' })
		expect(l4.maxPlayers).toBe(100)  // default for pongIO
	})

	test('join throws if lobby not found', () => {
		expect(() => svc.join('nope', 'u1')).toThrow(/Lobby not found/)
	})

	test('join increments currentCount and enforces capacity', () => {
		const { lobbyId } = svc.createLobby({ mode: 'pong', map: 'x', submode: 'online' })
		// capacity is 2
		let state = svc.join(lobbyId, 'u1')
		expect(state.currentCount).toBe(1)
		state = svc.join(lobbyId, 'u2')
		expect(state.currentCount).toBe(2)
		expect(() => svc.join(lobbyId, 'u3')).toThrow(/full/)
	})

	test('ready marks players ready and emits game.create when all ready', () => {
		const { lobbyId } = svc.createLobby({ mode: 'pong', map: 'x', submode: 'online' })
		svc.join(lobbyId, 'u1')
		svc.join(lobbyId, 'u2')
		// only one ready → no publish
		let state = svc.ready(lobbyId, 'u1')
		expect(state.ready).toEqual(['u1'])
		expect(natsClient.publish).not.toHaveBeenCalled()
		// second ready → game.create
		state = svc.ready(lobbyId, 'u2')
		expect(state.ready.sort()).toEqual(['u1', 'u2'])
		expect(natsClient.publish).toHaveBeenCalledWith(
			'game.create',
			expect.objectContaining({ lobbyId, players: state.players })
		)
	})

	test('leave frees up a slot', () => {
		const { lobbyId } = svc.createLobby({ mode: 'pong', map: 'x', submode: 'online' })
		svc.join(lobbyId, 'u1')
		svc.join(lobbyId, 'u2')
		svc.leave(lobbyId, 'u1')
		const state = svc.getState(lobbyId)
		expect(state.currentCount).toBe(1)
		expect(state.slotsRemaining).toBe(1)
	})

	test('heartbeat does not throw for missing lobby', () => {
		expect(() => svc.heartbeat('nope', 'u1')).not.toThrow()
	})
	test('createLobby with unknown mode falls back to default', () => {
		const state = svc.createLobby({ mode: 'nope', map: 'x', submode: 'y' })
		expect(state.maxPlayers).toBeDefined()
	})

	test('joinLobby throws on missing', () => {
		expect(() => svc.join('no-id', 'u1')).toThrow(/not found/)
	})

	test('ready() throws when no lobby', () => {
		expect(() => svc.ready('no-id', 'u1')).toThrow(/not found/)
	})

	test('getState returns null for missing lobby', () => {
		expect(svc.getState('no-id')).toBeNull()
	})

	test('heartbeat does not throw on missing lobby', () => {
		expect(() => svc.heartbeat('no-id', 'u1')).not.toThrow()
	})

	test('leave on missing lobby is no-op', () => {
		expect(() => svc.leave('no-id', 'u1')).not.toThrow()
	})
})
afterAll(() => {
	// Stop the background cleanup timer so Jest can exit
	lobbyStore.shutdown()
})
