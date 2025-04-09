import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	publicDir: 'public',
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: resolve(__dirname, 'index.html')
		}
	},
	server: {
		host: '0.0.0.0',  // Listen on all interfaces
		port: 5173        // Optionally specify a different port if desired
	}
});

