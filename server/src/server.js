//const WebSocket = require("ws");
//
//const server = new WebSocket.Server({ port: 8080 });
//
//// Game state
//let ball = { x: 0, y: 0, vx: 0.1, vy: 0.1, radius: 0.25 };
//let paddles = {
//	player1: { x: 0, y: -9.5, width: 2, height: 0.5 },
//	player2: { x: 0, y: 9.5, width: 2, height: 0.5 },
//};
//let scores = { player1: 0, player2: 0 };
//let players = {};
//
//server.on("connection", (socket) => {
//	console.log("A player connected");
//
//	const playerId = Object.keys(players).length < 1 ? "player1" : "player2";
//	players[playerId] = { socket };
//
//	socket.send(JSON.stringify({ type: "assignPlayer", playerId }));
//
//	socket.on("message", (message) => {
//		const data = JSON.parse(message);
//		if (data.type === "move") {
//			paddles[data.playerId].x = data.x;
//		}
//	});
//
//	socket.on("close", () => {
//		console.log(`${playerId} disconnected`);
//		delete players[playerId];
//	});
//});
//
//setInterval(() => {
//	if (ball.x - ball.radius <= -5 || ball.x + ball.radius >= 5) {
//		ball.vx *= -1;
//		//ball.x = Math.max(-5 + ball.radius, Math.min(ball.x, 5 - ball.radius));
//	}
//
//	ball.x += ball.vx;
//	ball.y += ball.vy;
//
//	checkPaddleCollision("player1");
//	checkPaddleCollision("player2");
//
//	if (ball.y - ball.radius < -10) {
//		scores.player2 += 1;
//		resetBall();
//	} else if (ball.y + ball.radius > 10) {
//		scores.player1 += 1;
//		resetBall();
//	}
//
//	const now = Date.now();
//	server.clients.forEach((client) => {
//		if (client.readyState === WebSocket.OPEN) {
//			client.send(JSON.stringify({
//				type: "update",
//				timestamp: now,
//				ball,
//				paddles,
//				scores,
//			}));
//		}
//	});
//}, 1000 / 60);
//
//function checkPaddleCollision(player) {
//	const paddle = paddles[player];
//	const closestX = Math.max(paddle.x - paddle.width / 2, Math.min(ball.x, paddle.x + paddle.width / 2));
//	const closestY = Math.max(paddle.y - paddle.height / 2, Math.min(ball.y, paddle.y + paddle.height / 2));
//	const distanceX = ball.x - closestX;
//	const distanceY = ball.y - closestY;
//	const distanceSquared = distanceX * distanceX + distanceY * distanceY;
//
//	if (distanceSquared < ball.radius * ball.radius) {
//		let s = Math.sign(ball.y);
//		const dist = Math.sqrt(distanceSquared) || 1;
//		ball.vx = (ball.x - paddle.x) / dist * 0.16;
//		ball.vy = s * Math.abs((ball.y - paddle.y) / dist) * 0.16;
//	}
//}
//
//function resetBall() {
//	ball = {
//		x: 0,
//		y: 0,
//		vx: 0.1 * (Math.random() > 0.5 ? 1 : -1),
//		vy: 0.15 * (Math.random() > 0.5 ? 1 : -1),
//		radius: 0.25
//	};
//}
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

// Game state
let ball = { x: 0, y: 0, vx: 0.1, vy: 0.1 }; // Ball position & velocity
let paddles = {
	player1: { x: 0, y: -9.5, width: 2, height: 0.5 },
	player2: { x: 0, y: 9.5, width: 2, height: 0.5 },
};
let scores = { player1: 0, player2: 0 };

let playerCenterToBall = { x: 0, y: 0 };
let velocity = { x: 0.1, y: 0.1 };
// Player connections
let players = {};

server.on("connection", (socket) => {
	console.log("A player connected");

	// Assign a player ID (first to connect is Player 1, second is Player 2)
	const playerId = Object.keys(players).length < 1 ? "player1" : "player2";
	players[playerId] = { socket };

	// Send player ID to the client
	socket.send(JSON.stringify({ type: "assignPlayer", playerId }));

	// Handle incoming messages from clients
	socket.on("message", (message) => {
		const data = JSON.parse(message);

		if (data.type === "move") {
			paddles[data.playerId].x = data.x; // Update paddle position
		}
	});

	socket.on("close", () => {
		console.log(`${playerId} disconnected`);
		delete players[playerId];
	});
});

