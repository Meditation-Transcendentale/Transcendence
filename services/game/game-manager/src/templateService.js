import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const templates = new Map();

export function loadTemplates(dir = '../../../../config/games/') {
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		if (file.endsWith('.yaml') || file.endsWith('.yml')) {
			const raw = fs.readFileSync(path.join(dir, file), 'utf8');
			const template = yaml.load(raw);
			templates.set(template.mode, template);
		}
	});
}

export function getTemplate(mode) {
	return templates.get(mode);
}
