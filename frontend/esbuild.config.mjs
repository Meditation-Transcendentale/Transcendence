import { glob } from 'glob';
import path from 'path';
import * as esbuild from 'esbuild'

const spa = glob.sync("src/spa/*.ts");


await esbuild.build({
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
})

const spactxs = [];


for (let file of Object(spa)) {
	await esbuild.build({
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
	}).then((ctx) => { spactxs.push(ctx) });
}

await esbuild.build({
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
})

await esbuild.build({
	entryPoints: ['src/pongbr/PongBR.ts'],
	bundle: true,
	outfile: "./dist/pongbr/PongBR.js",
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
	plugins: [notifyPlugin]
})

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
