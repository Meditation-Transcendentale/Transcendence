import { Scene, Vector3, TransformNode, } from "@babylonjs/core";
import { Paddle } from "./Paddle";
import { CollisionComponent } from "./CollisionComponent";

export class Player {
	uid!: string;
	paddle: Paddle;
	angle: number;
	position: Vector3;
	collision: CollisionComponent;
	isPlayer: boolean;
	isSet: boolean;
	playerNode: TransformNode;


	constructor(scene: Scene, position: Vector3, angle: number, isPlayer: boolean, i: number) {
		this.playerNode = new TransformNode("playernode" + i, scene);
		this.position = position;
		this.isSet = false;
		this.angle = angle;
		this.isPlayer = isPlayer;
		this.paddle = new Paddle(scene, position, angle, this.playerNode);
		this.collision = new CollisionComponent(scene, position, this.paddle.getMesh(), angle, this.playerNode);
		this.playerNode.setPivotPoint(position);
		this.playerNode.rotation.y -= (angle + 90) * Math.PI / 180;
	}


	public setUid(uid: string): void {
		this.uid = uid;
	}

	public move(x: number): void {
		this.paddle.move(x);
	}

	public getPaddle() {
		return this.paddle.getMesh();
	}

	public updateState(state: { paddle: { position: { x: number; y: number; z: number }; rotation: number } }) {
		const pos = state.paddle.position;
		this.getPaddle().position.set(pos.x, pos.y, pos.z);
		this.getPaddle().rotation.y = state.paddle.rotation;
	}
}
