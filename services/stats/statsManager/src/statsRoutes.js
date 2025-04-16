import handleErrors from "./handleErrors.js";
import { statusCode, returnMessages } from "./returnValues.js";

const playerStatsSchema = {
	params: {
		type: 'object',
		properties: {
			playerId: { type: 'string' }
		},
		required: ['playerId'],
	},
	query : {
		type: 'object',
		properties: {
			mode: { type: 'string' },
		},
		required: ['mode']
	}
};

export default async function statsRoutes(app) {

	app.get('stats/player/:playerId', { schema: playerStatsSchema },  handleErrors(async (req, res) => {
		
		const playerId = req.params.playerId;
		const mode = req.query.mode;
		






	}));

	app.get('stats/player/:playerId/history', handleErrors(async (req, res) => {
		



	}));
}