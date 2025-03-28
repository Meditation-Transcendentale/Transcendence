import Fastify from 'fastify';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import { promisify } from 'util';
import dotenv from 'dotenv';
import fs from 'fs';
// import jwt from 'jsonwebtoken';
import fastifyCookie from 'fastify-cookie';

dotenv.config({path: "../../../.env"});

const app = Fastify({ 
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
database.get = promisify(database.get);

const insert = database.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`);

const registerSchema = {
	body: {
		type: 'object',
		required: ['username', 'email', 'password'],
		properties: {
			username: { type: 'string' },
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

app.post('/', {schema: registerSchema},  async (req, res) => {
	try {
		
		const { username, email, password} = req.body;

		if (!username || !email || !password) {
			return res.status(400).send({ message: 'Name, email, and password are required' });
		}

		const existingEmail = await database.get(`SELECT * FROM users WHERE email = ?`, email);
		if (existingEmail) {
			return res.status(409).send({ message: 'Email is already in use' });
		}
		const existingUsername = await database.get(`SELECT * FROM users WHERE username = ?`, username);
		if (existingUsername) {
			return res.status(409).send({ message: 'Username is already in use' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await insert.run(username, email, hashedPassword, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send({ message: err.message });
			}
		});

	// return res.redirect(`https://localhost:3000/auth/registered?email=${encodeURIComponent(email)}`);
	return res.status(201).send({ message: 'User registered' });

	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: 'Server Error' });
	}
});

app.setErrorHandler((error, req, res) => {
	if (error.validation) {
		const errors = error.validation.map(err => err.message);
		return res.code(400).send({ message: 'Name, email, and password are required', errors });
	}
	console.log(error);
	return res.code(500).send({ message: 'Server Error' });
});

const start = async () => {
	try {
		await app.listen({ port: 3001, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();

// {
// 	 "username":"",
// 	 "email":"@gmail.com",
// 	 "password":""
// }