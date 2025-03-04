import Ball from "./Ball.js";
import SpatialGrid from "./SpatialGrid.js";

export default class Game {
    constructor(maxPlayers = 100, numBalls = 5, arenaRadius = 15) {
        this.players = new Map();
        this.balls = [];
        this.maxPlayers = maxPlayers;
        this.grid = new SpatialGrid(2);
        this.walls = new Map();
        const numPlayers = 100;
        const playerWidth = 10;
        const centralAngleDeg = 360 / numPlayers;
        const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;

        const radius = playerWidth / (2 * Math.sin(halfCentralAngleRad));
        this.arenaRadius = radius;
        console.log("radius =" + radius);
        for (let i = 0; i < numBalls; i++) {
            this.balls.push(new Ball(i, this.arenaRadius, this.grid));
        }
        for (let i = 0; i <= this.maxPlayers - 1; i++) {
            this.walls.set(i, true);
        }
    }

    getSize() {
        return this.players.size;
    }

    addPlayer(player) {
        if (this.players.size < this.maxPlayers) {
            this.players.set(player.id, player);
            this.walls.set(player.id, false);
            return true;
        }
        return false;
    }

    removePlayer(id) {
        this.players.delete(id);
        this.walls.set(id, true);
    }

    update(deltaTime) {
        this.players.forEach(player => player.update(deltaTime));

        this.balls.forEach(ball => ball.update(deltaTime));
    }

    updateState(newPosition, newRotation, i) {
        let player = this.players.get(i);
        if (player) {
            player.updateState(newPosition, newRotation);
        }
    }

    getDeltaSnapshot() {
        const snapshot = {
            players: {},
            balls: [],
            walls: []
        };

        this.players.forEach((player, id) => {
            if (player.dirty) {
                snapshot.players[id] = {
                    paddle: {
                        position: player.paddle.position,
                        rotation: player.paddle.rotation
                    }
                };
                player.clearDirty();
            }
        });

        this.balls.forEach(ball => {
            snapshot.balls.push({
                id: ball.id,
                x: ball.position.x,
                y: ball.position.y,
                vx: ball.velocity.x,
                vy: ball.velocity.y
            });
        });

        this.walls.forEach((isWallActive, id) => {
            snapshot.walls[id] = isWallActive;
        });

        return snapshot;
    }
}

//import Player from "./Player.js";
//
//export default class Game {
//    players = new Map();
//    maxPlayers;
//
//    constructor(maxPlayers = 100) {
//        this.maxPlayers = maxPlayers;
//    }
//
//    getSize() {
//        return this.players.size;
//    }
//
//    addPlayer(player) {
//        if (this.players.size < this.maxPlayers) {
//            this.players.set(player.id, player);
//            return true;
//        }
//        return false;
//    }
//
//    removePlayer(id) {
//        this.players.delete(id);
//    }
//
//    update(deltaTime) {
//        this.players.forEach(player => {
//            player.update(deltaTime);
//        });
//    }
//
//    updateState(newPosition, newRotation, i) {
//        //this.players[i].updateState(newPosition, newRotation);
//        let player = this.players.get(i);
//        player.updateState(newPosition, newRotation);
//    }
//
//    getDeltaSnapshot() {
//        const snapshot = {};
//        this.players.forEach((player, id) => {
//            if (player.dirty) {
//                snapshot[id] = {
//                    paddle: {
//                        position: player.paddle.position,
//                        rotation: player.paddle.rotation
//                    }
//                };
//                player.clearDirty();
//            }
//        });
//        return snapshot;
//    }
//}
