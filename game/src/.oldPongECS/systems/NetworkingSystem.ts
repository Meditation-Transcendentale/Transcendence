import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { WebSocketManager } from "../network/WebSocketManager.js";

export class NetworkingSystem extends System {
    private wsManager: WebSocketManager;

    constructor(wsManager: WebSocketManager) {
        super();
        this.wsManager = wsManager;
    }

    update(entities: Entity[], deltaTime: number): void {
        const messages = this.wsManager.getMessages();
        messages.forEach(msg => {
            if (msg.type === "updateBall") {
                const entity = entities.find(e => e.id === msg.ballId);
                if (entity && entity.hasComponent(BallComponent)) {
                    const ball = entity.getComponent(BallComponent)!;
                    ball.position.copyFrom(msg.position);
                    ball.velocity.copyFrom(msg.velocity);
                }
            }
        });
    }
}
