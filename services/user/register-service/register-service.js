import Fastify from 'fastify';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import { promisify } from 'util';
import dotenv from 'dotenv';
import fs from 'fs';
import fastifyCookie from 'fastify-cookie';

import handleErrors from '../update_user_infos-service/src/handleErrors.js';

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

const insert = database.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);

const registerSchema = {
	body: {
		type: 'object',
		required: ['username', 'password'],
		properties: {
			username: { type: 'string' },
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
		
		const { username, password} = req.body;

		if (!username || !password) {
			return res.status(400).send({ message: 'Username and password are required' });
		}

		if (/^[a-zA-Z0-9]{3,20}$/.test(username) === false) {
			return res.status(400).send({ message: 'Username must be between 3 and 20 characters' });
		}

		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)	=== false) {
			return res.status(400).send({ message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number' });
		}

		const existingUsername = await database.get(`SELECT * FROM users WHERE username = ?`, username);
		if (existingUsername) {
			return res.status(409).send({ message: 'Username is already in use' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await insert.run(username, hashedPassword, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send({ message: err.message });
			}
		});

		return res.status(201).send({ message: 'User registered' });

	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: 'Server Error' });
	}
});

app.setErrorHandler((error, req, res) => {
	if (error.validation) {
		const errors = error.validation.map(err => err.message);
		return res.code(400).send({ message: 'Username and password are required', errors });
	}
	console.log(error);
	return res.code(500).send({ message: 'Server Error' });
});

const start = async () => {
	try {
		await app.listen({ port: 4001, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();

// {
// 	 "username":"",
// 	 "password":""
// }