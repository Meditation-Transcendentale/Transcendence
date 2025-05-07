import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import { connect, JSONCodec } from 'nats';

import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrorsValid, handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from '../../shared/natsRequest.mjs';

dotenv.config({ path: "../../../.env" });

const nats = await connect({ servers: process.env.NATS_URL });
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
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.TWO_FA_ALREADY_ENABLED };
		}
		if (user.provider !== 'local') {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.CANT_ENABLE_2FA };
		}

		const password  = req.body.password;
		if (!password) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.PASSWORD_REQUIRED };
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw { status: statusCode.UNAUTHORIZED, message: returnMessages.BAD_PASSWORD };
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
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.TWO_FA_NOT_ENABLED, valid: false };
		}

		const token = req.body.token;
		if (!token) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN, valid: false };
		}
		const secret = JSON.parse(user.two_fa_secret);
		if (!secret) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.TWO_FA_NOT_ENABLED, valid: false };
		}

		const isTokenValid = verifyToken(secret, token);
		if (!isTokenValid) {
			throw { status: statusCode.UNAUTHORIZED, message: returnMessages.INVALID_CODE, valid: false };
		}

		res.code(statusCode.SUCCESS).send({ message: returnMessages.TWO_FA_VERIFIED, valid: true });

	}));

	app.delete('/disable-2fa', handleErrors(async (req, res) => {

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

		if (!user.two_fa_enabled) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.TWO_FA_NOT_ENABLED };
		}
		
		const password = req.body.password;
		if (!password) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.PASSWORD_REQUIRED };
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw { status: statusCode.UNAUTHORIZED, message: returnMessages.BAD_PASSWORD };
		}

		await natsRequest(nats, jc, 'user.disable2FA', { userId: user.id });

		res.code(statusCode.SUCCESS).send({ message: returnMessages.TWO_FA_DISABLED });
	}));
}

export { twoFARoutes };
export default { generateSecret, generateQRCode, verifyToken };