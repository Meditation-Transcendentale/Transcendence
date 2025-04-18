import Database from 'better-sqlite3';
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const getPlayerStatsClassicModeStmt = database.prepare(`SElECT is_winner, goals_scored, goals_conceded
														FROM match
														JOIN match_stats ON match.match_id = match_stats.match_id
														WHERE user_id = ? AND game_mode = 'classic'`);




const statService = {
	getPlayerStatsClassicMode: (playerId) => {
		const playerStats = getPlayerStatsClassicModeStmt.all(playerId);
		return playerStats;
	},
	test: () => {
		const testStmt = database.prepare(`SELECT * FROM users`);
		const testResult = testStmt.all();
		return testResult;
	}
}

export default statService