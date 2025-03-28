import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';
import dotenv from 'dotenv';
import sqlite3 from "sqlite3";
import { promisify } from "util";

dotenv.config({ path: "../../../.env" });

function generateSecret() {
	return encrypt(speakeasy.generateSecret( { length: 20 } ).base32);
}

function generateQRCode(secret, username) {
	return QRCode.toDataURL(`otpauth://totp/${username}?secret=${decrypt(secret)}&issuer=auth-service`);
}

function verifyToken(secret, token) {
	return speakeasy.totp.verify({ secret: decrypt(secret), encoding: 'base32', token, window: 1 });
}

const algorithm = 'aes-256-cbc';
const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const initializationVector = crypto.randomBytes(16);

function encrypt(text) {
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), initializationVector);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: initializationVector.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
	const iv = Buffer.from(text.iv, 'hex');
	const encryptedText = Buffer.from(text.encryptedData, 'hex');
	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

// const Database = sqlite3.Database;
// const database = new Database(process.env.DATABASE_URL, sqlite3.OPEN_READWRITE);
// await database.run("PRAGMA journal_mode = WAL;");
// database.configure("busyTimeout", 5000);
// database.get = promisify(database.get);
// database.run = promisify(database.run);
// database.all = promisify(database.all);
import database from "./update_user_infos.js";


const twoFARoutes = (app) => {
	app.post('/enable-2fa', async (req, res) => {
		try {

			const userHeader = req.headers['user'];

			if (!userHeader) {
				return res.code(400).send({ message: 'Unauthorized' });
			}

			const userToken = JSON.parse(userHeader);
			const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);
			if (!user) {
				return res.code(404).send({ message: 'User not found' });
			}
			if (user.two_fa_enabled) {
				return res.code(400).send({ message: '2FA already enabled' });
			}

			const secret = generateSecret();

			await database.run(`UPDATE users SET two_fa_secret = ?, two_fa_enabled = ? WHERE id = ?`, JSON.stringify(secret), true, user.id);
			// await database.run(`UPDATE users SET WHERE id = ?`, true, user.id);

			// console.log(user);

			const qrCode = await generateQRCode(secret, user.username);
			// console.log(qrCode);

			return res.code(200).send({ message: '2FA enabled', qrCode });
		} catch (error) {
			// console.log(error);
			return res.code(500).send({ message: 'Server Error' });
		}
	});

	app.post('/verify-2fa', async (req, res) => {
		try {
			const userHeader = req.headers['user'];

			if (!userHeader) {
				return res.code(400).send({ message: 'Unauthorized', valid: false });
			}

			const userToken = JSON.parse(userHeader);
			const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);
			if (!user) {
				return res.code(404).send({ message: 'User not found', valid: false });
			}
			if (!user.two_fa_enabled) {
				return res.code(400).send({ message: '2FA not enabled', valid: false });
			}

			const token = req.body.token;
			if (!token) {
				return res.code(400).send({ message: 'Token is required', valid: false });
			}
			const secret = JSON.parse(user.two_fa_secret);
			if (!secret) {
				return res.code(400).send({ message: '2FA not enabled', valid: false });
			}

			const isTokenValid = verifyToken(secret, token);
			if (!isTokenValid) {
				return res.code(401).send({ message: 'Invalid code', valid: false });
			}

			return res.code(200).send({ message: '2FA verified', valid: true });
		} catch (error) {
			// console.log(error);
			return res.code(500).send({ message: 'Server Error', valid: false  });
		}
	});
}

export { twoFARoutes };
export default { generateSecret, generateQRCode, verifyToken };