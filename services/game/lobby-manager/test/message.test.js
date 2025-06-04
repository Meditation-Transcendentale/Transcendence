// tests/message.test.js
import * as Proto from '../proto/message.js';

describe('🧪 Protobuf Contracts for lobby-manager', () => {

	it('should encode and decode UserStatus correctly', () => {
		const input = { uuid: 'user-1', lobbyId: 'lobby-a', status: 'joined' };
		const err = Proto.shared.UserStatus.verify(input);
		expect(err).toBeNull();

		const encoded = Proto.shared.UserStatus.encode(Proto.shared.UserStatus.create(input)).finish();
		const decoded = Proto.shared.UserStatus.decode(encoded);

		expect(decoded).toMatchObject(input);
	});

	it('should encode and decode StartMessage correctly', () => {
		const input = { lobbyId: 'lobby-a', gameId: 'game-x', map: 'arena' };
		const err = Proto.shared.StartMessage.verify(input);
		expect(err).toBeNull();

		const encoded = Proto.shared.StartMessage.encode(Proto.shared.StartMessage.create(input)).finish();
		const decoded = Proto.shared.StartMessage.decode(encoded);

		expect(decoded).toMatchObject(input);
	});
});

