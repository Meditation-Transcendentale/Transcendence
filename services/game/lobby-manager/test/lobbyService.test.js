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

	//test('ready() requests a game when allReady', async () => {
	//  // Arrange
	//  // make natsClient request resolve with a fake gameId
	//  mockNats.request.mockResolvedValue(
	//    /* a raw protobuf buffer matching MatchCreateResponse { gameId: 'g-123' } */
	//    Buffer.from([/* … */]) 
	//  );
	//
	//  const lobbyId = svc.create({ mode: 'pong', map: 'arena' });
	//  svc.join(lobbyId, 'u1');
	//
	//  // Act
	//  const out = await svc.ready(lobbyId, 'u1');
	//
	//  // Assert
	//  expect(mockNats.request).toHaveBeenCalledWith(
	//    `games.pong.match.create`,
	//    expect.any(Uint8Array),
	//    { timeout: 5000 }
	//  );
	//  expect(out.gameId).toBe('g-123');
	//  expect(out.status).toBe('starting');
	//});
});

