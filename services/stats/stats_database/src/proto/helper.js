import * as Proto from "./message.js";

/**
 * MatchCreateRequest ↔ MatchCreateResponse
 */
export function encodeMatchCreateRequest(payload) {
  const err = Proto.shared.MatchCreateRequest.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.MatchCreateRequest.encode(
    Proto.shared.MatchCreateRequest.create(payload)
  ).finish();
}

export function decodeMatchCreateRequest(buffer) {
  return Proto.shared.MatchCreateRequest.decode(buffer);
}

export function encodeMatchCreateResponse(payload) {
  const err = Proto.shared.MatchCreateResponse.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.MatchCreateResponse.encode(
    Proto.shared.MatchCreateResponse.create(payload)
  ).finish();
}

export function decodeMatchCreateResponse(buffer) {
  return Proto.shared.MatchCreateResponse.decode(buffer);
}

export function decodeMatchQuit(buffer) {
  return Proto.shared.MatchQuit.decode(buffer);
}

/**
 * MatchInput
 */
export function decodeMatchInput(buffer) {
  return Proto.shared.MatchInput.decode(buffer);
}

/**
 * PhysicsRequest ↔ PhysicsResponse
 */
export function encodePhysicsRequest(payload) {
  const err = Proto.shared.PhysicsRequest.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.PhysicsRequest.encode(
    Proto.shared.PhysicsRequest.create(payload)
  ).finish();
}

export function decodePhysicsResponse(buffer) {
  return Proto.physics.PhysicsResponse.decode(buffer);
}

/**
 * MatchState (for sending state updates)
 */
export function encodeStateUpdate(payload) {
  const err = Proto.shared.MatchState.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.MatchState.encode(
    Proto.shared.MatchState.create(payload)
  ).finish();
}

export function decodeStateUpdate(buffer) {
  return Proto.shared.MatchState.decode(buffer);
}

/**
 * MatchSetup (NATS lifecycle)
 */
export function encodeMatchSetup(payload) {
  const err = Proto.shared.MatchSetup.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.MatchSetup.encode(
    Proto.shared.MatchSetup.create(payload)
  ).finish();
}

export function decodeMatchSetup(buffer) {
  return Proto.shared.MatchSetup.decode(buffer);
}

/**
 * MatchEnd (NATS lifecycle)
 */
export function encodeMatchEnd(payload) {
  const err = Proto.shared.MatchEnd.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.MatchEnd.encode(
    Proto.shared.MatchEnd.create(payload)
  ).finish();
}

export function decodeMatchEnd(buffer) {
  return Proto.shared.MatchEnd.decode(buffer);
}

export function encodeMatchScoreUpdate(payload) {
  const err = Proto.shared.MatchScoreUpdate.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.MatchScoreUpdate.encode(
    Proto.shared.MatchScoreUpdate.create(payload)
  ).finish();
}

export function encodeMatchEndBr(payload) {
  const err = Proto.shared.MatchEndBr.verify(payload);
  if (err) throw new Error(err);
  return Proto.shared.MatchEndBr.encode(
    Proto.shared.MatchEndBr.create(payload)
  ).finish();
}

export function decodeMatchEndBr(buffer) {
  return Proto.shared.MatchEndBr.decode(buffer);
}

