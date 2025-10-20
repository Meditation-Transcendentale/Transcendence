import { glob } from 'glob';
import path from 'path';
import { WebSocketServer } from 'ws';
import * as esbuild from 'esbuild'
import fs from 'fs';


const wss = new WebSocketServer({
	port: 7070
})

const notifyPlugin = {
	name: 'rebuild-notify',
	setup(build) {
		build.onEnd(result => {
			console.log(`build ended with ${result.errors.length} errors`);
			wss.clients.forEach(client => {
				if (client.readyState === 1) {
					client.send('reload');
				}
			});
		})
	},
};

const externalBabylonPlugin = {
	name: 'external-babylon',
	setup(build) {
		build.onResolve({ filter: /babylon$/ }, args => {
			return {
				path: "/dist/babylon",
				external: true
			};
		});
	},
};


const mainctx = await esbuild.context({
	entryPoints: [
		'src/main.ts',
		'src/User.ts',
		'src/scene/SceneManager.ts',
		'src/route/RouteManager.ts',
		'src/html/HtmlManager.ts',
		'src/stream/StreamManager.ts',
		'src/state/StateManager.ts',
	],
	bundle: true,
	outdir: "./dist",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	drop: ['console', 'debugger'],
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: true,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin, externalBabylonPlugin]
})

const babylonctx = await esbuild.context({
	entryPoints: ['src/babylon.ts'],
	bundle: true,
	outfile: "./dist/babylon.js",
	treeShaking: false,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin]
})

await mainctx.rebuild();
await babylonctx.rebuild();

console.log("Build Successful");
process.exit(0);
