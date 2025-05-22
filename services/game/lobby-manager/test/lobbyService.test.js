// tests/lobbyService.test.js
import LobbyService from '../src/lobbyService.js';

describe('LobbyService', () => {
	let svc, mockNats;

	beforeEach(() => {
		mockNats = { request: jest.fn() };
		svc = new LobbyService(mockNats);
	});

	afterEach(() => {
		jest.clearAllMocks();
		svc.shutdown();
	});

	test('create → join → quit flow', () => {
		const state1 = svc.create({ mode: 'pong', map: 'arena' });
		expect(state1.lobbyId).toBeDefined();
		expect(state1.players).toEqual([]);
		expect(state1.status).toBe('waiting');

		const state2 = svc.join(state1.lobbyId, 'user-1');
		expect(state2.players).toEqual(['user-1']);

		const state3 = svc.quit(state1.lobbyId, 'user-1');
		expect(state3.players).toEqual([]);
	});

});

