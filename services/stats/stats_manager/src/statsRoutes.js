import { handleErrors } from "../../shared/handleErrors.mjs";
import { statusCode } from "../../shared/returnValues.mjs";
import { nats, jc } from "./index.js";

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

	app.get('/player/:username/:mode', handleErrors(async (req, res) => {

		const { username, mode } = req.params;

		const user = await nats.request('user.getUserFromUsername', jc.encode({ username }), { timeout: 1000 });
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
				['stats']: calculateStats(playerStats, mode),
				[`history`]: playerStats
			}
		});
	}));

	app.get('/health', (req, res) => {
		res.status(200).send('OK');
	});

	app.post('/test', handleErrors(async (req, res) => {
		const testTab = [
			{ placement: 1, uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890" },
			{ placement: 2, uuid: "b2c3d4e5-f6g7-8901-bcde-f23456789012" },
			{ placement: 3, uuid: "c3d4e5f6-g7h8-9012-cdef-345678901234" },
			{ placement: 4, uuid: "d4e5f6g7-h8i9-0123-defg-456789012345" },
			{ placement: 5, uuid: "e5f6g7h8-i9j0-1234-efgh-567890123456" },
			{ placement: 6, uuid: "f6g7h8i9-j0k1-2345-fghi-678901234567" },
			{ placement: 7, uuid: "g7h8i9j0-k1l2-3456-ghij-789012345678" },
			{ placement: 8, uuid: "h8i9j0k1-l2m3-4567-hijk-890123456789" },
			{ placement: 9, uuid: "i9j0k1l2-m3n4-5678-ijkl-901234567890" },
			{ placement: 10, uuid: "j0k1l2m3-n4o5-6789-jklm-012345678901" },
			{ placement: 11, uuid: "k1l2m3n4-o5p6-7890-klmn-123456789012" },
			{ placement: 12, uuid: "l2m3n4o5-p6q7-8901-lmno-234567890123" },
			{ placement: 13, uuid: "m3n4o5p6-q7r8-9012-mnop-345678901234" },
			{ placement: 14, uuid: "n4o5p6q7-r8s9-0123-nopq-456789012345" },
			{ placement: 15, uuid: "o5p6q7r8-s9t0-1234-opqr-567890123456" },
			{ placement: 16, uuid: "p6q7r8s9-t0u1-2345-pqrs-678901234567" },
			{ placement: 17, uuid: "q7r8s9t0-u1v2-3456-qrst-789012345678" },
			{ placement: 18, uuid: "r8s9t0u1-v2w3-4567-rstu-890123456789" },
			{ placement: 19, uuid: "s9t0u1v2-w3x4-5678-stuv-901234567890" },
			{ placement: 20, uuid: "t0u1v2w3-x4y5-6789-tuvw-012345678901" }
		];

		const testClassic = { 
			winner: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", 
			looser: "b2c3d4e5-f6g7-8901-bcde-f23456789012", 
			score: "5-3", 
			forfait: false 
		};

		let finalData;

		if (Math.random() < 0.5) {
			finalData = testTab ;
		} else {
			finalData = testClassic;
		}


		const test = await nats.request('test.stats', jc.encode(finalData), { timeout: 1000 });
		const result = jc.decode(test.data);

		res.code(statusCode.SUCCESS).send({ message: 'success' });
	}));

	app.get('/get/test', handleErrors(async (req, res) => {

		const result = await nats.request('test.statsDatabase', jc.encode({}), { timeout: 1000 });
		const decodedResult = jc.decode(result.data);
		console.log("All Match:", decodedResult.data.allMatch);
		console.log("All Match Stats:", decodedResult.data.allMatchStats);
		res.header('Cache-Control', 'no-store');
		res.code(statusCode.SUCCESS).send({ message: 'success' });
	}));

}
