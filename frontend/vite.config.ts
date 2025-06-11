import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 8081,
		https: {
			key: fs.readFileSync("./certs/server.key"),
			cert: fs.readFileSync("./certs/server.crt")
		}
	},
	build: {
		outDir: 'dist',
	},
	//publicDir: './public/assets'
});

