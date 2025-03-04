export default class Paddle {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = 0;
    }

    update(newPosition, newRotation) {
        this.position = newPosition;
        this.rotation = newRotation;
    }
}
