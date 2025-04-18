import { parse } from "path";
import handleErrors from "../../shared/handleErrors.mjs";
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
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


export default async function statsRoutes(app) {

	app.get('/player/:playerId', { schema: playerStatsSchema }, handleErrors(async (req, res) => {
		
		const playerId = req.params.playerId;

		// check if playerId is valid

		
		const response = await nc.request(`stats.getPlayerStats`, jc.encode(playerId), { timeout: 1000 });

		const playerStats = jc.decode(response.data);
		console.log("Player stats:", playerStats);



		res.code(statusCode.SUCCESS).send({ playerStats: { 
			classic: {
				game_played: playerStats.classic.length,
				wins: playerStats.classic.filter((match) => match.is_winner).length,
				losses: playerStats.classic.filter((match) => !match.is_winner).length,
				win_rate: Number((playerStats.classic.filter((match) => match.is_winner).length / playerStats.classic.length || 0).toFixed(2)),
				best_win_streak: getBestWinStreak(playerStats.classic),
				goals_scored: playerStats.classic.reduce((acc, match) => acc + match.goals_scored, 0),
				goals_conceded: playerStats.classic.reduce((acc, match) => acc + match.goals_conceded, 0),
				avg_goals_scored: Number((playerStats.classic.reduce((acc, match) => acc + match.goals_scored, 0) / playerStats.classic.length || 0).toFixed(2)),
				avg_goals_conceded: Number((playerStats.classic.reduce((acc, match) => acc + match.goals_conceded, 0) / playerStats.classic.length || 0).toFixed(2)) },
			br: {
				game_played: playerStats.br.length,
				wins: playerStats.br.filter((match) => match.is_winner).length,
				win_rate: Number((playerStats.br.filter((match) => match.is_winner).length / playerStats.br.length || 0).toFixed(2)),
				best_win_streak: getBestWinStreak(playerStats.br),
				avg_placement: Number((playerStats.br.reduce((acc, match) => acc + match.placement, 0) / playerStats.br.length || 0).toFixed(2)),
				best_placement: playerStats.br.reduce((acc, match) => Math.max(acc, match.placement), 0),
				kills: playerStats.br.reduce((acc, match) => acc + match.kills, 0),
				avg_kills: Number((playerStats.br.reduce((acc, match) => acc + match.kills, 0) / playerStats.br.length || 0).toFixed(2)),
				best_kills: playerStats.br.reduce((acc, match) => Math.max(acc, match.kills), 0) },
			io: {
				game_played: playerStats.io.length,
				wins: playerStats.io.filter((match) => match.is_winner).length,
				win_rate: Number((playerStats.io.filter((match) => match.is_winner).length / playerStats.io.length || 0).toFixed(2)),
				best_win_streak: getBestWinStreak(playerStats.io),
				avg_placement: Number((playerStats.io.reduce((acc, match) => acc + match.placement, 0) / playerStats.io.length || 0).toFixed(2)),
				best_placement: playerStats.io.reduce((acc, match) => Math.max(acc, match.placement), 0),
				kills: playerStats.io.reduce((acc, match) => acc + match.kills, 0),
				avg_kills: Number((playerStats.io.reduce((acc, match) => acc + match.kills, 0) / playerStats.io.length || 0).toFixed(2)),
				best_kills: playerStats.io.reduce((acc, match) => Math.max(acc, match.kills), 0) },
		}});
	}));

	app.get('/stats/player/:playerId/history', handleErrors(async (req, res) => {
		



	}));
}