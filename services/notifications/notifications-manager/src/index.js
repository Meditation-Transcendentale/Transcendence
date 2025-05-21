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

      const subFriendRequest = nc.subscribe(`notification.${userID}.add`)

      ;(async () => {
        for await (const msg of subFriendRequest) {
          const data = jc.decode(msg.data)
          if (socket) {
            socket.send(JSON.stringify({ type: 'notification.friendrequest', data }))
          }
        }
      })()

      const subGameInvite = nc.subscribe(`notification.${userID}.invited`)

      ;(async () => {
        for await (const msg of subGameInvite) {
          const data = jc.decode(msg.data)
          if (socket) {
            socket.send(JSON.stringify({ type: 'notification.invite', data}))
          }
        }
      })
      
      const subStatusChange = nc.subscribe(`notification.${userID}.status`)
      
      ;(async () => {
        for await (const msg of subStatusChange) {
          const data = jc.decode(msg.data)
          if (socket) {
            socket.send(JSON.stringify({ type}))
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
      const userID = ws.userID
      userSockets.delete(userID)
      console.log(`[${SERVICE_NAME}] ${userID} disconnected`)
    }
  }).listen(PORT, (token) => {
    if (token) {
      console.log(`[${SERVICE_NAME}] WebSocket server running on port ${PORT}`)
    } else {
      console.error(`[${SERVICE_NAME}] Failed to listen on port ${PORT}`)
    }
  })
}

start()
