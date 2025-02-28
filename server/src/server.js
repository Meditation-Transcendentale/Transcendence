import WebSocket from "ws";
import { Vector } from "./Vector";
import { Player } from "./Player";

const server = new WebSocket.Server({ port: 8080 });
const player = new Map();
let ball = { x: 0, y: 0, vx: 0.1, vy: 0.1 };
let scores = { player1: 0, player2: 0 };

let playerCenterToBall = { x: 0, y: 0 };
let hit = 0;
let velocity = { x: 0.1, y: 0.1 };
let i = 0;
let players = {};

server.on("connection", (socket) => {
	console.log("A player connected");
	const playerId = i;
	i++;
	player.set(playerId, new Player(playerId, new Vector(0, 0), new Vector(0, 0)));
	players[playerId] = { socket };


	socket.send(JSON.stringify({ type: "assignPlayer", playerId }));

	socket.on("message", (message) => {
		const data = JSON.parse(message);

		if (data.type === "init") {
			player[data.playerId].init();
		}
		if (data.type === "move") {
			paddles[data.playerId].x = data.x;
		}
		if (data.type === 'ping') {
			socket.send(JSON.stringify({ type: 'pong', serverTime: performance.now() }));
		}
	});

	socket.on("close", () => {
		console.log(`${playerId} disconnected`);
		delete players[playerId];
	});
});

setInterval(() => {

	if (ball.x <= -4.65 || ball.x >= 4.65) {
		ball.vx *= -1;
	}

	ball.x += ball.vx;
	ball.y += ball.vy;

	checkPaddleCollision("player1");
	checkPaddleCollision("player2");

	if (ball.y - 0.25 < -10) {
		scores.player2 += 1;
		resetBall();
	} else if (ball.y + 0.25 > 10) {
		scores.player1 += 1;
		resetBall();
	}

	velocity.x = ball.vx;
	velocity.y = ball.vy;
	const now = performance.now();
	server.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({
				type: "update",
				timestamp: now,
				ball,
				paddles,
				scores,
			}));
		}
	});
}, 1000 / 60);

function checkPaddleCollision(player) {
	const paddle = paddles[player];
	const radius = ball.radius || 0.25;

	const closestX = Math.max(paddle.x - paddle.width / 2, Math.min(ball.x, paddle.x + paddle.width / 2));
	const closestY = Math.max(paddle.y - paddle.height / 2, Math.min(ball.y, paddle.y + paddle.height / 2));

	const distanceX = ball.x - closestX;
	const distanceY = ball.y - closestY;
	const distanceSquared = distanceX * distanceX + distanceY * distanceY;

	if (distanceSquared < radius * radius) {
		if (!hit)
			hit = 1;
		else
			hit *= 1.1;
		let s = Math.sign(ball.y);
		playerCenterToBall.x = ball.x - paddle.x;
		playerCenterToBall.y = Math.abs(ball.y) - Math.abs(paddle.y);
		const dist = Math.sqrt(playerCenterToBall.x * playerCenterToBall.x + playerCenterToBall.y * playerCenterToBall.y);
		let xx = playerCenterToBall.x / dist;
		let yy = s * playerCenterToBall.y / dist;

		ball.vx = xx * 0.16 * 1.05 * hit;// * velocity.x;
		ball.vy = yy * 0.16 * 1.05 * hit;// * velocity.y;
	}
}

function resetBall() {
	ball = {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0.15 * (Math.random() > 0.5 ? 1 : -1),
	};
	hit = 0;
}
