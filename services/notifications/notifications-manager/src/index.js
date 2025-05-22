import dotenv from 'dotenv'
import uWS from 'uWebSockets.js'
import { connect, JSONCodec } from 'nats'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const PORT = parseInt(process.env.PORT, 10) || 3000
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222'
const SERVICE_NAME = 'notifications'
const jc = JSONCodec()

const userSockets = new Map()

async function start() {
  const nc = await connect({ servers: NATS_URL })
  console.log(`[${SERVICE_NAME}] connected to NATS`)

  uWS.App().ws('/*', {
    maxPayloadLength: 16 * 1024 * 1024,
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
      const userID = ws.uuid
      ws.userID = userID

      const wasReconnected = userSockets.has(userID)
      userSockets.set(userID, ws)

      console.log(
        `[${SERVICE_NAME}] ${userID} ${wasReconnected ? 'reconnected' : 'connected'}`
      )

      const socket = userSockets.get(userID)

      const subFriendRequest = nc.subscribe(`notification.${userID}.friendrequested`) //userID = the friend-requested user -> notificate it
      const subGameInvite = nc.subscribe(`notification.${userID}.invited`) //userID = the game-invited user -> notificate it
      const subStatusChange = nc.subscribe(`notification.${userID}.status`) //userID = the user that changed status -> notificate its friends

      ;(async () => {
        for await (const msg of subFriendRequest) {
          const data = jc.decode(msg.data)
          if (socket) {
            socket.send(JSON.stringify({ type: 'notification.friendrequest', data }))
          }
        }
      })()

      ;(async () => {
        for await (const msg of subGameInvite) {
          const data = jc.decode(msg.data)
          if (socket) {
            socket.send(JSON.stringify({ type: 'notification.invite', data }))
          }
        }
      })
      
      ;(async () => {
        for await (const msg of subStatusChange) {
          const data = jc.decode(msg.data)
          const sendingData = JSON.stringify({ type: 'notification.status', data})
          const resp = await friendlist_Request();
          if (resp.ok) {
            resp.message.friendlist.forEach(friend => {
              friendSocket = userSockets.get(friend.id)
              friendSocket.send(sendingData)     
            });
          } else {
            if (resp.status === 404) return;
            throw new Error(`[${SERVICE_NAME}] Request failed with status ${resp.status}`);
          }
        }
      })
    },

    message: (ws, message, isBinary) => { //debug purpose, nothing coming from the client
      try {
        const raw = Buffer.from(message).toString()
        const { type, data } = JSON.parse(raw)
        console.log(`[${SERVICE_NAME}] received message from ${ws.userID}:`, { type, data })
      } catch (err) {
        console.error(`[${SERVICE_NAME}] Error processing message`, err)
      }
    },

    close: (ws, code, message) => {
      userSockets.delete(ws.userID)
      console.log(`[${SERVICE_NAME}] ${ws.userID} disconnected`)
    }
  }).listen(PORT, (token) => {
    if (token) {
      console.log(`[${SERVICE_NAME}] WebSocket server running on port ${PORT}`)
    } else {
      console.error(`[${SERVICE_NAME}] Failed to listen on port ${PORT}`)
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
