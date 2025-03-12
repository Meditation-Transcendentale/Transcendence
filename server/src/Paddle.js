export class Paddle {
    constructor(id, speed) {
        this.id = id;
        this.offset = 0;
        this.speed = speed;
        this.isStatic = false;
        this.maxOffset = 2.94;
    }

    move(direction, deltaTime) {
        if (!this.isStatic) {
            this.offset += direction;
            this.offset = Math.max(-this.maxOffset, Math.min(this.offset, this.maxOffset));
            //console.log(this.offset);
        }
    }

    // Optionally add an update method if needed
    update(deltaTime) {
        // For dynamic paddles (if AI controlled or smooth interpolation)
    }
}
