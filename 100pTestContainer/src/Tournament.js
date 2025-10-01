import {
  decodeUserInterfaceServerMessage,
  encodeUserInterfaceClientMessage,
  decodeTournamentServerMessage,
  encodeTournamentClientMessage,
} from "./proto/helper.js";
import WebSocket from "ws";
import { userinterface } from "./proto/message.js";

export async function startGameTournament(user) {
  const url =
    `wss://localhost:7000/game?` +
    `uuid=${encodeURIComponent(user.uuid)}&` +
    `gameId=${encodeURIComponent(user.gameId)}`;
  if (!user.gameId)
    return new Promise((resolve) => {
      resolve();
    });
  console.log(`${user.uuid}: gameId:${user.gameId}`);
  const ws = new WebSocket(url, { rejectUnauthorized: false });
  ws.binaryType = "arraybuffer";

  ws.onopen = (e) => {
    setTimeout(() => {
      ws?.send(encodeUserInterfaceClientMessage({ ready: {} }));
    }, 1000);
  };

  let newMove = 1;

  return new Promise((resolve) => {
    let intervalId;
    ws.onmessage = async (msg) => {
      const buf = new Uint8Array(msg.data);
      const payload = decodeUserInterfaceServerMessage(buf);
      if (payload.end) {
        user.setGameId(null);
        ws.close();
        clearInterval(intervalId);
        console.log (`${user.uuid}|match finished`);
        resolve();
      }
      if (payload.welcome) {
        intervalId = setInterval(() => {
          const moveBuf = encodeUserInterfaceClientMessage({
            paddleUpdate: { paddleId: payload.welcome.paddleId, move: newMove },
          });
          ws?.send(moveBuf);
          newMove *= -1;
        }, 500);
      }
    };
  });
}

export async function settingUpTournament(user) {
  console.log(`${user.uuid}|${user.tournamentId}`);
  const url = `wss://localhost:7000/sacrifice?uuid=${encodeURIComponent(
    user.uuid
  )}&tournamentId=${encodeURIComponent(user.tournamentId)}`;

  const ws = new WebSocket(url, { rejectUnauthorized: false });
  ws.binaryType = "arraybuffer";

  return new Promise((resolve) => {
    ws.onmessage = (msg) => {
      const buf = new Uint8Array(msg.data);
      const payload = decodeTournamentServerMessage(new Uint8Array(buf));

      if (payload.readyCheck) {
        setTimeout(() => {
          const readyBuf = encodeTournamentClientMessage({ ready: {} });
          ws.send(readyBuf);
        }, 2000);
      }
      if (payload.startGame) {
        const gameId = payload.startGame.gameId;
        user.setGameId(gameId);
        console.log(`${user.uuid}|GAME ID: ${user.gameId}`);
        ws.close();
        resolve();
      }
    };
    setTimeout(() => {
      resolve();
    }, 10000);
  });
}
