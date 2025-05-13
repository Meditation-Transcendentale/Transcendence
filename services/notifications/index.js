import fastify from "fastify"
import fastifyWebsocket from "fastify-websocket"

const app = fastify();

app.register(fastifyWebsocket)

app.get('/ws', { websocket: true }, (connection, req) => {
    
    console.log("Client connected");

    connection.socket.on('close', () => {
        console.log("Client disconnected");
    });
});

app.listen({ port: 3000 }, (err, address) => {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at: ${address}`);
});