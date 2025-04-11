import Database from 'better-sqlite3';
import dotenv from 'dotenv';

import { statusCode, returnMessages } from "./returnValues.js";

dotenv.config({path: "../../../../.env"});

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const selectUsersUsernameStmt = database.prepare("SELECT * FROM users WHERE username = ?");
const insertUsersStmt = database.prepare("INSERT INTO users (username, password) VALUES (?, ?)");

const userService = {
	checkUsernameAvailability: (username) => {
		const user = selectUsersUsernameStmt.get(username);
		if (user) {
			throw { status: statusCode.CONFLICT, message: returnMessages.USERNAME_ALREADY_USED };
		}
	},
	registerUser: (username, hashedPassword) => {
		insertUsersStmt.run(username, hashedPassword);
	},
};

export default userService;