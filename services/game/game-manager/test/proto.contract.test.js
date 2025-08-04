import * as Proto from '../proto/message.js';

describe('🧪 Protobuf Contracts for game-manager', () => {

	it('should encode and decode MatchCreateRequest correctly', () => {
		const input = { players: ['uuid1', 'uuid2'] };
		const err = Proto.MatchCreateRequest.verify(input);
		expect(err).toBeNull();

		const encoded = Proto.MatchCreateRequest.encode(Proto.MatchCreateRequest.create(input)).finish();
		const decoded = Proto.MatchCreateRequest.decode(encoded);

		expect(decoded).toMatchObject(input);
	});

	it('should encode and decode MatchCreateResponse correctly', () => {
		const input = { gameId: 'game-xyz' };
		const err = Proto.MatchCreateResponse.verify(input);
		expect(err).toBeNull();

		const encoded = Proto.MatchCreateResponse.encode(Proto.MatchCreateResponse.create(input)).finish();
		const decoded = Proto.MatchCreateResponse.decode(encoded);

		expect(decoded).toMatchObject(input);
	});

	it('should encode and decode MatchState correctly', () => {
		const input = {
			gameId: 'abc',
			tick: 42,
			balls: [{ id: 1, x: 0, y: 0, vx: 1, vy: 1 }],
			paddles: [{ id: 1, move: 0, dead: false }],
			score: [1, 2],
			ranks: null,
			stage: 1
		};
		const err = Proto.MatchState.verify(input);
		expect(err).toBeNull();

		const encoded = Proto.MatchState.encode(Proto.MatchState.create(input)).finish();
		const decoded = Proto.MatchState.decode(encoded);

		expect(decoded).toMatchObject(input);
	});
});

