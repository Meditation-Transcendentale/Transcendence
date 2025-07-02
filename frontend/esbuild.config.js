const esbuild = require('esbuild')
const glob = require('glob')

const spa = glob.sync("src/spa/*.ts");


Object(spa).forEach((file) => {
	esbuild.build({
		entryPoints: [file],
		bundle: true,
		outfile: `./dist/spa/${path.basename(file, '.ts')}.js`,
		treeShaking: true,
		//legalComments: 'none',
		format: "esm",
		//minify: true,
		//minifySyntax: true,
		//minifyWhitespace: true,
		//minifyIdentifiers: true,
		splitting: false
	})
})

esbuild.build({
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
	splitting: false
})

esbuild.build({
	entryPoints: ['src/main.ts'],
	bundle: true,
	outfile: "./dist/main.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false
})

esbuild.build({
	entryPoints: ['src/Vue.ts'],
	bundle: true,
	outfile: "./dist/Vue.js",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false
})
