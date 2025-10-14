import dotenv from "dotenv";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { connect, JSONCodec } from "nats";
import uWS from "uWebSockets.js";
import { v4 as uuidv4 } from "uuid";
import config from "./config.js";
import client from "prom-client";
import fs from "fs";
import {
  encodeNotificationMessage,
  decodeNotificationMessage,
  decodeFriendUpdate,
  decodeStatusUpdate,
  decodeGameInvite,
  encodeGameInvite,
} from "./proto/helper.js";

dotenv.config({ path: "../../../../.env" });

const SERVICE_NAME = "notifications";

const userSockets = new Map();

async function start() {
  const jc = JSONCodec();

  const nc = await connect({
    servers: process.env.NATS_URL,
    token: process.env.NATS_TOKEN,
    tls: { rejectUnauthorized: false },
  });
  // console.log('[NATS] Connected to', process.env.NATS_URL);

  const app = Fastify({
    logger: true,
    https: {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CERT),
    },
  });
  await app.register(fastifyCors, { origin: "*" });

  client.collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.type("text/plain");
    res.send(await client.register.metrics());
  });

  await app.listen({ port: config.PORT, host: "0.0.0.0" });
  app.log.info(`HTTP API listening on ${config.PORT}`);

  const uWsApp = uWS.SSLApp({
    key_file_name: process.env.SSL_KEY,
    cert_file_name: process.env.SSL_CERT,
  });

  uWsApp
    .ws(config.WS_PATH, {
      idleTimeout: 120,

      upgrade: (res, req, context) => {
        const query = req.getQuery();
        const params = new URLSearchParams(query);
        const uuid = params.get("uuid") || uuidv4();

        res.upgrade(
          { uuid },
          req.getHeader("sec-websocket-key"),
          req.getHeader("sec-websocket-protocol") || "",
          req.getHeader("sec-websocket-extensions") || "",
          context
        );
      },
      open: async (ws) => {
        const wasReconnected = userSockets.has(ws.uuid);
        if (!wasReconnected) userSockets.set(ws.uuid, ws);

        sendStatus(ws.uuid, { sender: ws.uuid, status: "online" }, nc, jc);
        console.log(
          `[${SERVICE_NAME}] ${ws.uuid} ${
            wasReconnected ? "reconnected" : "connected"
          }`
        );
      },

      message: (ws, message, isBinary) => {
        const payload = decodeNotificationMessage(new Uint8Array(message));
        if (payload.gameInvite) {
          const data = encodeGameInvite({
            sender: ws.uuid,
            lobbyid: payload.gameInvite.lobbyid,
          });
          nc.publish(
            `notification.${payload.gameInvite.sender}.gameInvite`,
            data
          );
        }
      },

      close: (ws, code, message) => {
        sendStatus(ws.uuid, { sender: ws.uuid, status: "offline" }, nc, jc);
        userSockets.delete(ws.uuid);
        console.log(`[${SERVICE_NAME}] ${ws.uuid} disconnected`);
      },
    })
    .listen(config.WS_PORT, "0.0.0.0", (token) => {
      if (token) {
        console.log(
          `[${SERVICE_NAME}] WebSocket server running on port ${config.WS_PORT}`
        );
      } else {
        console.error(
          `[${SERVICE_NAME}] Failed to listen on port ${config.WS_PORT}`
        );
      }
    });

  console.log("[NATS] Setting up subscription...");
  nc.subscribe(`notification.*.*`, {
    callback: (_err, msg) => {
      if (_err) {
        console.error(`NATS subscription error:`, _err);
        return;
      }
      try {
        const [, uuid, eventType] = msg.subject.split(".");
        console.log(`Received [${eventType}] notification for ${uuid}`);

        if (!userSockets.has(uuid)) return;

        let data;
        switch (eventType) {
          case "status":
            data = decodeStatusUpdate(msg.data);
            sendStatus(
              uuid,
              { sender: data.sender, status: data.status, option: data.option },
              nc,
              jc
            );
            break;
          case "friendRequest":
            data = decodeFriendUpdate(msg.data);
            userSockets
              .get(uuid)
              .send(encodeNotificationMessage({ friendRequest: data }), true);
            break;
          case "friendAccept":
            data = decodeFriendUpdate(msg.data);
            userSockets
              .get(uuid)
              .send(encodeNotificationMessage({ friendAccept: data }), true);
            break;
          case "friendRemove":
            data = decodeFriendUpdate(msg.data);
            userSockets
              .get(uuid)
              .send(encodeNotificationMessage({ friendRemove: data }), true);
            break;
          case "gameInvite":
            data = decodeGameInvite(msg.data);
            userSockets
              .get(uuid)
              .send(encodeNotificationMessage({ gameInvite: data }), true);
            break;
          default:
            throw "eventType not found";
        }
      } catch (err) {
        console.error("Failed to process notification:", err);
      }
    },
  });
  console.log("[NATS] Subscribed to notification.>");
}

async function sendStatus(senderId, data, nc, jc) {
  try {
    await nc.request(
      "status.updateUserStatus",
      jc.encode({ userId: senderId, status: data.status, option: data.option })
    );
  } catch (err) {
    console.error(`[${SERVICE_NAME}] Failed to update status:`, err);
  }
  try {
    const resp = await friendlist_Request(senderId, nc, jc);

    if (!resp.ok || !resp.message) {
      console.log(
        `[${SERVICE_NAME}] No friends online to notify for ${senderId}`
      );
      return;
    }

    for (const friend of resp.message) {
      const sockets = userSockets.get(friend.friend_uuid);
      if (!sockets) continue;

      try {
        sockets.send(
          encodeNotificationMessage({
            statusUpdate: {
              sender: senderId,
              status: data.status,
              option: data.option,
            },
          }),
          true
        );
      } catch (e) {
        console.warn(
          `[${SERVICE_NAME}] Failed to send to ${friend.friend_uuid}:`,
          e
        );
      }
    }
  } catch (err) {
    if (err.status === 404) {
      console.log(
        `[${SERVICE_NAME}] No friend list found for ${senderId} — xd no friends.`
      );
    } else {
      console.error(`[${SERVICE_NAME}] Failed to send status:`, err);
    }
  }
}

async function friendlist_Request(uuid, nc, jc) {
  try {
    const userResp = await nc.request(
      "user.getUserFromUUID",
      jc.encode({ uuid })
    );
    const userResult = jc.decode(userResp.data);

    if (!userResult.success) {
      console.log("user not found");
      throw {
        status: userResult.status || 404,
        message: userResult.message || "User not found",
      };
    }
    const friendResp = await nc.request(
      "user.getFriendlist",
      jc.encode({ userId: userResult.data.id })
    );
    const friendResult = jc.decode(friendResp.data);
    if (!friendResult.success) {
      throw {
        status: friendResult.status || 404,
        message: friendResult.message || "No friends found",
      };
    }
    return {
      ok: true,
      status: 200,
      message: friendResult.data || [],
    };
  } catch (err) {
    if (err.status) {
      throw err;
    }
    console.error(
      `[${SERVICE_NAME}] Unexpected error in friendlist_Request:`,
      err
    );
    throw { status: 500, message: "Internal error while fetching friend list" };
  }
}

start();
