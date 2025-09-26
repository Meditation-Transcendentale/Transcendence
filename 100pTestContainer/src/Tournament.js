import {
  decodeTournamentServerMessage,
  encodeTournamentClientMessage,
} from "./proto/helper";

async function startGameTournament(gameId, uuid) {
  const url =
    `wss://${window.location.hostname}:7000/game?` +
    `uuid=${encodeURIComponent(uuid)}&` +
    `gameId=${encodeURIComponent(gameId)}`;
    const ws = new Websocket(url);
    ws.binaryType = "arraybuffer";

    ws.onmessage = async (msg) => {
        const buf = new Uint8Array(msg.data);
        
    }
}

async function settingUpTournament(tournamentId, uuid) {
  for (let i = 0; i < nbPlayers; i++) {
    const url = `wss://${
      window.location.hostname
    }:5019/sacrifice?uuid=${encodeURIComponent(
      uuid
    )}&tournamentId=${encodeURIComponent(tournamentId)}`;

    const ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";

    ws.onmessage = async (msg) => {
      const buf = new Uint8Array(msg.data);
      const payload = decodeTournamentServerMessage(new Uint8Array(buf));

      if (payload.readyCheck) {
        const readyBuf = encodeTournamentClientMessage({ ready: {} });
        ws.send(readyBuf);
      }
      if (payload.startGame) {
        const gameId = payload.startGame.gameId;
        ws.close();
        await startGameTournament(gameId, uuid);
      }
    };
  }
}
