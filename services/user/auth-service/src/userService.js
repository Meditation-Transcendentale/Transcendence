import Database from 'better-sqlite3';
import dotenv from 'dotenv';

import { statusCode, returnMessages } from "./returnValues.js";

dotenv.config({path: "../../../../.env"});

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const getUserByUsernameStmt = database.prepare("SELECT * FROM users WHERE username = ?");
const addGoogleUserStmt = database.prepare("INSERT INTO users (google_id, username, email, avatar_path) VALUES (?, ?, ?, ?)");

const userService = {
	getUserFromUsername: (username) => {
		const user = getUserByUsernameStmt.get(username);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	addGoogleUser: (googleId, username, email, avatarPath) => {
		addGoogleUserStmt.run(googleId, username, email, avatarPath);
	}

};

export default userService;