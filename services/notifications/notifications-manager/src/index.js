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
  console.log('[NATS] Connected to', process.env.NATS_URL);
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

      sendStatus(ws.uuid, { status: "online" });
      console.log(
        `[${SERVICE_NAME}] ${ws.uuid} ${wasReconnected ? 'reconnected' : 'connected'}`
      )
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
      sendStatus(ws.uuid, { status: "offline" });
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

  console.log('[NATS] Setting up subscription...');
  nc.subscribe(`notification.*.*`, {
    callback: (_err, msg) => {
        if (_err)
        {
          console.error (`NATS subscription error:`, _err); 
          return;
        }
        try {
      
          const [, uuid, eventType] = msg.subject.split('.');
          const data = jc.decode(msg.data);
          console.log(`Received [${eventType}] notification for ${uuid}`);
      
          if (!userSockets.has(uuid)) return;
      
          switch (eventType) {
            case `friendRequest`:
              userSockets.get(uuid).send(jc.encode({ type: `notification.friendRequest`, data}));
              break;
            case `friendAccept`:
              userSockets.get(uuid).send(jc.encode({ type: `notification.friendAccept`, data}));
              break;
            case `gameInvite`:
              userSockets.get(uuid).send(jc.encode({ type: `notification.gameInvite`, data}));
              break;
            case `status`:
              sendStatus(uuid, data);
              break;
            default:
              console.error(`Received unknown event type [${eventType}] notification for ${uuid}`);
              break;
          }
        } catch (err) {
          console.error("Failed to process notification:", err);
        }
      }
    });
  console.log('[NATS] Subscribed to notification.>');
};

async function sendStatus (senderId, sendingData) {
  const resp = await friendlist_Request();
  console.log(`sending ${Object.entries(sendingData)} to ${senderId}`);
  // if (resp.ok) {
  //   resp.message.friendlist.forEach(friend => {
  //     userSockets.get(friend.uuid).send(jc.encode({ type: `notification.status`, senderId: senderId, sendingData }));
  //   })
  // } else {
  //   if (resp.status === 404) return;
  //   throw new Error(`[${SERVICE_NAME}] Request failed with status ${resp.status}`);
  // }
}

async function friendlist_Request() {
  try {
    const response = await fetch(`https://api-gateway:3000/friends/get/friendlist`, {
      method: 'GET',
      headers: {  
        'Accept': 'application/json',
        'x-api-key': process.env.API_GATEWAY_KEY
      },
      credentials: 'include',
    });
  }
  catch (err){
    console.error(`${err}`);
  }
  // const data = await response.json();
  
  // const final = {
  //   message: data,
  //   status: response.status,
  //   ok: response.ok
  // };
  return {
    ok: true,
    status: 200,
    message: {
      friendlist: [
        { uuid: "some-uuid-1" },
        { uuid: "some-uuid-2" }
      ]
    }
  }
  // return (final);
}

start()
