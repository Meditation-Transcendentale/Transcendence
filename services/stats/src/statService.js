import Database from 'better-sqlite3';
import { statusCode, returnMessages } from "./returnValues.js";

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const getPlayerStatsStmt = database.prepare()

const statService = {
    
}

export default statService