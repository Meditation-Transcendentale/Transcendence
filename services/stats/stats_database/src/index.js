import {connect, JSONCodec} from "nats";
import statService from "./statService.js";
import { handleErrorsNats } from "../../shared/handleErrors.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const jc = JSONCodec();
const nats = await connect({ 
	servers: process.env.NATS_URL,
	token: process.env.NATS_TOKEN,
	tls: { rejectUnauthorized: false }
});

async function handleNatsSubscription(subject, handler) {
	const sub = nats.subscribe(subject);
	for await (const msg of sub) {
		try {
			await handler(msg);
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			const code = error.code || 500;
			nats.publish(msg.reply, jc.encode({ success: false, status, message, code }));
		}
	}
}

handleErrorsNats(async () => {
	await Promise.all([
		handleNatsSubscription("stats.getPlayerStats.classic", async (msg) => {
			const playerId = jc.decode(msg.data);
			statService.isUserIdExisting(playerId);
			const playerStats = statService.getPlayerStatsClassicMode(playerId);
			nats.publish(msg.reply, jc.encode({ success: true, data: playerStats }));
		}),
		handleNatsSubscription("stats.getPlayerStats.br", async (msg) => {
			const playerId = jc.decode(msg.data);
			statService.isUserIdExisting(playerId);
			const playerStats = statService.getPlayerStatsBRMode(playerId);
			nats.publish(msg.reply, jc.encode({ success: true, data: playerStats }));
		}),
		handleNatsSubscription("stats.getPlayerStats.io", async (msg) => {
			const playerId = jc.decode(msg.data);
			statService.isUserIdExisting(playerId);
			const playerStats = statService.getPlayerStatsIOMode(playerId);
			nats.publish(msg.reply, jc.encode({ success: true, data: playerStats }));
		})
	]);
})();





// (handleErrorsNats(async () => {

// 	const sub = nats.subscribe("stats.getPlayerStats");
// 	for await (const msg of sub) {
// 		try {
// 			const playerId = jc.decode(msg.data);
// 			statService.isUserIdExisting(playerId);
// 			const playerStats = {
// 				classic: statService.getPlayerStatsClassicMode(playerId),
// 				br: statService.getPlayerStatsBRMode(playerId),
// 				io: statService.getPlayerStatsIOMode(playerId)
// 			};
// 			nats.publish(msg.reply, jc.encode({ success: true, data: playerStats }));
// 		} catch (error) {
// 			const status = error.status || 500;
// 			const message = error.message || "Internal Server Error";
// 			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
// 		}
// 	}
// }))();
