import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import { connect, JSONCodec } from 'nats';

import { statusCode, returnMessages, userReturn } from "../../shared/returnValues.mjs";
import { handleErrorsValid, handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from '../../shared/natsRequest.mjs';

dotenv.config({ path: "../../../.env" });

const nats = await connect({ 
	servers: process.env.NATS_URL,
	token: process.env.NATS_TOKEN,
	tls: { rejectUnauthorized: false }
});
const jc = JSONCodec();

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

const twoFARoutes = (app) => {
	app.post('/enable-2fa', handleErrors(async (req, res) => {

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });
			
		if (user.two_fa_enabled) {
			throw { status: userReturn.USER_024.http, code: userReturn.USER_024.code, message: userReturn.USER_024.message };
		}
		if (user.provider !== 'local') {
			throw { status: userReturn.USER_029.http, code: userReturn.USER_029.code, message: userReturn.USER_029.message };
		}

		const password  = req.body.password;
		if (!password) {
			throw { status: userReturn.USER_005.http, code: userReturn.USER_005.code, message: userReturn.USER_005.message };
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw { status: userReturn.USER_022.http, code: userReturn.USER_022.code, message: userReturn.USER_022.message };
		}

		const secret = generateSecret();

		// console.log(secret, user.id);

		await natsRequest(nats, jc, 'user.enable2FA', { secret, userId: user.id });

		const qrCode = await generateQRCode(secret, user.username);
			// console.log(qrCode);

		res.code(statusCode.SUCCESS).send({ message: returnMessages.TWO_FA_ENABLED, qrCode });
	}));

	app.post('/verify-2fa', handleErrorsValid(async (req, res) => {

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

		if (!user.two_fa_enabled) {
			throw { status: userReturn.USER_026.http, code: userReturn.USER_026.code, message: userReturn.USER_026.message, valid: false };
		}

		const token = req.body.token;
		if (!token) {
			throw { status: userReturn.USER_023.http, code: userReturn.USER_023.code, message: userReturn.USER_023.message, valid: false };
		}
		const secret = JSON.parse(user.two_fa_secret);
		if (!secret) {
			throw { status: userReturn.USER_026.http, code: userReturn.USER_026.code, message: userReturn.USER_026.message, valid: false };
		}

		const isTokenValid = verifyToken(secret, token);
		if (!isTokenValid) {
			throw { status: userReturn.USER_014.http, code: userReturn.USER_014.code, message: userReturn.USER_014.message, valid: false };
		}

		res.code(statusCode.SUCCESS).send({ message: returnMessages.TWO_FA_VERIFIED, valid: true });

	}));

	app.delete('/disable-2fa', handleErrors(async (req, res) => {

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

		if (!user.two_fa_enabled) {
			throw { status: userReturn.USER_026.http, code: userReturn.USER_026.code, message: userReturn.USER_026.message };
		}
		
		const password = req.body.password;
		if (!password) {
			throw { status: userReturn.USER_005.http, code: userReturn.USER_005.code, message: userReturn.USER_005.message };
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw { status: userReturn.USER_022.http, code: userReturn.USER_022.code, message: userReturn.USER_022.message };
		}

		await natsRequest(nats, jc, 'user.disable2FA', { userId: user.id });

		res.code(statusCode.SUCCESS).send({ message: returnMessages.TWO_FA_DISABLED });
	}));
}

export { twoFARoutes };
export default { generateSecret, generateQRCode, verifyToken };