// src/index.js
import UIService from './uiService.js';

new UIService().start().catch(err => {
	console.error('[UIService] start failed:', err);
	process.exit(1);
});
