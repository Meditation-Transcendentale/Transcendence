import { Scene, Vector3, TransformNode } from "@babylonjs/core";
import { Paddle } from "./Paddle";
import { CollisionComponent } from "./CollisionComponent";

export class Player {
	private paddle: Paddle;
	private angle: number;
	private position: Vector3;
	private collision: CollisionComponent;
	private isPlayer: boolean;
	private playerNode: TransformNode;


	constructor(scene: Scene, position: Vector3, angle: number, isPlayer: boolean) {
		this.playerNode = new TransformNode("playernode", scene);
		this.position = position;
		this.angle = angle;
		this.isPlayer = isPlayer;
		this.paddle = new Paddle(scene, position, angle, this.playerNode);
		this.collision = new CollisionComponent(scene, position, this.paddle.getMesh(), angle, this.playerNode);
		this.playerNode.setPivotPoint(new Vector3(0, 0, 0));
		this.playerNode.rotation.y = angle + Math.PI / 2;
	}
}
