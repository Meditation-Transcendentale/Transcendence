import * as Proto from './message.js';

/**
 * PhysicsRequest ↔ PhysicsResponse
 */
export function encodePhysicsRequest(payload) {
	const err = Proto.shared.PhysicsRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.PhysicsRequest
		.encode(Proto.shared.PhysicsRequest.create(payload))
		.finish();
}

export function decodePhysicsRequest(buffer) {
	return Proto.shared.PhysicsRequest.decode(buffer);
}

export function encodePhysicsResponse(payload) {
	const err = Proto.shared.PhysicsResponse.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.PhysicsResponse
		.encode(Proto.shared.PhysicsResponse.create(payload))
		.finish();
}

export function decodePhysicsResponse(buffer) {
	return Proto.shared.PhysicsResponse.decode(buffer);
}

/**
 * MatchStateResponse (if used for returning full state snapshots)
 */
export function decodeMatchStateResponse(buffer) {
	return Proto.physics.MatchStateResponse.decode(buffer);
}

