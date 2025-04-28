// services/lobby-manager/test/LobbyModel.test.js
import Lobby from '../src/models/Lobby.js'
jest.useFakeTimers()
describe('Lobby model', () => {
	const base = { id: 'L0', mode: 'pong', map: 'm', submode: 'online', maxPlayers: 2 }

	let lobby
	beforeEach(() => {
		lobby = new Lobby(base)
	})

	test('getState includes slotsRemaining and correct fields', () => {
		lobby.addPlayer('a')
		const s = lobby.getState()
		expect(s).toMatchObject({
			lobbyId: 'L0',
			mode: 'pong',
			map: 'm',
			submode: 'online',
			maxPlayers: 2,
			currentCount: 1,
			slotsRemaining: 1,
			players: ['a'],
			ready: [],
			status: 'waiting'
		})
	})

	test('allReady flips status to starting when everyone is ready', () => {
		lobby.addPlayer('a')
		lobby.addPlayer('b')
		lobby.markReady('a')
		lobby.markReady('b')
		const s = lobby.getState()
		expect(s.status).toBe('starting')
	})

	test('cannot add beyond maxPlayers', () => {
		lobby.addPlayer('a')
		lobby.addPlayer('b')
		expect(() => lobby.addPlayer('c')).toThrow(/Lobby is full/)
	})
})

describe('Lobby model edge cases', () => {
	const base = { id: 'L0', mode: 'pong', map: 'm', submode: 'online', maxPlayers: 2 }
	let l

	beforeEach(() => { l = new Lobby(base) })

	test('removePlayer on non-existent user is no-op', () => {
		expect(() => l.removePlayer('foo')).not.toThrow()
	})

	test('heartbeat updates lastSeen', () => {
		l.addPlayer('u1')
		const before = l.players.get('u1').lastSeen
		jest.advanceTimersByTime(10)
		l.heartbeat('u1')
		expect(l.players.get('u1').lastSeen).toBeGreaterThan(before)
	})

	test('duplicate addPlayer does nothing', () => {
		l.addPlayer('u1')
		l.addPlayer('u1')
		expect(l.getState().currentCount).toBe(1)
	})
})

