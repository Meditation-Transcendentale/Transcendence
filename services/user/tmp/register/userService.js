import Database from 'better-sqlite3';
import dotenv from 'dotenv';

import { statusCode, returnMessages } from "./returnValues.js";

dotenv.config({path: "../../../../.env"});

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const checkUsernameAvailabilityStmt = database.prepare("SELECT * FROM users WHERE username = ?");
const registerUserStmt = database.prepare("INSERT INTO users (username, password) VALUES (?, ?)");

const userService = {
	checkUsernameAvailability: (username) => {
		const user = checkUsernameAvailabilityStmt.get(username);
		if (user) {
			throw { status: statusCode.CONFLICT, message: returnMessages.USERNAME_ALREADY_USED };
		}
	},
	registerUser: (username, hashedPassword) => {
		registerUserStmt.run(username, hashedPassword);
	},
};

export default userService;