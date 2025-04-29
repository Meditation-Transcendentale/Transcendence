// services/lobby-manager/test/lobbyStoreExtra.test.js
import lobbyStore from '../src/store/lobbyStore.js'
import config from '../src/config.js'

jest.useFakeTimers()

afterAll(() => {
	lobbyStore.shutdown()
})

test('create, get, delete lobby work as expected', () => {
	// createLobby returns the Lobby instance
	const lobby = lobbyStore.createLobby({
		mode: 'pong',
		map: 'x',
		submode: 'online',
		maxPlayers: 2
	})
	expect(typeof lobby.id).toBe('string')

	// getLobby returns that same instance
	const fetched = lobbyStore.getLobby(lobby.id)
	expect(fetched).toBe(lobby)

	// deleteLobby removes it
	lobbyStore.deleteLobby(lobby.id)
	expect(lobbyStore.getLobby(lobby.id)).toBeUndefined()
})

test('cleanup stale lobbies removes those past threshold', () => {
	// create and add a player so players map is non-empty
	const lobby = lobbyStore.createLobby({
		mode: 'pong',
		map: 'x',
		submode: 'online',
		maxPlayers: 2
	})
	lobby.addPlayer('u1')

	// backdate u1.lastSeen
	const staleTime = Date.now() - config.HEARTBEAT_INTERVAL * 2
	lobby.players.get('u1').lastSeen = staleTime

	// advance timers and run cleanup
	jest.advanceTimersByTime(config.HEARTBEAT_INTERVAL + 1000)
	lobbyStore.cleanup()

	expect(lobbyStore.getLobby(lobby.id)).toBeUndefined()
})

