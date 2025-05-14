// ─── Domain Objects ───────────────────────────────────────────────

export interface Ball {
	id: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
}

export interface Paddle {
	id: number;
	offset: number;
}

export interface ScoreEntry {
	playerId: number;
	score: number;
}

export interface FullState {
	gameId: number;
	tick: number;
	balls: Ball[];
	paddles: Paddle[];
	isPaused: boolean;
	isGameOver: boolean;
	scores: ScoreEntry[];
}

// ─── Player Input ─────────────────────────────────────────────────

export interface PlayerInput {
	playerId: string;
	x: number;
	y: number;
}

// ─── Match Creation ───────────────────────────────────────────────

export interface MatchCreateRequest {
	mode: string;
	players: string[];
	options: Record<string, string>;
}

export interface MatchCreateResponse {
	gameId: string;
	error: string;
}

// ─── Physics Tick ─────────────────────────────────────────────────

export interface PhysicsRequest {
	gameId: string;
	inputs: PlayerInput[];
	lastState: FullState;
}

export interface PhysicsResponse {
	newState: FullState;
	error: string;
	goalScored: boolean;
	scorerId: string;
}

// ─── State Broadcast ──────────────────────────────────────────────

export interface StateUpdate {
	state: FullState;
}

export interface MatchSetup {
	mode: string;
	gameId: string;
	players: string[];
	options: Record<string, string>;
}

export interface MatchInput {
	gameId: string;
	inputs: PlayerInput[];
}

// ─── WebSocket Events ─────────────────────────────────────────────

export interface GameOver {
	winnerId: number;
	finalScores: ScoreEntry[];
}

export interface GamePaused {
	reason: string;
}

export interface GameReset {
	reason: string;
}

export interface WsMessage {
	state?: FullState;
	gameOver?: GameOver;
	gamePaused?: GamePaused;
	gameReset?: GameReset;
}

// ─── Protobuf Encoder/Decoder Interfaces ─────────────────────────
export function encodeWsMessage(message: WsMessage): Uint8Array;
export function decodeWsMessage(buffer: Uint8Array): WsMessage;

