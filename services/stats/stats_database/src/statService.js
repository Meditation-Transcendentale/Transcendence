import Database from 'better-sqlite3';
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const getPlayerStatsClassicModeStmt = database.prepare(`
	SELECT is_winner, goals_scored, goals_conceded, created_at
	FROM match
	JOIN match_stats ON match.match_id = match_stats.match_id
	WHERE match_stats.user_id = ? AND match.game_mode = 'classic'
	ORDER BY created_at
`);
const getPlayerStatsBRModeStmt = database.prepare(`
	SELECT is_winner, placement, created_at
	FROM match
	JOIN match_stats ON match.match_id = match_stats.match_id
	WHERE match_stats.user_id = ? AND match.game_mode = ?
	ORDER BY created_at
`);
const isUserIdExistingStmt = database.prepare(`SELECT * FROM users WHERE id = ?`);
const addMatchInfosStmt = database.prepare(`INSERT INTO match (game_mode, winner_id, total_players) VALUES (?, ?, ?)`);
const addMatchStatsInfosStmt = database.prepare(`INSERT INTO match_stats (match_id, user_id, is_winner, goals_scored, goals_conceded, placement) VALUES (?, ?, ?, ?, ?, ?)`);


const statService = {
	getPlayerStatsClassicMode: (playerId) => {
		const playerStatsClassic = getPlayerStatsClassicModeStmt.all(playerId);
		return playerStatsClassic;
	},
	getPlayerStatsBRMode: (playerId) => {
		const playerStatsBR = getPlayerStatsBRModeStmt.all(playerId, 'br');
		return playerStatsBR;
	},
	isUserIdExisting: (playerId) => {
		const player = isUserIdExistingStmt.get(playerId);
		if (!player) {
			throw { status: 404, code: 4042, message: returnMessages.USER_NOT_FOUND };
		}
	},
	addMatchInfos: (game_mode, winner_id, total_players) => {
		addMatchInfosStmt.run(game_mode, winner_id, total_players);
	},
	addMatchStatsInfos: (match_id, user_id, is_winner, goals_scored, goals_conceded, placement) => {
		addMatchStatsInfosStmt.run(match_id, user_id, is_winner, goals_scored, goals_conceded, placement);
	}



}

export default statService