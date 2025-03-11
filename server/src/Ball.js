export class Ball {
    constructor(id, x, y, vx, vy, radius) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.arenaRadius = 118;
    }

    update(deltaTime) {
        // Normalize movement (assuming 60 FPS base)
        this.x += this.vx;
        this.y += this.vy;
    }

    checkWallCollision(arenaWidth, arenaHeight, restitution) {
        this.x += this.vx;
        this.y += this.vy;
        let distanceFromCenter = Math.sqrt(this.x ** 2 + this.y ** 2);
        if (distanceFromCenter > this.arenaRadius - this.radius) {
            let angle = Math.atan2(this.y, this.x);
            this.x = (this.arenaRadius - this.radius) * Math.cos(angle);
            this.y = (this.arenaRadius - this.radius) * Math.sin(angle);

            this.vx *= -1;
            this.vy *= -1;
        }


    }
}
