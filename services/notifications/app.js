import fastify from "fastify"
import fastifyWebsocket from "fastify-websocket"

export async function buildApp()
{
    const app = fastify();
        
    app.register(fastifyWebsocket)
    
    const userSockets = new Map()
    
    app.get('/ws', { websocket: true }, (connection, req) => {
    
        const params = new URL(req.url, `http://${req.headers.host}`).searchParams
        const userId = params.get('userId')
    
        console.log(`Client ${userId} connected`);
        if (userSockets.has(userId)) userSockets.get(userId).close();
          
        userSockets.set(userId, connection.socket);
        
        connection.socket.on('close', () => {
            console.log(`Client ${userId} disconnected`);
            userSockets.delete(userId);
        });
    });

    await app.ready()
    return app
}