// **Game loop: runs every 16ms (~60 FPS)**
setInterval(() => {
	// Move the ball

	// **Collision with left & right walls (bounce)**
	if (ball.x <= -4.65 || ball.x >= 4.65) {
		ball.vx *= -1;
	}

	ball.x += ball.vx;
	ball.y += ball.vy;

	// **Collision with paddles (better detection)**
	checkPaddleCollision("player1");
	checkPaddleCollision("player2");

	// **Scoring (if ball passes a paddle)**
	if (ball.y - 0.25 < -10) {
		scores.player2 += 1;
		resetBall();
	} else if (ball.y + 0.25 > 10) {
		scores.player1 += 1;
		resetBall();
	}

	velocity.x = ball.vx;
	velocity.y = ball.vy;
	//console.log("velocity = " + velocity.x + " " + velocity.y)
	//console.log("pos = " + ball.x + " " + ball.y)
	// **Send updated game state to all clients**
	const now = Date.now(); // Current timestamp
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

/**
 * ✅ Improved Paddle Collision Detection
 */
//function checkPaddleCollision(player) {
//	const paddle = paddles[player];
//
//	if (
//		ball.y - 0.25 <= paddle.y + paddle.height / 2 && // Ball at bottom paddle edge
//		ball.y + 0.25 >= paddle.y - paddle.height / 2 && // Ball at top paddle edge
//		ball.x + 0.25 >= paddle.x - paddle.width / 2 && // Ball inside paddle X range
//		ball.x - 0.25 <= paddle.x + paddle.width / 2
//	) {
//		ball.vy *= -1; // **Reverse ball direction (bounce)**
//		ball.vx += (ball.x - paddle.x) * 0.05; // **Add spin based on where it hits**
//	}
//}
function checkPaddleCollision(player) {
	const paddle = paddles[player];
	const radius = ball.radius || 0.25; // Use a variable for ball radius

	// Determine the closest point on the paddle to the ball
	const closestX = Math.max(paddle.x - paddle.width / 2, Math.min(ball.x, paddle.x + paddle.width / 2));
	const closestY = Math.max(paddle.y - paddle.height / 2, Math.min(ball.y, paddle.y + paddle.height / 2));

	// Calculate the distance between the ball's center and the closest point
	const distanceX = ball.x - closestX;
	const distanceY = ball.y - closestY;
	const distanceSquared = distanceX * distanceX + distanceY * distanceY;

	// Check if there is a collision
	if (distanceSquared < radius * radius) {
		// Calculate the distance (avoid division by zero
		let s = Math.sign(ball.y);
		playerCenterToBall.x = ball.x - paddle.x;
		playerCenterToBall.y = Math.abs(ball.y) - Math.abs(paddle.y);
		const dist = Math.sqrt(playerCenterToBall.x * playerCenterToBall.x + playerCenterToBall.y * playerCenterToBall.y);
		let xx = playerCenterToBall.x / dist;
		let yy = s * playerCenterToBall.y / dist;
		let Orientation = Math.atan2(playerCenterToBall.y, playerCenterToBall.x);
		//console.log("Orientation = " + Orientation);
		const distance = Math.sqrt(distanceSquared) || 1;

		// Determine the collision normal (direction vector)
		//const normalX = distanceX / distance;
		//const normalY = distanceY / distance;
		//
		// Reflect the ball's velocity using the normal vector
		//const dot = ball.vx * normalX + ball.vy * normalY;
		//ball.vx = ball.vx - 2 * dot * normalX;
		//ball.vy = ball.vy - 2 * dot * normalY;

		// Optionally, add spin based on where the ball hits the paddle
		//ball.vx += (ball.x - paddle.x) * 0.05;
		//ball.vy += (ball.y - paddle.y) * 0.05;
		ball.vx = xx * 0.16;// * velocity.x;
		ball.vy = yy * 0.16;// * velocity.y;

		// Reposition the ball to prevent it from "sticking" inside the paddle
		//const overlap = radius - distance;
		//ball.x += normalX * overlap;
		//ball.y += normalY * overlap;
	}
}
/**
 * ✅ Reset Ball After Scoring
 */

//function checkPaddleCollision(player) {
//	const paddle = paddles[player];
//	const radius = ball.radius || 0.25; // Use a variable for ball radius
//
//	// Determine the closest point on the paddle to the ball
//	const closestX = Math.max(paddle.x - paddle.width / 2, Math.min(ball.x, paddle.x + paddle.width / 2));
//	const closestY = Math.max(paddle.y - paddle.height / 2, Math.min(ball.y, paddle.y + paddle.height / 2));
//
//	// Calculate the distance between the ball's center and the closest point
//	const distanceX = ball.x - closestX;
//	const distanceY = ball.y - closestY;
//	const distanceSquared = distanceX * distanceX + distanceY * distanceY;
//
//	// Check if there is a collision
//	if (distanceSquared < radius * radius) {
//		// Calculate the distance (avoid division by zero)
//		const distance = Math.sqrt(distanceSquared) || 1;
//
//		// Determine the collision normal (direction vector)
//		const normalX = distanceX / distance;
//		const normalY = distanceY / distance;
//
//		// Reflect the ball's velocity using the normal vector
//		const dot = ball.vx * normalX + ball.vy * normalY;
//		ball.vx = ball.vx - 2 * dot * normalX;
//		ball.vy = ball.vy - 2 * dot * normalY;
//
//		// Optionally, add spin based on where the ball hits the paddle
//		ball.vx += (ball.x - paddle.x) * 0.05;
//		ball.vy += (ball.y - paddle.y) * 0.05;
//
//		// Reposition the ball to prevent it from "sticking" inside the paddle
//		const overlap = radius - distance;
//		ball.x += normalX * overlap;
//		ball.y += normalY * overlap;
//	}
//}


function resetBall() {
	ball = {
		x: 0,
		y: 0,
		//vx: 0.15 * (Math.random() > 0.5 ? 1 : -1),
		//vy: 0.15 * (Math.random() > 0.5 ? 1 : -1),
		vx: 0,
		vy: 0.15 * (Math.random() > 0.5 ? 1 : -1),
	};
}
