import { handleErrors } from "../../shared/handleErrors.mjs";
import { statusCode } from "../../shared/returnValues.mjs";
import { nc, jc } from "./index.js";

const playerStatsSchema = {
	params: {
		type: 'object',
		properties: {
			playerId: { type: 'string' }
		},
		required: ['playerId'],
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
		wins: playerStats.filter((match) => match.is_winner).length,
		win_rate: Number((playerStats.filter((match) => match.is_winner).length / playerStats.length || 0).toFixed(2)),
		best_win_streak: getBestWinStreak(playerStats),
	};

	if (mode === 'classic') {
		stats.losses = playerStats.filter((match) => !match.is_winner).length,
		stats.goals_scored = playerStats.reduce((acc, match) => acc + match.goals_scored, 0),
		stats.goals_conceded = playerStats.reduce((acc, match) => acc + match.goals_conceded, 0),
		stats.avg_goals_scored = Number((playerStats.reduce((acc, match) => acc + match.goals_scored, 0) / playerStats.length || 0).toFixed(2)),
		stats.avg_goals_conceded = Number((playerStats.reduce((acc, match) => acc + match.goals_conceded, 0) / playerStats.length || 0).toFixed(2))
	} else if (mode === 'br' || mode === 'io') {
		stats.avg_placement = Number((playerStats.reduce((acc, match) => acc + match.placement, 0) / playerStats.length || 0).toFixed(2)),
		stats.best_placement = playerStats.reduce((acc, match) => Math.max(acc, match.placement), 0),
		stats.kills = playerStats.reduce((acc, match) => acc + match.kills, 0),
		stats.avg_kills = Number((playerStats.reduce((acc, match) => acc + match.kills, 0) / playerStats.length || 0).toFixed(2)),
		stats.best_kills = playerStats.reduce((acc, match) => Math.max(acc, match.kills), 0)
	}
}

export default async function statsRoutes(app) {

	app.get('/player/:playerId/:mode', { schema: playerStatsSchema }, handleErrors(async (req, res) => {
		
		const { playerId, mode } = req.params;

		if (!['classic', 'br', 'io'].includes(mode)) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.BAD_REQUEST };
		}

		const response = await nc.request(`stats.getPlayerStats.${mode}`, jc.encode(playerId), { timeout: 1000 });

		const result = jc.decode(response.data);
		if (!result.success) {
			throw { status: result.status, message: result.message };
		}
		const playerStats = result.data;


		res.code(statusCode.SUCCESS).send({ playerStats: {
			[mode]: calculateStats(playerStats, mode),
			[`${mode}_history`]: playerStats
		}});

		// res.code(statusCode.SUCCESS).send({ playerStats: { 
		// 	classic: {
		// 		game_played: playerStats.classic.length,
		// 		wins: playerStats.classic.filter((match) => match.is_winner).length,
		// 		losses: playerStats.classic.filter((match) => !match.is_winner).length,
		// 		win_rate: Number((playerStats.classic.filter((match) => match.is_winner).length / playerStats.classic.length || 0).toFixed(2)),
		// 		best_win_streak: getBestWinStreak(playerStats.classic),
		// 		goals_scored: playerStats.classic.reduce((acc, match) => acc + match.goals_scored, 0),
		// 		goals_conceded: playerStats.classic.reduce((acc, match) => acc + match.goals_conceded, 0),
		// 		avg_goals_scored: Number((playerStats.classic.reduce((acc, match) => acc + match.goals_scored, 0) / playerStats.classic.length || 0).toFixed(2)),
		// 		avg_goals_conceded: Number((playerStats.classic.reduce((acc, match) => acc + match.goals_conceded, 0) / playerStats.classic.length || 0).toFixed(2)) },
		// 	br: {
		// 		game_played: playerStats.br.length,
		// 		wins: playerStats.br.filter((match) => match.is_winner).length,
		// 		win_rate: Number((playerStats.br.filter((match) => match.is_winner).length / playerStats.br.length || 0).toFixed(2)),
		// 		best_win_streak: getBestWinStreak(playerStats.br),
		// 		avg_placement: Number((playerStats.br.reduce((acc, match) => acc + match.placement, 0) / playerStats.br.length || 0).toFixed(2)),
		// 		best_placement: playerStats.br.reduce((acc, match) => Math.max(acc, match.placement), 0),
		// 		kills: playerStats.br.reduce((acc, match) => acc + match.kills, 0),
		// 		avg_kills: Number((playerStats.br.reduce((acc, match) => acc + match.kills, 0) / playerStats.br.length || 0).toFixed(2)),
		// 		best_kills: playerStats.br.reduce((acc, match) => Math.max(acc, match.kills), 0) },
		// 	io: {
		// 		game_played: playerStats.io.length,
		// 		wins: playerStats.io.filter((match) => match.is_winner).length,
		// 		win_rate: Number((playerStats.io.filter((match) => match.is_winner).length / playerStats.io.length || 0).toFixed(2)),
		// 		best_win_streak: getBestWinStreak(playerStats.io),
		// 		avg_placement: Number((playerStats.io.reduce((acc, match) => acc + match.placement, 0) / playerStats.io.length || 0).toFixed(2)),
		// 		best_placement: playerStats.io.reduce((acc, match) => Math.max(acc, match.placement), 0),
		// 		kills: playerStats.io.reduce((acc, match) => acc + match.kills, 0),
		// 		avg_kills: Number((playerStats.io.reduce((acc, match) => acc + match.kills, 0) / playerStats.io.length || 0).toFixed(2)),
		// 		best_kills: playerStats.io.reduce((acc, match) => Math.max(acc, match.kills), 0) },
		// 	classic_history: playerStats.classic,
		// 	br_history: playerStats.br,
		// 	io_history: playerStats.io
		// }});
	}));
}