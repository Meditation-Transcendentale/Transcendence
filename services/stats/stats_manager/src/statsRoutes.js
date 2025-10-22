import { handleErrors } from "../../shared/handleErrors.mjs";
import { statusCode } from "../../shared/returnValues.mjs";
import { nats, jc } from "./index.js";

function getBestWinStreak(matches) {
	let bestStreak = 0;
	let currentStreak = 0;
	for (const match of matches) {
		if (match.is_winner) {
			currentStreak++;
			if (currentStreak > bestStreak) bestStreak = currentStreak;
		} else {
			currentStreak = 0;
		}
	}
	return bestStreak;
}

function calculateStats(playerStats, mode) {
	const stats = {
		game_played: playerStats.length,
		win_rate: Number((playerStats.filter((match) => match.is_winner).length / playerStats.length || 0).toFixed(2)),
		wins: playerStats.filter((match) => match.is_winner).length,
	};

	if (mode === 'classic') {
		stats.best_win_streak = getBestWinStreak(playerStats);
		stats.losses = playerStats.filter((match) => !match.is_winner).length,
		stats.goals_scored = playerStats.reduce((acc, match) => acc + match.goals_scored, 0),
		stats.goals_conceded = playerStats.reduce((acc, match) => acc + match.goals_conceded, 0)
	} else if (mode === 'br') {
		stats.avg_placement = Number((playerStats.reduce((acc, match) => acc + match.placement, 0) / playerStats.length || 0).toFixed(2)),
		stats.best_placement = playerStats.reduce((acc, match) => Math.min(acc, match.placement), 100)
	}
	return stats;
}

export default async function statsRoutes(app) {

	app.post('/player', handleErrors(async (req, res) => {

		const { uuid, mode } = req.body;

		const user = await nats.request('user.getUserFromUUID', jc.encode({ uuid }), { timeout: 1000 });
		const userResult = jc.decode(user.data);
		if (!userResult.success) {
			throw { status: userResult.status, code: userResult.code, message: userResult.message };
		}
		const playerId = userResult.data.id;

		if (!['classic', 'br'].includes(mode)) {
			throw { status: 400, code: 40030, message: 'Invalid game mode' };
		}

		const response = await nats.request(`stats.getPlayerStats.${mode}`, jc.encode(playerId), { timeout: 1000 });

		const result = jc.decode(response.data);
		if (!result.success) {
			throw { status: result.status, code: result.code, message: result.message };
		}
		const playerStats = result.data;

		res.code(statusCode.SUCCESS).send({
			playerStats: {
				['stats']: calculateStats(playerStats, mode)
			}
		});
	}));

	app.post('/get/history', handleErrors(async (req, res) => {

		const { uuid } = req.body;

		const user = await nats.request('user.getUserFromUUID', jc.encode({ uuid }), { timeout: 1000 });
		const userResult = jc.decode(user.data);
		if (!userResult.success) {
			throw { status: userResult.status, code: userResult.code, message: userResult.message };
		}
		const playerId = userResult.data.id;

		const response = await nats.request(`stats.getPlayerHistory`, jc.encode(playerId), { timeout: 1000 });

		const result = jc.decode(response.data);
		if (!result.success) {
			throw { status: result.status, code: result.code, message: result.message };
		}
		const playerHistory = result.data;

		for (const match of playerHistory) {
			if (match.game_mode === 'classic') {
				const opponentResponse = await nats.request(`stats.getOpponentUsername`, jc.encode({ matchId: match.match_id, playerId }), { timeout: 1000 });
				const opponentResult = jc.decode(opponentResponse.data);
				if (!opponentResult.success) {
					throw { status: opponentResult.status, code: opponentResult.code, message: opponentResult.message };
				}
				match.opponent_username = opponentResult.data.username;
			}
		}

		res.header('Cache-Control', 'no-store');
		res.code(statusCode.SUCCESS).send({ playerHistory });

	}));

	app.get('/get/brickbreaker', handleErrors(async (req, res) => {

		const user = await nats.request('user.getUserFromHeader', jc.encode({ headers: req.headers }), { timeout: 1000 });

		const userResult = jc.decode(user.data);
		if (!userResult.success) {
			throw { status: userResult.status, code: userResult.code, message: userResult.message };
		}
		const playerId = userResult.data.id;

		const response = await nats.request(`stats.getBrickBreakerStats`, jc.encode(playerId), { timeout: 1000 });

		const result = jc.decode(response.data);
		if (!result.success) {
			throw { status: result.status, code: result.code, message: result.message };
		}
		const brickBreakerStats = result.data;

		res.header('Cache-Control', 'no-store');
		res.code(statusCode.SUCCESS).send({ brickBreakerStats });
	}));

	app.patch('/update/brickbreaker', handleErrors(async (req, res) => {

		const { mode, score } = req.body;


	    if (typeof score !== 'number' || isNaN(score) || !isFinite(score)) {
            throw { status: 400, code: 40032, message: 'Score must be a valid number' };
        }
        if (!Number.isInteger(score)) {
            throw { status: 400, code: 40033, message: 'Score must be an integer' };
        }
        if (score < 0) {
            throw { status: 400, code: 40034, message: 'Score must be non-negative' };
        }
        if (score > Number.MAX_SAFE_INTEGER) {
            throw { status: 400, code: 40035, message: 'Score exceeds maximum allowed value' };
        }

		const user = await nats.request('user.getUserFromHeader', jc.encode({ headers: req.headers }), { timeout: 1000 });
		const userResult = jc.decode(user.data);
		if (!userResult.success) {
			throw { status: userResult.status, code: userResult.code, message: userResult.message };
		}

		switch (true) {
			case (mode === 'easy'):
				await nats.request(`stats.updateBrickBreakerEasyStats`, jc.encode({ playerId: userResult.data.id, score}), { timeout: 1000 });
				break;
			case (mode === 'normal'):
				await nats.request(`stats.updateBrickBreakerNormalStats`, jc.encode({ playerId: userResult.data.id, score }), { timeout: 1000 });
				break;
			case (mode === 'hard'):
				await nats.request(`stats.updateBrickBreakerHardStats`, jc.encode({ playerId: userResult.data.id, score }), { timeout: 1000 });
				break;
			default:
				throw { status: 400, code: 40031, message: 'No score provided' };
		}
		res.code(statusCode.SUCCESS).send({ message: 'Stats updated' });

	}));

	app.get('/get/leaderboard/brickbreaker', handleErrors(async (req, res) => {

		const natsResponse = await nats.request(`stats.getBrickBreakerLeaderboard`, jc.encode({}), { timeout: 1000 });
		const leaderboards = jc.decode(natsResponse.data);
		if (!leaderboards.success) {
			throw { status: leaderboards.status, code: leaderboards.code, message: leaderboards.message };
		}

		res.header('Cache-Control', 'no-store');
		res.code(statusCode.SUCCESS).send({ leaderboards: leaderboards.data });
	}));

	app.get('/health', (req, res) => {
		res.status(200).send('OK');
	});
}
