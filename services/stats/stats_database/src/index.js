import {connect, JSONCodec} from "nats";
import statService from "./statService.js";
import handleErrors from "../../shared/handleErrors.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const jc = JSONCodec();
const nats = await connect({ servers: process.env.NATS_URL });

// nats.subscribe("stats.getPlayerStats", async (msg) => {
// 	const playerId = sc.decode(msg.data);
// 	console.log("Received request for player stats:", playerId);
// 	const playerStats = statService.getPlayerStatsClassicMode(playerId);
// 	nats.publish(msg.reply, sc.encode(JSON.stringify(playerStats)));
// });

(async () => {

	const sub = nats.subscribe("stats.getPlayerStats");
	for await (const msg of sub) {
		const playerId = jc.decode(msg.data);
		console.log("Received request for player stats:", playerId);
		// const playerStats = statService.getPlayerStatsClassicMode(playerId);
		const test = JSON.stringify(statService.test());
		console.log("users:", test);
		// nats.publish(msg.reply, sc.encode(JSON.stringify(playerStats)));
		nats.publish(msg.reply, jc.encode(test));
	}
})();
