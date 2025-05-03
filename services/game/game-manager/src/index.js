// index.js
import dotenv from 'dotenv';
dotenv.config();

import { loadTemplates } from './templateService.js';
import { GameManager } from './services/game/game-manager/src/GameManager.js';

loadTemplates();

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

async function main() {
	const gm = new GameManager();
	await gm.init(NATS_URL);

	gm.start();

	console.log('[game-manager] up and running');
}

main().catch(err => {
	console.error('[game-manager] fatal error:', err);
	process.exit(1);
});

