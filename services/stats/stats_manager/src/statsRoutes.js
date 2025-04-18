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

export default async function statsRoutes(app) {

	app.get('/stats/player/:playerId', { schema: playerStatsSchema },  handleErrors(async (req, res) => {
		
		const playerId = req.params.playerId;
		
		const response = await nc.request(`stats.getPlayerStats`, jc.encode(playerId), { timeout: 1000 });

		const playerStats = jc.decode(response.data);
		console.log("Player stats:", playerStats.users.username);



		res.code(200).send({playerStats: playerStats.users.username});


	}));

	app.get('/stats/player/:playerId/history', handleErrors(async (req, res) => {
		



	}));
}