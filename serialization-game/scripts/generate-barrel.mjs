#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genDir = path.resolve(__dirname, '../src/generated');
const outFile = path.resolve(__dirname, '../src/index.ts');

if (!fs.existsSync(genDir)) {
	console.error(`❌ generated folder not found: ${genDir}`);
	process.exit(1);
}

const files = fs.readdirSync(genDir).filter(f => f.endsWith('.ts'));
console.log('Found generated files:', files);

const lines = files.map(f => {
	const name = f.replace(/\.ts$/, '');
	return `export * from './generated/${name}';`;
});

const content = lines.join('\n') + '\n';
fs.writeFileSync(outFile, content, 'utf-8');
console.log(`✅ Wrote ${lines.length} exports to ${outFile}`);

