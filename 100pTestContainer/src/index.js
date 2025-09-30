// MAIN LOOP
import axios from "axios";
import dotenv from "dotenv";
import https from "https";
import {
  decodeServerMessage,
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

  ws.onmessage = (msg) => {
    const buf = new Uint8Array(msg.data);
    const payload = decodeServerMessage(buf);
    if (payload.error != null) return;

    if (payload.start != null) {
      const gameId = payload.start.gameId;
      user.setGameId(gameId);
      ws?.close();
      resolve();
    }

    if (payload.startTournament != null) {
      const tournamentId = payload.startTournament.tournamentId;
      console.log (tournamentId);
      user.setTournamentId(tournamentId);
      console.log (`START TOURNAMENT RECEIVED:${tournamentId}`)
      ws?.close();
      resolve();
    }
  };

  ws.onclose = () => { resolve(); };

  ws.onerror = (err) => {
    console.warn(err);
  };
}

async function lobbySetup(users, nbuser) {
  for (let i = 0; i < nbuser; i++) {
    lobbyConnectionInit(users[i]);
  }
}

async function gameSetup(users, nbuser) {
  for (let i = 0; i < nbuser; i++) {
    if (users[i].gameId) startGameTournament(users[i]);
  }
}

async function tournamentSetup(users, nbuser) {
  for (let i = 0; i < nbuser; i++) {
    settingUpTournament(users[i]);
  }
}

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
  await lobbySetup(users, nbuser).then(async () => {
    for (let i = 0; i < Math.log2(nbuser); i++) {
      await tournamentSetup(users, nbuser).then (async() => {
        await gameSetup(users, nbuser);
      });
    }
  });
  console.log("The end");
}

main().catch((err) => {
  console.error(`[TEST USER] fatal error:`, err);
  process.exit(1);
});
