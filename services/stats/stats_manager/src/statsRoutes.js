import { handleErrors } from "../../shared/handleErrors.mjs";
import { statusCode } from "../../shared/returnValues.mjs";
import { nc, jc } from "./index.js";

const playerStatsSchema = {
	params: {
		type: 'object',
		properties: {
			username: { type: 'string' },
			mode: { type: 'string', enum: ['classic', 'br', 'io'] }
		},
		required: ['username', 'mode'],
	}
};

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
		best_win_streak: getBestWinStreak(playerStats),
		wins: playerStats.filter((match) => match.is_winner).length,
	};

	if (mode === 'classic') {
		stats.losses = playerStats.filter((match) => !match.is_winner).length,
			stats.goals_scored = playerStats.reduce((acc, match) => acc + match.goals_scored, 0),
			stats.goals_conceded = playerStats.reduce((acc, match) => acc + match.goals_conceded, 0),
			stats.avg_goals_scored = Number((playerStats.reduce((acc, match) => acc + match.goals_scored, 0) / playerStats.length || 0).toFixed(2)),
			stats.avg_goals_conceded = Number((playerStats.reduce((acc, match) => acc + match.goals_conceded, 0) / playerStats.length || 0).toFixed(2))
	} else if (mode === 'br' || mode === 'io') {
		stats.avg_placement = Number((playerStats.reduce((acc, match) => acc + match.placement, 0) / playerStats.length || 0).toFixed(2)),
			stats.best_placement = playerStats.reduce((acc, match) => Math.min(acc, match.placement), 100),
			stats.kills = playerStats.reduce((acc, match) => acc + match.kills, 0),
			stats.avg_kills = Number((playerStats.reduce((acc, match) => acc + match.kills, 0) / playerStats.length || 0).toFixed(2)),
			stats.best_kills = playerStats.reduce((acc, match) => Math.max(acc, match.kills), 0)
	}
	return stats;
}

export default async function statsRoutes(app) {

	app.get('/player/:username/:mode', { schema: playerStatsSchema }, handleErrors(async (req, res) => {

		const { username, mode } = req.params;

		const user = await nc.request('user.getUserFromUsername', jc.encode({ username }), { timeout: 1000 });
		const userResult = jc.decode(user.data);
		if (!userResult.success) {
			throw { status: userResult.status, message: userResult.message };
		}
		const playerId = userResult.data.id;

		if (!['classic', 'br', 'io'].includes(mode)) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.BAD_REQUEST };
		}

		const response = await nc.request(`stats.getPlayerStats.${mode}`, jc.encode(playerId), { timeout: 1000 });

		const result = jc.decode(response.data);
		if (!result.success) {
			throw { status: result.status, message: result.message };
		}
		const playerStats = result.data;


		res.code(statusCode.SUCCESS).send({
			playerStats: {
				['stats']: calculateStats(playerStats, mode),
				[`history`]: playerStats
			}
		});
	}));
}
