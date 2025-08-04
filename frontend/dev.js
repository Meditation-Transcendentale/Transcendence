// dev.js
const esbuild = require('esbuild');

async function startDev() {
	// 1) Create a build context (implicitly incremental)
	const ctx = await esbuild.context({
		entryPoints: [
			'src/main.ts',
			'src/Vue.ts',
			...require('glob').sync('src/spa/*.ts'),
			'src/3d/App.ts'
		],
		bundle: true,
		outdir: 'dist',
		sourcemap: 'inline',
		format: 'esm',
	});

	// 2) Watch for changes
	await ctx.watch();

	// 3) Serve on 0.0.0.0:8081
	const server = await ctx.serve({
		servedir: 'dist',
		host: '0.0.0.0',
		port: 8081,
	});

	console.log(`🚀 Dev server running at http://${server.host}:${server.port}`);
}

startDev().catch(e => {
	console.error(e);
	process.exit(1);
});

