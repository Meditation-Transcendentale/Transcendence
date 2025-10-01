// MAIN LOOP
import axios from "axios";
import dotenv from "dotenv";
import https from "https";
import {
  decodeLobbyServerMessage,
  decodeTournamentServerMessage,
  encodeClientMessage,
  encodeTournamentClientMessage,
} from "./proto/helper.js";
import WebSocket from "ws";
import { User } from "./User.js";
import { settingUpTournament, startGameTournament } from "./Tournament.js";
import fs from "fs";

dotenv.config({ path: "../../.env" });

const API_URL = "https://localhost:7000/api";

async function userConnectionInit(Users, nbuser, lobbyId, agent) {
  console.log(
    `[PLAYER TEST] connection ${nbuser} users for lobbyId: ${lobbyId}`
  );
  for (let i = 1; i <= nbuser; i++) {
    let username = `user${i}`;
    let password = `Password${i}`;
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: { "x-api-key": process.env.API_GATEWAY_KEY },
        httpsAgent: agent,
        withCredentials: true,
      }
    );
    const cookies = response.headers["set-cookie"];
    const user = await axios.get(`${API_URL}/info/me`, {
      headers: {
        "x-api-key": process.env.API_GATEWAY_KEY,
        Cookie: cookies ? cookies.join("; ") : "",
      },
      httpsAgent: agent,
    });

    const uuid = user.data.userInfo.uuid;
    Users.push(new User(uuid, lobbyId));
    console.log(username, "uuid:", uuid);
  }
}

async function lobbyConnectionInit(user) {
  const url = `wss://localhost:7000/lobbies?uuid=${encodeURIComponent(
    user.uuid
  )}&lobbyId=${encodeURIComponent(user.lobbyId)}`;
  const ws = new WebSocket(url, { rejectUnauthorized: false });
  ws.binaryType = "arraybuffer";

  ws.onopen = (e) => {
    setTimeout(() => {
      ws?.send(
        encodeClientMessage({ ready: { lobbyId: user.lobbyId.toString() } })
      );
    }, 1000);
  };

  ws.onclose = () => {};

  ws.onerror = (err) => {
    console.warn(err);
  };

  return new Promise((resolve) => {
    ws.onmessage = (msg) => {
      const buf = new Uint8Array(msg.data);
      const payload = decodeLobbyServerMessage(buf);
      if (payload.error != null) return;

      if (payload.start != null) {
        const gameId = payload.start.gameId;
        user.setGameId(gameId);
        ws?.close();
        resolve();
      }

      if (payload.startTournament != null) {
        const tournamentId = payload.startTournament.tournamentId;
        console.log(tournamentId);
        user.setTournamentId(tournamentId);
        console.log(`${user.uuid}:START TOURNAMENT RECEIVED=${tournamentId}`);
        ws?.close();
        // setTimeout(() => {}, 5000);
        resolve();
      }
    };
  });
}

async function main() {
  console.log(`[PLAYER TEST] started`);
  const agent = new https.Agent({
    rejectUnauthorized: false,
    // cert: fs.readFileSync(process.env.SSL_CERT),
    // key: fs.readFileSync(process.env.SSL_KEY),
  });
  const lobbyId = process.argv.slice(2, 3);
  const nbuser = process.argv.slice(3);
  console.log(lobbyId, nbuser);
  const users = [];
  await userConnectionInit(users, nbuser, lobbyId, agent);
  await Promise.all(users.map((user) => lobbyConnectionInit(user)));
  // setTimeout(() => {}, 100000);
  for (let i = 0; i < Math.log2(nbuser); i++) {
    const tournamentPromises = [];
    for (let j = 0; j < nbuser; j++) {
      tournamentPromises.push(settingUpTournament(users[j]));
    }
    await Promise.all(tournamentPromises);

    const gamePromises = [];
    for (let j = 0; j < nbuser; j++) {
      gamePromises.push(startGameTournament(users[j]));
    }
    await Promise.all(gamePromises);
  }
  console.log("The end");
}

main().catch((err) => {
  console.error(`[TEST USER] fatal error:`, err);
  process.exit(1);
});
