import Paddle from "./Paddle.js";

export default class Player {
    id;
    constructor(id) {
        this.id = id;
        //this.uid = uid;
        this.paddle = new Paddle();
        this.dirty = false;
    }

    updateState(newPosition, newRotation) {
        this.paddle.update(newPosition, newRotation);
        this.dirty = true;
    }

    clearDirty() {
        this.dirty = false;
    }

    update(deltaTime) {
    }
}
