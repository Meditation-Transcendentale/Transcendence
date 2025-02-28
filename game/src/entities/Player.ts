import { Scene, Vector3, TransformNode, AxesViewer } from "@babylonjs/core";
import { Paddle } from "./Paddle";
import { CollisionComponent } from "./CollisionComponent";

export class Player {
	private paddle: Paddle;
	private angle: number;
	private position: Vector3;
	private collision: CollisionComponent;
	private isPlayer: boolean;
	private playerNode: TransformNode;


	constructor(scene: Scene, position: Vector3, angle: number, isPlayer: boolean, i: number) {
		this.playerNode = new TransformNode("playernode" + i, scene);
		this.position = position;
		this.angle = angle;
		this.isPlayer = isPlayer;
		this.paddle = new Paddle(scene, position, angle, this.playerNode);
		this.collision = new CollisionComponent(scene, position, this.paddle.getMesh(), angle, this.playerNode);
		this.playerNode.setPivotPoint(position);
		this.playerNode.rotation.y -= (angle + 90) * Math.PI / 180;
		//console.log("rota=" + this.playerNode.rotation.y + "angle=" + (angle + Math.PI / 2) + " i=" + i);
	}

	public move(x: number): void {
		this.paddle.move(x);
	}

	public getPaddle() {
		return this.paddle.getMesh();
	}
}
