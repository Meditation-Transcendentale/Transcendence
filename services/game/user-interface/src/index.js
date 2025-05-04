// index.js
import dotenv from 'dotenv';
dotenv.config();

import registerHandlers from './handlers.js';

async function main() {
	try {
		await registerHandlers();
		console.log('[UI] server up and running');
	} catch (err) {
		console.error('[UI] failed to start:', err);
		process.exit(1);
	}
}

main();
