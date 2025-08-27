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
	const err = Proto.physics.PhysicsResponse.verify(payload);
	if (err) throw new Error(err);
	return Proto.physics.PhysicsResponse
		.encode(Proto.physics.PhysicsResponse.create(payload))
		.finish();
}

export function decodePhysicsResponse(buffer) {
	return Proto.physics.PhysicsResponse.decode(buffer);
}

/**
 * MatchStateResponse (if used for returning full state snapshots)
 */
export function decodeMatchStateResponse(buffer) {
	return Proto.physics.MatchStateResponse.decode(buffer);
}

