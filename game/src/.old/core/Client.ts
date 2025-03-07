import { Scene, Vector3, StandardMaterial, MeshBuilder } from "@babylonjs/core";
import { Player } from "../entities/Player";
import { Ball } from "../entities/Ball";

export default class Client {
    socket!: WebSocket;
    player!: { [key: number]: Player };
    balls!: { [key: number]: Ball }; // Add ball storage
    walls!: { [key: number]: any };
    scene: Scene;
    myid: number = -1;
    material: StandardMaterial; // Material for balls

    constructor(scene: Scene, player: { [key: number]: Player }) {
        this.scene = scene;
        this.player = player;
        this.balls = {};

        this.material = new StandardMaterial("ballMaterial", this.scene);
        this.material.diffuseColor.set(1, 1, 1);
        this.walls = {};

        this.material = new StandardMaterial("wallMaterial", this.scene);
        this.material.diffuseColor.set(1, 0, 0);
        this.connect();
    }

    connect() {
        this.socket = new WebSocket("ws://10.12.12.4:8080");

        this.socket.onopen = () => {
            console.log("Connected to server");
        };

        this.socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };

        this.socket.onclose = () => {
            console.log("Disconnected from server");
        };

        this.socket.onerror = (err) => {
            console.error("Socket error:", err);
        };
    }

    handleMessage(data: any) {
        switch (data.type) {
            case "init":
                this.handleInit(data);
                break;
            case "update":
                this.handleUpdate(data);
                break;
            case "error":
                console.error("Server error:", data.message);
                break;
            default:
                console.warn("Unknown message type:", data.type);
        }
    }

    handleInit(data: { id: number }) {
        console.log("Received init for id:", data.id);
        this.myid = data.id;
        const id = data.id;

        if (!this.player[id].isSet) {
            this.player[id].isSet = true;
            console.log("id " + id + " set to true");
        }
    }

    getBalls() {
        return this.balls; // Allow SceneManager to access balls
    }

    handleUpdate(data: { state: { players?: { [id: number]: any }, balls?: any[], walls?: { [id: number]: boolean } } }) {
        // Update players
        if (data.state.players) {
            for (const id in data.state.players) {
                if (!this.player[id].isSet) {
                    this.player[id].isSet = true;
                }
                const player = this.player[id];
                if (player) {
                    const serverState = data.state.players[id];

                    //console.log("posx =", serverState.position.x, "posy =", serverState.position.z);

                    player.updateState(
                        new Vector3(serverState.position.x, 0.5, serverState.position.z),
                        serverState.rotation
                    );
                }
            }
        }
        // Update balls
        if (data.state.balls) {
            for (const ball of data.state.balls) {
                if (!this.balls[ball.id]) {
                    this.balls[ball.id] = new Ball(this.scene, new Vector3(ball.x, 0.5, ball.y));
                }
                this.balls[ball.id].updatePosition(ball.x, ball.y, ball.vx, ball.vy);
            }
        }
        if (data.state.walls) {
            for (const id in data.state.walls) {
                const isWallActive = data.state.walls[id];

                if (isWallActive) {
                    if (!this.walls[id]) {
                        this.walls[id] = MeshBuilder.CreateBox(`wall_${id}`, { width: 10, height: 1, depth: 0.2 }, this.scene);
                        this.walls[id].position = this.player[id].position;
                        this.walls[id].rotation = this.player[id].playerNode.rotation;
                        this.walls[id].material = this.material;
                    }
                } else {
                    if (this.walls[id]) {
                        this.walls[id].dispose();
                        delete this.walls[id];
                    }
                }
            }
        }
    }

    sendMove(position: Vector3, rotation: number) {
        if (!this.myid) return;
        const message = {
            type: "move",
            id: this.myid,
            position: { x: position.x, y: position.y, z: position.z },
            rotation: rotation,
        };
        this.socket.send(JSON.stringify(message));
    }

    getMyId(): number {
        return this.myid;
    }
}
//import { Scene, Vector3 } from "@babylonjs/core";
//import { Player } from "../entities/Player";
//
//export default class Client {
//	socket!: WebSocket;
//	player!: { [key: number]: Player };
//	scene: Scene;
//	myid: number = -1;
//
//	constructor(scene: Scene, player: { [key: number]: Player }) {
//		this.scene = scene;
//		this.player = player;
//		this.connect();
//	}
//
//	connect() {
//		this.socket = new WebSocket("ws://10.12.12.4:8080");
//
//		this.socket.onopen = () => {
//			console.log("Connected to server");
//		};
//
//		this.socket.onmessage = (event: MessageEvent) => {
//			const data = JSON.parse(event.data);
//			this.handleMessage(data);
//		};
//
//		this.socket.onclose = () => {
//			console.log("Disconnected from server");
//		};
//
//		this.socket.onerror = (err) => {
//			console.error("Socket error:", err);
//		};
//	}
//
//	handleMessage(data: any) {
//		switch (data.type) {
//			case "init":
//				this.handleInit(data);
//				break;
//			case "update":
//				this.handleUpdate(data);
//				break;
//			case "error":
//				console.error("Server error:", data.message);
//				break;
//			default:
//				console.warn("Unknown message type:", data.type);
//		}
//	}
//
//	handleInit(data: { id: number }) {
//		console.log("Received init for id:", data.id);
//		this.myid = data.id;
//		const id = data.id;
//		if (this.player[id].isSet == false) {
//			this.player[id].isSet = true;
//			console.log("id " + id + " set to true");
//			//this.player[id].uid = this.myUid;
//		}
//	}
//
//	handleUpdate(data: { state: { [id: number]: any } }) {
//		// Data is in the form: { type: 'update', state: { uid: { paddle: { position, rotation } }, ... } }
//		const state = data.state;
//		for (const id in state) {
//			if (this.player[id].isSet == false) {
//				this.player[id].isSet = true;
//			}
//			const player = this.player[id];
//			if (player) {
//				player.updateState(state[id]);
//			}
//		}
//	}
//
//	sendMove(position: Vector3, rotation: number) {
//		if (!this.myid) return;
//		const message = {
//			type: "move",
//			id: this.myid,
//			position: { x: position.x, y: position.y, z: position.z },
//			rotation: rotation,
//		};
//		this.socket.send(JSON.stringify(message));
//	}
//	getMyId(): number {
//		return this.myid;
//	}
//}
//
