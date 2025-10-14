import {connect, JSONCodec} from "nats";
import statService from "./statService.js";
import { handleErrorsNats } from "../../shared/handleErrors.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

import { decodeMatchEnd, decodeMatchEndBr } from "./proto/helper.js";


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

function isPlayerABot(playerUUID) {
	return playerUUID.startsWith("bot-") || playerUUID.length < 35;
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
		handleNatsSubscription("stats.getPlayerHistory", async (msg) => {
			const playerId = jc.decode(msg.data);
			statService.isUserIdExisting(playerId);
			const playerHistory = statService.getPlayerHistory(playerId);
			nats.publish(msg.reply, jc.encode({ success: true, data: playerHistory }));
		}),
		handleNatsSubscription("stats.getOpponentUsername", async (msg) => {
			const { matchId, playerId } = jc.decode(msg.data);
			const opponent = statService.getOpponentUsername(matchId, playerId);
			nats.publish(msg.reply, jc.encode({ success: true, data: opponent }));
		}),
		handleNatsSubscription("stats.addBRMatchStatsInfos", async (msg) => {

			const matchInfos = decodeMatchEndBr(msg.data);

			let winnerId = null;

			if (!isPlayerABot(matchInfos.playerIds[0])) {
				const winner_uuid = matchInfos.playerIds[0];

				const winner = await nats.request('user.getUserFromUUID', jc.encode({ uuid: winner_uuid }), { timeout: 1000 });
				const winnerDecoded = jc.decode(winner.data);

				winnerId = winnerDecoded.data.id;
			}

			const matchId = statService.addMatchInfos('br', winnerId, matchInfos.playerIds.length);

			const ret = [];
			let retIndex = 0;

			for (let i = 0; i < matchInfos.playerIds.length; i++) {
				if (isPlayerABot(matchInfos.playerIds[i])) continue;

				const user = await nats.request('user.getUserFromUUID', jc.encode({ uuid: matchInfos.playerIds[i] }), { timeout: 1000 });
				const userDecoded = jc.decode(user.data);
				ret[retIndex] = {
					match_id: matchId,
					user_id: userDecoded.data.id,
					placement: i + 1,
					is_winner: (i === 0)
				};
				retIndex++;
			}

			statService.addBRMatchStatsInfos(ret);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("stats.addClassicMatchStatsInfos", async (msg) => {
			
			const matchInfos = decodeMatchEnd(msg.data);

			console.log (`${matchInfos.winnerId}|${matchInfos.loserId}|${matchInfos.score[0]}|${matchInfos.score[1]}|${matchInfos.forfeitId}`);
			const winner = await nats.request('user.getUserFromUUID', jc.encode({ uuid: matchInfos.winnerId }), { timeout: 1000 });
			const winnerDecoded = jc.decode(winner.data);

			const matchId = statService.addMatchInfos('classic', winnerDecoded.data.id, 2);

			const [score1, score2] = matchInfos.score.map(Number);

			let score;

			if (matchInfos.forfeitId === undefined || (matchInfos.forfeitId !== undefined && score1 != score2)) {
				score = { 
					winner_goals: Math.max(score1, score2),
					loser_goals: Math.min(score1, score2)
				}
			} else if (matchInfos.forfeitId !== undefined && score1 == score2) {
				score = { 
					winner_goals: score1,
					loser_goals: score2
				}
			}

			const winnerUser = {
				match_id: matchId,
				user_id: winnerDecoded.data.id,
				is_winner: true,
				goals_scored: score.winner_goals,
				goals_conceded: score.loser_goals
			}
			const loser = await nats.request('user.getUserFromUUID', jc.encode({ uuid: matchInfos.loserId }), { timeout: 1000 });
			const loserDecoded = jc.decode(loser.data);

			const loserUser = { 
				match_id: matchId,
				user_id: loserDecoded.data.id,
				is_winner: false,
				goals_scored: score.loser_goals,
				goals_conceded: score.winner_goals
			}

			statService.addClassicMatchStatsInfos(winnerUser);
			statService.addClassicMatchStatsInfos(loserUser);

			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("stats.getBrickBreakerStats", async (msg) => {
			const playerId = jc.decode(msg.data);
			statService.isUserIdExisting(playerId);
			const brickBreakerStats = statService.getBrickBreakerStats(playerId);
			nats.publish(msg.reply, jc.encode({ success: true, data: brickBreakerStats }));
		}),
		handleNatsSubscription("stats.getBrickBreakerLeaderboard", async (msg) => {
			const leaderboard = {
				easy: statService.getBrickBreakerLeaderboard_easy(),
				normal: statService.getBrickBreakerLeaderboard_normal(),
				hard: statService.getBrickBreakerLeaderboard_hard()
			};
			nats.publish(msg.reply, jc.encode({ success: true, data: leaderboard }));		
		}),
		handleNatsSubscription("stats.addBrickBreakerStats", async (msg) => {
			const { playerId } = jc.decode(msg.data);
			console.log (`Adding brickbreaker stats for playerId`);
			statService.addBrickBreakerStats(playerId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("stats.updateBrickBreakerEasyStats", async (msg) => {
			const { playerId, score } = jc.decode(msg.data);
			statService.updateBrickBreakerEasyStats(playerId, score);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("stats.updateBrickBreakerNormalStats", async (msg) => {
			const { playerId, score } = jc.decode(msg.data);
			statService.updateBrickBreakerNormalStats(playerId, score);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("stats.updateBrickBreakerHardStats", async (msg) => {
			const { playerId, score } = jc.decode(msg.data);
			statService.updateBrickBreakerHardStats(playerId, score);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("test.statsDatabase", async (msg) => {
			const result = statService.testAll();
			nats.publish(msg.reply, jc.encode({ success: true, data: result }));
		}),

	]);
})();
