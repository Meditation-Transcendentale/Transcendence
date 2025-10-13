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
const getPlayerHistoryStmt = database.prepare(`
	SELECT match.game_mode, match_stats.is_winner, match_stats.goals_scored, match_stats.goals_conceded, match_stats.placement, match.created_at
	FROM match
	JOIN match_stats ON match.match_id = match_stats.match_id
	WHERE match_stats.user_id = ?
	ORDER BY match.created_at DESC
	LIMIT 10
`);
const getBrickBreakerStatsStmt = database.prepare(`
	SELECT easy_mode_hscore, normal_mode_hscore, hard_mode_hscore
	FROM brickbreaker_stats
	WHERE user_id = ?
`);
const getBrickBreakerLeaderboard_easyStmt = database.prepare(`
	SELECT users.username, brickbreaker_stats.easy_mode_hscore
	FROM brickbreaker_stats
	JOIN users ON brickbreaker_stats.user_id = users.id
	ORDER BY brickbreaker_stats.easy_mode_hscore DESC
	LIMIT 10
`);
const getBrickBreakerLeaderboard_normalStmt = database.prepare(`
	SELECT users.username, brickbreaker_stats.normal_mode_hscore
	FROM brickbreaker_stats
	JOIN users ON brickbreaker_stats.user_id = users.id
	ORDER BY brickbreaker_stats.normal_mode_hscore DESC
	LIMIT 10
`);
const getBrickBreakerLeaderboard_hardStmt = database.prepare(`
	SELECT users.username, brickbreaker_stats.hard_mode_hscore
	FROM brickbreaker_stats
	JOIN users ON brickbreaker_stats.user_id = users.id
	ORDER BY brickbreaker_stats.hard_mode_hscore DESC
	LIMIT 10
`);
const isUserIdExistingStmt = database.prepare(`SELECT * FROM users WHERE id = ?`);
const addMatchInfosStmt = database.prepare(`INSERT INTO match (game_mode, winner_id, total_players) VALUES (?, ?, ?)`);
const addMatchStatsInfosStmt = database.prepare(`INSERT INTO match_stats (match_id, user_id, is_winner, goals_scored, goals_conceded, placement) VALUES (?, ?, ?, ?, ?, ?)`);
const addBrickBreakerStatsStmt = database.prepare(`INSERT INTO brickbreaker_stats (user_id, easy_mode_hscore, normal_mode_hscore, hard_mode_hscore) VALUES (?, ?, ?, ?)`);
const updateBrickBreakerEasyStatsStmt = database.prepare(`UPDATE brickbreaker_stats SET easy_mode_hscore = ? WHERE user_id = ?`);
const updateBrickBreakerNormalStatsStmt = database.prepare(`UPDATE brickbreaker_stats SET normal_mode_hscore = ? WHERE user_id = ?`);
const updateBrickBreakerHardStatsStmt = database.prepare(`UPDATE brickbreaker_stats SET hard_mode_hscore = ? WHERE user_id = ?`);


const testAllMatch = database.prepare(`SELECT * FROM match`);
const testAllMatchStats = database.prepare(`SELECT * FROM match_stats`);

const statService = {
	getPlayerStatsClassicMode: (playerId) => {
		const playerStatsClassic = getPlayerStatsClassicModeStmt.all(playerId);
		return playerStatsClassic;
	},
	getPlayerStatsBRMode: (playerId) => {
		const playerStatsBR = getPlayerStatsBRModeStmt.all(playerId, 'br');
		return playerStatsBR;
	},
	getPlayerHistory: (playerId) => {
		const history = getPlayerHistoryStmt.all(playerId);
		return history;
	},
	isUserIdExisting: (playerId) => {
		const player = isUserIdExistingStmt.get(playerId);
		if (!player) {
			throw { status: 404, code: 4042, message: returnMessages.USER_NOT_FOUND };
		}
	},
	addMatchInfos: (game_mode, winner_id, total_players) => {
		const matchInfo = addMatchInfosStmt.run(game_mode, winner_id, total_players);
		return matchInfo.lastInsertRowid;
	},
	addBRMatchStatsInfos: (matchResults) => {
		const transaction = database.transaction(() => {
			for (const [index, result] of matchResults.entries()) {
				addMatchStatsInfosStmt.run(
					result.match_id, 
					result.user_id, 
					result.is_winner ? 1 : 0, 
					null, 
					null, 
					result.placement);
			}
		});
		transaction(matchResults);
	},
	addClassicMatchStatsInfos: (result) => {
		addMatchStatsInfosStmt.run(
			result.match_id,
			result.user_id,
			result.is_winner ? 1 : 0,
			result.goals_scored,
			result.goals_conceded,
			null
		);
	},
	getBrickBreakerStats: (playerId) => {
		const brickBreakerStats = getBrickBreakerStatsStmt.get(playerId);
		return brickBreakerStats;
	},
	getBrickBreakerLeaderboard_easy: () => {
		const leaderboard_easy = getBrickBreakerLeaderboard_easyStmt.all();
		return leaderboard_easy;
	},
	getBrickBreakerLeaderboard_normal: () => {
		const leaderboard_normal = getBrickBreakerLeaderboard_normalStmt.all();
		return leaderboard_normal;
	},
	getBrickBreakerLeaderboard_hard: () => {
		const leaderboard_hard = getBrickBreakerLeaderboard_hardStmt.all();
		return leaderboard_hard;
	},
	addBrickBreakerStats: (playerId) => {
		addBrickBreakerStatsStmt.run(playerId, 0, 0, 0);
	},
	updateBrickBreakerEasyStats: (playerId, score) => {
		updateBrickBreakerEasyStatsStmt.run(score, playerId);
	},
	updateBrickBreakerNormalStats: (playerId, score) => {
		updateBrickBreakerNormalStatsStmt.run(score, playerId);
	},
	updateBrickBreakerHardStats: (playerId, score) => {
		updateBrickBreakerHardStatsStmt.run(score, playerId);
	},
	testAll: () => {
		const allMatch = testAllMatch.all();
		const allMatchStats = testAllMatchStats.all();
		return { allMatch, allMatchStats };
	}



}

export default statService