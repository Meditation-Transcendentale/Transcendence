import { build } from 'esbuild';
import { glob } from 'glob';
import path from 'path';

const spa = glob.sync("src/spa/*.ts");


Object(spa).forEach((file) => {
	build({
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
	})
})

build({
	entryPoints: ['src/3d/App.ts'],
	bundle: true,
	outfile: "./dist/3d/App.js",
	treeShaking: true,
	//legalComments: 'none',
	format: "esm",
	minify: true,
	//minifySyntax: true,
	//minifyWhitespace: true,
	//minifyIdentifiers: true,
	splitting: false,
	external: ['Vue'],
	resolveExtensions: ['.ts', '.js'],

})

build({
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

build({
	entryPoints: ['src/Vue.ts'],
	bundle: true,
	outfile: "./dist/Vue.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	// minify: true,
	// minifySyntax: true,
	// minifyWhitespace: true,
	// minifyIdentifiers: true,
	// splitting: false,
	resolveExtensions: ['.ts', '.js'],

})
