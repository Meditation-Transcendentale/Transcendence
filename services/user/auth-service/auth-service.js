import fastify from 'fastify';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import fastifyCookie from 'fastify-cookie';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import https from 'https';
import axios from 'axios';

dotenv.config({ path: "../../../.env" });

const app = fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

app.register(fastifyCookie);

const Database = sqlite3.Database;
const database = new Database(process.env.DATABASE_URL, sqlite3.OPEN_READWRITE);
await database.run("PRAGMA journal_mode = WAL;");
database.configure("busyTimeout", 5000);
// database.get = promisify(database.get);

const stmt_email = database.prepare(`SELECT * FROM users WHERE email = ?`);
const getUserByEmail = promisify(stmt_email.get.bind(stmt_email));
// const stmt_id = database.prepare(`SELECT * FROM users WHERE id = ?`);
// const getUserById = promisify(stmt_id.get.bind(stmt_id));
const insertGoogleUser = promisify(database.run.bind(database));

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginSchema = {
	body: {
		type: 'object',
		required: ['email', 'password'],
		properties: {
			email: { type: 'string', format: 'email' },
			password: { type: 'string', format: 'password' }
		}
	}
};

const verifyApiKey = (req, res, done) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== process.env.API_GATEWAY_KEY) {
		return res.code(401).send({ message: 'Unauthorized' });
	}
	done();
}

app.addHook('onRequest', verifyApiKey);

app.post('/login', { schema: loginSchema }, async (req, res) => {
	try {

		const { email, password, token } = req.body;

		const user = await getUserByEmail(email);
		if (!user) {
			return res.code(404).send({ message: 'User not found' });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.code(401).send({ message: 'Invalid password' });
		}

		if (user.two_fa_enabled == true) {
			if (!token) {
				return res.code(400).send({ message: 'Token is required' });
			}

			const agent = new https.Agent({
				rejectUnauthorized: false
			});

			const response = await axios.post('https://update_user_info-service:3003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ id: user.id }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			console.log(response.data);
			
			if (response.data.valid == false) {
				return res.code(401).send({ message: response.data.message });
			}
		}

		const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
		res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

		return res.code(200).send({ message: 'Logged in successfully' });
	} catch (error) {
		// console.log(error);
		return res.code(500).send({ message: error.message });
	}
});


app.post('/auth-google', async (req, res) => {
	
	const { token } = req.body;
	const retCode = 200;
	const retMessage = 'Logged in with google';
	if (!token) {
		return res.code(400).send({ message: 'No token provided' });
	}

	try {
		const ticket = await googleClient.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID
		});
	
		const payload = ticket.getPayload();

		const { sub: google_id, email, name: username, picture: avatar_path } = payload;

		// console.log(payload);

		const user = await getUserByEmail(email);
		if (!user) {
			retCode = 201, retMessage = 'Registered and logged in with google';
			await insertGoogleUser(`INSERT INTO users (google_id, username, email, avatar_path) VALUES (?, ?, ?, ?)`, google_id, username, email, avatar_path);
		}
		const finalUser = await getUserByEmail(email);

		const accessToken = jwt.sign({ id: finalUser.id, role: finalUser.role }, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
		res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

		return res.code(retCode).send({ message: retMessage });
	} catch (error) {
		console.log(error);
		return res.code(500).send({ message: error.message });
	}
});


// app.get('/registered', async (req, res) => {
// 	try {

// 		const { email} = req.query;
// 		const user = await database.get(`SELECT * FROM users WHERE email = ?`, email);

// 		if (!user) {
// 			return res.code(404).send({ message: 'User not found' });
// 		}
// 		const accessToken = jwt.sign({id : user.id, role : user.role}, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
// 		res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

// 		return res.code(200).send({ message: 'Logged in' });
// 	} catch (error) {
// 		console.log(error);
// 		return res.code(500).send({ message: 'Server Error' });
// 	}
// });

app.post('/auth', async (req, res) => {

	const { token } = req.body;

	if (!token) {
		return res.code(400).send({ valid: false, message: 'No token provided' });
	}
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
		return res.code(200).send({ valid: true, user: decodedToken });
	} catch (error) {
		return res.code(401).send({ valid: false, message: 'Invalid token' });
	}
});

const start = async () => {
	try {
		await app.listen({ port: 4002, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();



