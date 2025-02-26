const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

let ball = { x: 0, y: 0, vx: 0.1, vy: 0.1 }; // Ball position & velocity
let paddles = {
	player1: { x: 0, y: -9.5, width: 2, height: 0.5 },
	player2: { x: 0, y: 9.5, width: 2, height: 0.5 },
};
let scores = { player1: 0, player2: 0 };

let playerCenterToBall = { x: 0, y: 0 };
let hit = 0;
let velocity = { x: 0.1, y: 0.1 };
let players = {};

server.on("connection", (socket) => {
	console.log("A player connected");

	const playerId = Object.keys(players).length < 1 ? "player1" : "player2";
	players[playerId] = { socket };

	socket.send(JSON.stringify({ type: "assignPlayer", playerId }));

	socket.on("message", (message) => {
		const data = JSON.parse(message);

		if (data.type === "move") {
			paddles[data.playerId].x = data.x; // Update paddle position
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
	const now = performance.now(); // Current timestamp
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
}, 1000 / 60); // **Run at 60 FPS**

function checkPaddleCollision(player) {
	const paddle = paddles[player];
	const radius = ball.radius || 0.25; // Use a variable for ball radius

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
