import { glob } from 'glob';
import path from 'path';
import { WebSocketServer } from 'ws';
import * as esbuild from 'esbuild'
import fs from 'fs';

const spa = glob.sync("src/spa/*.ts");

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

const shaderPlugin = {
	name: 'shader-loader',
	setup(build) {
		build.onLoad({ filter: /\.(fx|fragment|vertex)$/ }, async (args) => {
			const contents = await fs.promises.readFile(args.path, 'utf8');
			return {
				contents: `export default ${JSON.stringify(contents)};`,
				loader: 'js',
			};
		});
	},
};

// Plugin that rewrites "@babylonImport" to "src/babyImport"
const customAliasPlugin = {
	name: 'custom-alias',
	setup(build) {
		build.onResolve({ filter: /^@babylonImport$/ }, args => ({
			path: '../babyImport',
			external: true,
		}));
	},
};


const appctx = await esbuild.context({
	entryPoints: ['src/3d/App.ts'],
	bundle: true,
	outfile: "./dist/3d/App.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin, customAliasPlugin, shaderPlugin]
})

const spactxs = [];


for (let file of Object(spa)) {
	const ctx = await esbuild.context({
		entryPoints: [file],
		bundle: false,
		outfile: `./dist/spa/${path.basename(file, '.ts')}.js`,
		treeShaking: true,
		//legalComments: 'none',
		format: "esm",
		//minify: true,
		//minifySyntax: true,
		//minifyWhitespace: true,
		//minifyIdentifiers: true,
		splitting: false,
		resolveExtensions: ['.ts', '.js'],
		plugins: [notifyPlugin]
	}).then((ctx) => { spactxs.push(ctx) });
}

const mainctx = await esbuild.context({
	entryPoints: ['src/main.ts'],
	bundle: false,
	outfile: "./dist/main.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	//minify: true,
	//minifySyntax: true,
	//minifyWhitespace: true,
	//minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin]
})

const pongbrctx = await esbuild.context({
	entryPoints: ['src/pongbr/PongBR.ts'],
	bundle: true,
	outfile: "./dist/pongbr/PongBR.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin, customAliasPlugin]
})

const pongctx = await esbuild.context({
	entryPoints: ['src/pong/Pong.ts'],
	bundle: true,
	outfile: "./dist/pong/Pong.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin, customAliasPlugin]
})

const brickctx = await esbuild.context({
	entryPoints: ['src/brickbreaker/brickbreaker.ts'],
	bundle: true,
	outfile: "./dist/brickbreaker/brickbreaker.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin, customAliasPlugin]
})
let encodectx = await esbuild.context({
	entryPoints: ['src/encode/helper.ts'],
	bundle: true,
	outfile: "./dist/encode/helper.js",
	// outdir: "./dist/pongbr",
	treeShaking: false,
	legalComments: 'none',
	format: "esm",
	// minify: true,
	// minifySyntax: true,
	// minifyWhitespace: true,
	// minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
})

let babyctx = await esbuild.context({
	entryPoints: ['src/babyImport.ts'],
	bundle: true,
	outfile: "./dist/babyImport.js",
	treeShaking: false,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false,
	resolveExtensions: ['.ts', '.js'],
	plugins: [notifyPlugin, shaderPlugin]
})


let onRebuild = function(error, result) {
	if (error) {
		console.error('Build failed:', error);
	} else {
		console.log('Build succeeded');
		wss.clients.forEach(client => {
			if (client.readyState === 1) {
				client.send('reload');
			}
		});
	}
}


await appctx.watch();
await mainctx.watch();
await pongctx.watch();
await pongbrctx.watch();
await brickctx.watch();
await encodectx.watch();
await babyctx.watch();
//console.log(spactxs);
for (const ctx of spactxs) {
	await Object(ctx).watch();
}
console.log("Watching")

//Object(spa).forEach((file) => {
//	esbuild.build({
//		entryPoints: [file],
//		bundle: false,
//		outfile: `./dist/spa/${path.basename(file, '.ts')}.js`,
//		treeShaking: true,
//		//legalComments: 'none',
//		format: "esm",
//		//minify: true,
//		//minifySyntax: true,
//		//minifyWhitespace: true,
//		//minifyIdentifiers: true,
//		splitting: false,
//		resolveExtensions: ['.ts', '.js'],
//		watch: {
//			onRebuild(error, result) {
//				if (error) console.error('esbuild.build failed:', error);
//				else console.log('esbuild.build succeeded');
//			},
//		},
//	})
//})
//
//esbuild.build({
//	entryPoints: ['src/3d/App.ts'],
//	bundle: true,
//	outfile: "./dist/3d/App.js",
//	treeShaking: true,
//	legalComments: 'none',
//	format: "esm",
//	minify: true,
//	minifySyntax: true,
//	minifyWhitespace: true,
//	minifyIdentifiers: true,
//	splitting: false,
//	resolveExtensions: ['.ts', '.js'],
//})
//
//esbuild.build({
//	entryPoints: ['src/main.ts'],
//	bundle: false,
//	outfile: "./dist/main.js",
//	treeShaking: true,
//	legalComments: 'none',
//	format: "esm",
//	//minify: true,
//	//minifySyntax: true,
//	//minifyWhitespace: true,
//	//minifyIdentifiers: true,
//	splitting: false,
//	resolveExtensions: ['.ts', '.js'],
//})

//build({
//	entryPoints: ['src/Vue.ts'],
//	bundle: true,
//	outfile: "./dist/Vue.js",
//	treeShaking: true,
//	legalComments: 'none',
//	format: "esm",
//	// minify: true,
//	// minifySyntax: true,
//	// minifyWhitespace: true,
//	// minifyIdentifiers: true,
//	// splitting: false,
//	resolveExtensions: ['.ts', '.js'],
//
//})
