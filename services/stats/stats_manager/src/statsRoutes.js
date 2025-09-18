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
        { placement: 10, uuid: "4ef15e0f-e6f8-4e57-820c-2c291eabc585" },
        { placement: 2, uuid: "da5e5254-8370-4672-b022-f55f4f427b1d" },
        { placement: 3, uuid: "c0ef0080-66db-45ad-a0b5-46e7085944ad" },
        { placement: 4, uuid: "77402928-b8f3-4cf7-bfe7-794ca3988642" },
        { placement: 5, uuid: "6ea7ba81-4ad6-402e-953e-4de4ee3391d3" },
        { placement: 6, uuid: "f1d660d6-75fd-487a-b808-99bbbf44c833" },
        { placement: 7, uuid: "4b4b872b-6ac4-481f-8339-425e21ba9a0c" },
        { placement: 8, uuid: "51630d5b-5f2a-4e44-807a-0e61993abd28" },
        { placement: 9, uuid: "953e0f14-3359-41af-9632-ef55cb5d3e26" },
        { placement: 1, uuid: "ef884486-f1fe-4370-b317-3ae49ba4afb6" },
        { placement: 11, uuid: "af8ed3a0-049a-47a8-b0f3-b8bac469c962" },
        { placement: 12, uuid: "895c7ba7-ac4c-4464-9cd8-442389d6a302" },
        { placement: 13, uuid: "e430afb0-ac7f-4104-8e1e-528ee7101533" },
        { placement: 14, uuid: "b8f9d1df-0807-44e7-af0b-017bff750311" },
        { placement: 15, uuid: "92daf4f7-2135-46d1-b417-857b7e52c021" },
        { placement: 16, uuid: "9ffdc5a8-75e0-4165-8f32-6da50d505782" },
        { placement: 17, uuid: "3c273117-be18-4f70-a127-a2e632bcee94" },
        { placement: 18, uuid: "a097e800-ac72-4b6f-a992-a22de8a44dd8" },
        { placement: 19, uuid: "b74492e5-dcb0-4c31-87e2-51d9bfe477af" },
        { placement: 20, uuid: "40357108-b64d-4881-897d-bad9185c5797" } 
    ];

    const testClassic = { 
        winner: "4ef15e0f-e6f8-4e57-820c-2c291eabc585",
        looser: "b8f9d1df-0807-44e7-af0b-017bff750311",
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
