import { Vector2, AdvancedDynamicTexture, TextBlock, Rectangle, Button, Control } from "@babylonImport";

import { Pong } from "../Pong"
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { UIComponent } from "../components/UIComponent.js";

export class UISystem extends System {
	private scoreValue: Vector2;
	public scoreUI: any;
	public endUI: any;
	private gameEnded: boolean = false;
	private pong: Pong;

	constructor(pong: Pong) {
		super();
		this.pong = pong;
		this.scoreValue = new Vector2(0, 0);
		this.scoreUI = this.gameScoreUI();
	}

	update(entities: Entity[], deltaTime: number): void {
		const now = performance.now();
		// console.log("ui: ", now);
		entities.forEach((entity: Entity) => {
			if (entity.hasComponent(UIComponent)) {
				const ui = entity.getComponent(UIComponent);
				if (!ui?.score.equals(this.scoreValue)) {
					this.scoreValue.x = ui?.score.x;
					this.scoreValue.y = ui?.score.y;
					this.scoreUI.update();
				}
				if ((ui?.score.x == 5 || ui?.score.y == 5) && !this.gameEnded) {
					this.gameEnded = true;
					this.scoreUI.dispose();
					setTimeout(() => {
						// console.log("x: ", ui.score.x, " y: ", ui.score.y);
						this.endUI = this.gameEndUI(ui.score.x > ui.score.y, ui.gameMode);
					}, 100);
				}
			}
		});
	}

	gameScoreUI() {
		const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("ScoreUI");

		const score = new TextBlock("score");
		score.text = `${this.scoreValue.x} : ${this.scoreValue.y}`;
		score.color = "#ffffff";
		score.fontSize = 75;
		score.fontFamily = "monospace";
		score.outlineWidth = 0;
		score.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		score.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		score.top = "90px";

		advancedTexture.addControl(score);

		return {
			update: () => {
				score.text = `${this.scoreValue.x} : ${this.scoreValue.y}`;
			},
			dispose: () => {
				advancedTexture.dispose();
			}
		}
	}

	gameEndUI(playerWin: boolean, gameMode: string) {
		const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("EndUI");

		const panel = new Rectangle();
		panel.width = "100%";
		panel.height = "10%";
		panel.cornerRadius = 4;
		panel.thickness = 0;
		panel.background = "#7f7f7f33";
		panel.isPointerBlocker = false;
		panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		advancedTexture.addControl(panel);

		console.log(playerWin);

		const title = new TextBlock();
		if (gameMode === "local")
			title.text = playerWin ? "PLayer 1 Won!" : "Player 2 Won!";
		else
			title.text = playerWin ? "You Won!" : "You Lost!";
		title.color = playerWin ? "#7CFC00" : "#FF4C4C";
		title.fontSize = 50;
		title.fontFamily = "Segoe UI";
		title.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		title.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		panel.addControl(title);

		const quitButton = Button.CreateSimpleButton("quit", "Exit");
		quitButton.width = "150px";
		quitButton.height = "40px";
		quitButton.color = "white";
		quitButton.background = "red";
		quitButton.cornerRadius = 10;
		quitButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		quitButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
		quitButton.top = "-20px";

		quitButton.onPointerUpObservable.add(() => {
			advancedTexture.dispose();
			this.endUI.dispose();
			this.pong.dispose();
		});
		advancedTexture.addControl(quitButton);

		return {
			dispose: () => {
				advancedTexture.dispose();
			}
		};
	}
}
