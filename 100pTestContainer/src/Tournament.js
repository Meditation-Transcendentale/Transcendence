import {
  decodeServerMessage,
  decodeTournamentServerMessage,
  encodeTournamentClientMessage,
} from "./proto/helper.js";
import { tournament } from "./proto/message.js";

export async function startGameTournament(user) {
  const uuid = user.uuid;
  const gameId = user.gameId;
  const url =
    `wss://localhost:7000/game?` +
    `uuid=${encodeURIComponent(uuid)}&` +
    `gameId=${encodeURIComponent(gameId)}`;
  console.log(`${user.uuid}: gameId:${gameId}`);
  const ws = new Websocket(url, { rejectUnauthorized: false });
  ws.binaryType = "arraybuffer";

  return new Promise((resolve) => {
    ws.onmessage = async (msg) => {
      const buf = new Uint8Array(msg.data);
      const payload = decodeServerMessage(buf);
      if (payload.end) {
        user.gameId(null);
        ws.close();
        resolve();
        return;
      }
    };
  });
}

export async function settingUpTournament(user) {
  const uuid = user.uuid;
  const tournamentId = user.tournamentId;
  console.log(`${uuid}|${tournamentId}`);

  const url = `wss://localhost:7000/sacrifice?uuid=${encodeURIComponent(
    uuid.toString()
  )}&tournamentId=${encodeURIComponent(tournamentId.toString())}`;

  console.log(`url:${url}`);
  const ws = new WebSocket(url, { rejectUnauthorized: false });
  ws.binaryType = "arraybuffer";
  setTimeout(() => {}, 1000);
  ws.onopen = (e) => {
  };
  ws.onclose = () => {};
  ws.onerror = (e) => {
    console.error("❌ WebSocket error occurred");
    console.error("Error event:", e);
    console.error("WebSocket readyState:", ws.readyState);
    console.error("WebSocket url:", ws.url);
  };

  return new Promise((resolve) => {
    ws.onmessage = (msg) => {
      const buf = new Uint8Array(msg.data);
      const payload = decodeTournamentServerMessage(new Uint8Array(buf));

      if (payload.readyCheck) {
        const readyBuf = encodeTournamentClientMessage({ ready: {} });
        ws.send(readyBuf);
      }
      if (payload.startGame) {
        const gameId = payload.startGame.gameId;
        user.setGameId(gameId);
        console.log(`GAME ID: ${user.gameId}`);
        ws.close();
        resolve();
      }
    };
  });
}
