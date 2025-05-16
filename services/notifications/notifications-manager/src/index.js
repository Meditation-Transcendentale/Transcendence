import dotenv from 'dotenv'
import { WebSocketServer } from 'ws'
import { connect, JSONCodec } from 'nats'
import { v4 as uuidv4 } from 'uuid'

dotenv.config();

const PORT = process.env.PORT || 3000
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222'
const SERVICE_NAME = 'notifications'
const jc = JSONCodec()

const userSockets = new Map()


async function start (){
    const nc = await connect({ servers: NATS_URL})
    console.log (`[${SERVICE_NAME}] connected to NATS`)

    const wss = new WebSocketServer({ port: PORT})
    console.log(`[${SERVICE_NAME}] WebSocket server running on port ${PORT}`)

    wss.on('connection', (ws, req) => {
        let userID;
        if (req && req.url) {
            const base = req.headers.host ? `http://${req.headers.host}` : `http://localhost`
            const urlObj = new URL(req.url, base)
            userID = urlObj.searchParams.get("uuid") || uuidv4()
        }

        ws.userID = userID

        if (userSockets.has(userID)){
            console.log(`[${SERVICE_NAME}] ${userID} reconnected`)
        }
            
        try {
            userSockets.set(userID, ws)
            console.log(`[${SERVICE_NAME}] ${userID} connected`)
        } catch (err) {
            console.error(`[${SERVICE_NAME}] ${userID} couldn't connect`)
        }
        
        ws.on('message', (raw) => {
            try {
                const { type, data } = JSON.parse(raw)
                console.log(`[${SERVICE_NAME}] new message`)
            } catch (err) {
                console.error(`[${SERVICE_NAME}] Error processing message`, err)
            }
        })

        ws.on('close', () => {
            console.log(`[${SERVICE_NAME}] ${userID} disconnected`)
            userSockets.delete()
        })
    })

    const sub = nc.subscribe('')
}

start()