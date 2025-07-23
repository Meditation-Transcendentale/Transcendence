import { Scene, Vector3, TransformNode, } from "@babylonjs/core";
import { Paddle } from "./Paddle";
import { CollisionComponent } from "./CollisionComponent";
import Client from "../core/Client";

export class Player {
    uid!: string;
    paddle: Paddle;
    angle: number;
    position: Vector3;
    collision: CollisionComponent;
    isPlayer: boolean;
    isSet: boolean;
    playerNode: TransformNode;


    constructor(scene: Scene, position: Vector3, angle: number, isPlayer: boolean, i: number, radius: number) {
        this.playerNode = new TransformNode("playernode" + i, scene);
        this.position = position;
        this.isSet = false;
        this.angle = angle;
        this.isPlayer = isPlayer;
        this.paddle = new Paddle(scene, position, angle, radius);
        this.collision = new CollisionComponent(scene, position, angle, this.playerNode);
        this.playerNode.setPivotPoint(position);
        this.playerNode.rotation.y -= (angle + 90) * Math.PI / 180;
    }


    public setUid(uid: string): void {
        this.uid = uid;
    }

    public move(x: number, client: Client): void {
        this.paddle.move(x, client);
    }

    //public getPaddle() {
    //	return this.paddle.getMesh();
    //}
    //
    public updateState(pos: Vector3, rota: number) {
        this.paddle.updateState(pos, rota);
    }
}
