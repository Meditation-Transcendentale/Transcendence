const esbuild = require('esbuild')
const glob = require('glob')

const spa = glob.sync("src/spa/*.ts");


Object(spa).forEach((file) => {
	esbuild.build({
		entryPoints: [file],
		//bundle: true,
		outdir: "./dist/spa",
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
	outdir: "./dist/3d",
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
	//bundle: true,
	outdir: "./dist/",
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
	//bundle: true,
	outdir: "./dist/",
	treeShaking: true,
	legalComments: 'none',
	format: "esm",
	minify: true,
	minifySyntax: true,
	minifyWhitespace: true,
	minifyIdentifiers: true,
	splitting: false
})
