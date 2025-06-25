import fs, { existsSync } from 'fs';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config({ path: "../.env" });

const keyPath = process.env.SSL_KEY;
const crtPath = process.env.SSL_CERT;

if (!fs.existsSync(keyPath) || !fs.existsSync(crtPath)) {
	execSync(`openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout ${keyPath} -out ${crtPath} \
	-subj "/C=FR/ST=Rhone/L=Lyon/O=Transcendence/OU=Dev/CN=localhost"`);
	
	fs.chmodSync(process.env.SSL_KEY, 0o644);
	fs.chmodSync(process.env.SSL_CERT, 0o644);
	console.log('SSL certificates created');
}