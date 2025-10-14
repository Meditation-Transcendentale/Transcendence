import Database from 'better-sqlite3';
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const getPlayerStatsClassicModeStmt = database.prepare(`
	SELECT ms.is_winner, ms.goals_scored, ms.goals_conceded, m.created_at
	FROM match m
	JOIN match_stats ms ON m.match_id = ms.match_id
	WHERE ms.user_id = ? AND m.game_mode = 'classic'
	ORDER BY m.created_at
`);
const getPlayerStatsBRModeStmt = database.prepare(`
	SELECT ms.is_winner, ms.placement, m.created_at
	FROM match m
	JOIN match_stats ms ON m.match_id = ms.match_id
	WHERE ms.user_id = ? AND m.game_mode = ?
	ORDER BY m.created_at
`);
const getPlayerHistoryStmt = database.prepare(`
  	SELECT
		m.match_id,
		m.game_mode,
		ms.is_winner,
		ms.goals_scored,
		ms.goals_conceded,
		ms.placement,
		m.created_at
	FROM match m
	JOIN match_stats ms ON m.match_id = ms.match_id
	WHERE ms.user_id = ?
	ORDER BY m.created_at DESC
	LIMIT 10
`);
const getOpponentUsernameStmt = database.prepare(`
	SELECT u.username
	FROM users u
	JOIN match_stats ms ON u.id = ms.user_id
	JOIN match m ON ms.match_id = m.match_id
	WHERE ms.match_id = ? AND ms.user_id != ? AND m.game_mode = 'classic'
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
	getOpponentUsername: (matchId, playerId) => {
		const opponent = getOpponentUsernameStmt.get(matchId, playerId);
		return opponent
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
			for (const [result] of matchResults.entries()) {
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