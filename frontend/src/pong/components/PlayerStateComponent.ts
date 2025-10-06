import { Component } from "../ecs/Component.js";

export enum PlayerStatus {
    ALIVE = "alive",
    DEAD = "dead",
    DISCONNECTED = "disconnected"
}

export class PlayerStateComponent implements Component {
    public status: PlayerStatus;
    constructor(status: PlayerStatus = PlayerStatus.ALIVE) {
        this.status = status;
    }
}
