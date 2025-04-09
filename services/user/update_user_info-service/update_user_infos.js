import Fastify from "fastify";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import fs from "fs";
import { promisify } from "util";
import bcrypt from "bcrypt";
import addFriendRoute from "./friendship.js";
import axios from "axios";
import https from "https";
import { twoFARoutes } from "./2FA.js";

dotenv.config({ path: "../../../.env" });

const app = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

const Database = sqlite3.Database;
const database = new Database(process.env.DATABASE_URL, sqlite3.OPEN_READWRITE);
await database.run("PRAGMA journal_mode = WAL;");
database.configure("busyTimeout", 5000);
database.get = promisify(database.get);
database.run = promisify(database.run);
database.all = promisify(database.all);

const verifyApiKey = (req, res, done) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== process.env.API_GATEWAY_KEY) {
		return res.code(401).send({ message: 'Unauthorized' });
	}
	done();
}

app.addHook('onRequest', verifyApiKey);

app.patch('/', async (req, res) => {
	try {
		const userHeader = req.headers['user'];

		if (!userHeader) {
			return res.code(400).send({ message: 'Unauthorized' });
		}

		if (!req.body) {
			return res.code(400).send({ message: 'Nothing to update' });
		}
		const userToken = JSON.parse(userHeader);

		const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);

		if (!user) {
			return res.code(404).send({ message: 'User not found' });
		}
		const { username, avatar,} = req.body;

		if (username) {
			await database.run(`UPDATE users SET username = ? WHERE id = ?`, username, user.id);
		}

		if (avatar) {
			await database.run(`UPDATE users SET avatar_path = ? WHERE id = ?`, avatar, user.id);
		}

		// if (twoFA && twoFA === true) {

		// 	const agent = new https.Agent({
		// 		rejectUnauthorized: false
		// 	});

		// 	const response = await axios.post('https://update_user_info-service:3003/enable-2fa', { headers: userHeader }, { httpsAgent: agent });
		// }

		return res.code(200).send({ message: 'User info updated' });
	} catch (error) {
		// console.log(error);
		return res.code(500).send({ message: 'Server Error' });
	}
});

app.patch('/password', async (req, res) => {
	try {
		const userHeader = req.headers['user'];

		if (!userHeader) {
			return res.code(400).send({ message: 'Unauthorized' });
		}

		if (!req.body) {
			return res.code(400).send({ message: 'Nothing to update' });
		}

		const userToken = JSON.parse(userHeader);
		const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);
		if (!user) {
			return res.code(404).send({ message: 'User not found' });
		}
		const { password, newPassword, token } = req.body;
		if (!password) {
			return res.code(400).send({ message: 'Password is required' });
		}
		if (!newPassword) {
			return res.code(400).send({ message: 'New password is required' });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.code(401).send({ message: 'Invalid password' });
		}

		if (user.two_fa_enabled) {
			const agent = new https.Agent({
				rejectUnauthorized: false
			});
			if (!token) {
				return res.code(400).send({ message: 'Token is required' });
			}

			const response = await axios.post('https://update_user_info-service:4003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ id: user.id }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			
			if (response.data.valid == false) {
				return res.code(401).send({ message: response.data.message });
			}
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await database.run(`UPDATE users SET password = ? WHERE id = ?`, hashedPassword, user.id);

		return res.code(200).send({ message: 'Password updated' });
	} catch (error) {
		// console.log(error);
		return res.code(500).send({ message: 'Server Error' });
	}
});

addFriendRoute(app);
twoFARoutes(app);

const start = async () => {
	try {
		await app.listen({ port: 4003, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();

export default database;





