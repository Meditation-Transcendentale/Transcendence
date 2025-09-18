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
			{ placement: 1, uuid: "00c9948a-36be-4dd4-9034-9fa2bd5ff793" },
			{ placement: 2, uuid: "bd9480ce-cc9b-43b5-82f2-eba931d8f64c" },
			{ placement: 3, uuid: "201a4d31-1b90-4bb7-95e0-46c706c07d91" },
			{ placement: 4, uuid: "e48147c4-b5f9-42a6-8e60-815166133be7" },
			{ placement: 5, uuid: "20ea6ec7-116b-4a63-a586-697772482679" },
			{ placement: 6, uuid: "4f6a4dde-384a-4ad7-8027-89125aa43a78" },
			{ placement: 7, uuid: "f1ca5043-4ca7-4728-8163-d92ab9fb087d" },
			{ placement: 8, uuid: "7cacc128-5f2e-4e4f-a306-88921110fa01" },
			{ placement: 9, uuid: "ca477d3b-4649-41cc-9b7f-44085a17467e" },
			{ placement: 10, uuid: "a41448b4-5842-4bb2-bc80-9478cc6265c4" },
			{ placement: 11, uuid: "b28ee785-c6e2-4a07-91e9-107fedbe62f6" },
			{ placement: 12, uuid: "3e6107ec-31f8-469a-a314-f3970eb68d9b" },
			{ placement: 13, uuid: "bb6946ca-b2a0-497a-a58f-e5b8f5ed7d0b" },
			{ placement: 14, uuid: "ce642bfa-da42-4531-ad0b-e90ef72e2bfe" },
			{ placement: 15, uuid: "7140c40a-7587-4280-8019-fc573163ecd3" },
			{ placement: 16, uuid: "7271d8fc-6bfd-4dd1-bfca-0c2686b5b19f" },
			{ placement: 17, uuid: "6809fd4f-998a-43c1-bd23-c201c05f7c83" },
			{ placement: 18, uuid: "b1737db5-fc23-4f44-887e-d1443cfd5af1" },
			{ placement: 19, uuid: "469304e8-5335-4d0c-a811-06331f24a86e" },
			{ placement: 20, uuid: "fe5f5394-11ac-4def-8696-d6d72bca10cb" }
		];

		const testClassic = { 
			winner: "00c9948a-36be-4dd4-9034-9fa2bd5ff793", 
			looser: "ce642bfa-da42-4531-ad0b-e90ef72e2bfe", 
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
