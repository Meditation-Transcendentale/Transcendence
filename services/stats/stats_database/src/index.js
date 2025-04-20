import {connect, JSONCodec} from "nats";
import statService from "./statService.js";
import { handleErrorsNats } from "../../shared/handleErrors.mjs";
import { handleErrorsNats } from "../../shared/handleErrors.mjs";
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

(handleErrorsNats(async () => {

	const sub = nats.subscribe("stats.getPlayerStats");
	for await (const msg of sub) {
		try {
			const playerId = jc.decode(msg.data);
			statService.isUserIdExisting(playerId);
			const playerStats = {
				classic: statService.getPlayerStatsClassicMode(playerId),
				br: statService.getPlayerStatsBRMode(playerId),
				io: statService.getPlayerStatsIOMode(playerId)
			};
			nats.publish(msg.reply, jc.encode({ success: true, data: playerStats }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}
	
}))();
