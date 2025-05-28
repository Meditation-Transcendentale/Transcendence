import dotenv from 'dotenv'
import Fastify from 'fastify'
import fastifyCors from '@fastify/cors';
import { connect, JSONCodec } from 'nats'
import uWS from 'uWebSockets.js'
import { v4 as uuidv4 } from 'uuid'
import config from './config.js';

dotenv.config({ path: "../../../../.env"})


const SERVICE_NAME = 'notifications'

const userSockets = new Map()

async function start() {
  
  const nc = await connect({ servers: process.env.NATS_URL })
  const jc = JSONCodec()
  
  const app = Fastify({ logger: true });
  await app.register(fastifyCors, { origin: '*' });
  
  await app.listen({ port: config.PORT, host: '0.0.0.0' });
	app.log.info(`HTTP API listening on ${config.PORT}`);
  

  
  
  uWS.App().ws(config.WS_PATH, {
    idleTimeout: 120,

    upgrade: (res, req, context) => {
      const query = req.getQuery()
      const params = new URLSearchParams(query)
      const uuid = params.get('uuid') || uuidv4()
      
      res.upgrade(
        { uuid },
        req.getHeader('sec-websocket-key'),
        req.getHeader('sec-websocket-protocol') || '',
        req.getHeader('sec-websocket-extensions') || '',
        context
      )
    },
    
    open: async (ws) => {
      const wasReconnected = userSockets.has(ws.uuid)
      
      if (!wasReconnected)
        userSockets.set(ws.uuid, ws);

      console.log(
        `[${SERVICE_NAME}] ${ws.uuid} ${wasReconnected ? 'reconnected' : 'connected'}`
      )
      
      const subFriendAccepted = nc.subscribe(`notification.friendaccepted.${ws.uuid}`, {
        callback: (err, msg) => {
          if (err) {
            console.error("Subscription error:", err);
            return;
          }
          try {
            const data = jc.decode(msg.data);
            if (userSockets.has(ws.uuid))
            {
              const client = userSockets.get(ws.uuid);
              client.send(jc.encode({ type: 'notification.friendaccepted', data }));
            }
          } catch (e) {
            console.error("Failed to process message:", e);
          }
        },
      });

      const subFriendRequest = nc.subscribe(`notification.friendrequest.${ws.uuid}`, {
        callback: (err, msg) => {
          if (err) {
            console.error("Subscription error:", err);
            return;
          }
          try {
            const data = jc.decode(msg.data);
            if (userSockets.has(ws.uuid))
            {
              const client = userSockets.get(ws.uuid);
              client.send(jc.encode({ type: 'notification.friendrequest', data }));
            }
          } catch (e) {
            console.error("Failed to process message:", e);
          }
        },
      });

      const subGameInvite = nc.subscribe(`notification.gameinvite.${ws.uuid}`, {
        callback: (err, msg) => {
          if (err) {
            console.error("Subscription error:", err);
            return;
          }
          try {
            const data = jc.decode(msg.data);
            if (userSockets.has(ws.uuid))
            {
              const client = userSockets.get(ws.uuid);
              client.send(jc.encode({ type: 'notification.invite', data }));
            }
          } catch (e) {
            console.error("Failed to process message:", e);
          }
        },
      });

      const subStatusUpdate = nc.subscribe(`notification.status.update.${ws.uuid}`, {
        callback: (err, msg) => {
          if (err) {
            console.error("Subscription error:", err);
            return;
          }
          try {
            const data = jc.decode(msg.data);
            console.log(`STATUS UPDATE RECEIVED ${ws.uuid} : ${Object.values(data)}`)
            if (userSockets.has(ws.uuid))
            {
              const client = userSockets.get(ws.uuid);
              client.send(jc.encode({ type: 'notification.status', data }));
            }
          } catch (e) {
            console.error("Failed to process message:", e);
          }
        },
      });

      const subStatusChange = nc.subscribe(`notification.status.change.${ws.uuid}`, {
        callback: (err, msg) => {
          if (err) {
            console.error("Subscription error:", err);
            return;
          }
          try {
            const data = jc.decode(msg.data);
            console.log(`STATUS CHANGE FROM ${ws.uuid} : ${Object.entries(data)}`)
            const sendingData = jc.encode({ senderID: ws.uuid,  status: data });
            (async () => {
              const resp = await friendlist_Request();
              if (resp.ok) {
                resp.message.friendlist.forEach(friend => {
                  console.log(`SENDING STATUS TO:${friend.uuid}|${Object.values(sendingData)}`)
                  nc.publish(`notification.status.update.${friend.uuid}`, sendingData);
                });
              } else {
                if (resp.status === 404) return;
                throw new Error(`[${SERVICE_NAME}] Request failed with status ${resp.status}`);
              }
            })();
          } catch (e) {
            console.error("Failed to process message:", e);
          }
        },
      });

      nc.publish(`notification.status.change.${ws.uuid}`, jc.encode({ status: "online" }))
    },
    
    message: (ws, message, isBinary) => { //debug purpose, nothing coming from the client
      try {
        const raw = Buffer.from(message).toString()
        const { type, data } = JSON.parse(raw)
        console.log(`[${SERVICE_NAME}] received message from ${ws.uuid}:`, { type, data })
      } catch (err) {
        console.error(`[${SERVICE_NAME}] Error processing message`, err)
      }
    },

    close: (ws, code, message) => {
      nc.publish(`notification.status.change.${ws.uuid}`, jc.encode({ properties: { type: "offline" } }))
      userSockets.delete(ws.uuid)
      console.log(`[${SERVICE_NAME}] ${ws.uuid} disconnected`)
    }
  }).listen(config.WS_PORT, '0.0.0.0', (token) => {
    if (token) {
      console.log(`[${SERVICE_NAME}] WebSocket server running on port ${config.WS_PORT}`)
    } else {
      console.error(`[${SERVICE_NAME}] Failed to listen on port ${config.WS_PORT}`)
    }
  })
}

async function friendlist_Request() {
  const response = await fetch("https://localhost:3000/friends/get/friendlist", {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();
  
  const final = {
    message: data,
    status: response.status,
    ok: response.ok
  };
  return final;
}

start()
