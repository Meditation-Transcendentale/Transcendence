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
	private endUITexture: AdvancedDynamicTexture | null = null;
	private scoreUITexture: AdvancedDynamicTexture | null = null;

	private scoreTextBlock: TextBlock | null = null;
	private endUIPanel: Rectangle | null = null;
	private endUITitle: TextBlock | null = null;
	private endUIButton: Button | null = null;

	constructor(pong: Pong) {
		super();
		this.pong = pong;
		this.scoreValue = new Vector2(0, 0);
		this.scoreUI = this.gameScoreUI();
	}

	update(entities: Entity[], deltaTime: number): void {
		const now = performance.now();
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
					setTimeout(() => {
						this.endUI = this.gameEndUI(ui.score.x > ui.score.y, ui.gameMode);
					}, 100);
				}
			}
		});
	}

	gameScoreUI() {
		if (!this.scoreUITexture) {
			this.scoreUITexture = AdvancedDynamicTexture.CreateFullscreenUI("ScoreUI");

			this.scoreTextBlock = new TextBlock("score");
			this.scoreTextBlock.text = `${this.scoreValue.x} : ${this.scoreValue.y}`;
			this.scoreTextBlock.color = "#ffffff";
			this.scoreTextBlock.fontSize = 75;
			this.scoreTextBlock.fontFamily = "monospace";
			this.scoreTextBlock.outlineWidth = 0;
			this.scoreTextBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
			this.scoreTextBlock.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
			this.scoreTextBlock.top = "90px";

			this.scoreUITexture.addControl(this.scoreTextBlock);
		}

		return {
			update: () => {
				if (this.scoreTextBlock) {
					this.scoreTextBlock.text = `${this.scoreValue.x} : ${this.scoreValue.y}`;
				}
			},
			dispose: () => {
				if (this.scoreUITexture) {
					this.scoreUITexture.dispose();
					this.scoreUITexture = null;
					this.scoreTextBlock = null;
				}
			}
		}
	}

	gameEndUI(playerWin: boolean, gameMode: string) {
		if (!this.endUITexture) {
			this.endUITexture = AdvancedDynamicTexture.CreateFullscreenUI("EndUI");

			this.endUIPanel = new Rectangle();
			this.endUIPanel.width = "100%";
			this.endUIPanel.height = "10%";
			this.endUIPanel.cornerRadius = 4;
			this.endUIPanel.thickness = 0;
			this.endUIPanel.background = "#7f7f7f33";
			this.endUIPanel.isPointerBlocker = false;
			this.endUIPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
			this.endUIPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
			this.endUITexture.addControl(this.endUIPanel);

			this.endUITitle = new TextBlock();
			this.endUITitle.fontSize = 50;
			this.endUITitle.fontFamily = "Segoe UI";
			this.endUITitle.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
			this.endUITitle.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
			this.endUIPanel.addControl(this.endUITitle);

			this.endUIButton = Button.CreateSimpleButton("quit", "Exit");
			this.endUIButton.width = "150px";
			this.endUIButton.height = "40px";
			this.endUIButton.color = "white";
			this.endUIButton.background = "red";
			this.endUIButton.cornerRadius = 10;
			this.endUIButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
			this.endUIButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
			this.endUIButton.top = "-20px";

			this.endUIButton.onPointerUpObservable.add(() => {
				this.pong.stop();
			});
			this.endUITexture.addControl(this.endUIButton);
		}

		if (this.endUITitle) {
			if (gameMode === "local") {
				this.endUITitle.text = playerWin ? "Player 1 Won!" : "Player 2 Won!";
			} else {
				this.endUITitle.text = playerWin ? "You Won!" : "You Lost!";
			}
			this.endUITitle.color = playerWin ? "#7CFC00" : "#FF4C4C";
		}

		this.showEndUI();

		return {
			dispose: () => {
				this.hideEndUI();
			}
		};
	}

	public enableUI() {
		if (this.scoreUITexture) {
			try {
				if (this.scoreUITexture.layer && 'isEnabled' in this.scoreUITexture.layer) {
					this.scoreUITexture.layer.isEnabled = true;
				} else {
					if (this.scoreTextBlock) {
						this.scoreTextBlock.isVisible = true;
					}
				}
			} catch (e) {
				if (this.scoreTextBlock) {
					this.scoreTextBlock.isVisible = true;
				}
			}
		}
	}

	public disableUI() {
		if (this.scoreUITexture) {
			try {
				if (this.scoreUITexture.layer && 'isEnabled' in this.scoreUITexture.layer) {
					this.scoreUITexture.layer.isEnabled = false;
				} else {
					if (this.scoreTextBlock) {
						this.scoreTextBlock.isVisible = false;
					}
				}
			} catch (e) {
				if (this.scoreTextBlock) {
					this.scoreTextBlock.isVisible = false;
				}
			}
		}

		this.hideEndUI();
	}

	public showEndUI() {
		if (this.endUITexture) {
			try {
				if (this.endUITexture.layer && 'isEnabled' in this.endUITexture.layer) {
					this.endUITexture.layer.isEnabled = true;
				} else {
					// Use individual control visibility
					if (this.endUIPanel) this.endUIPanel.isVisible = true;
					if (this.endUITitle) this.endUITitle.isVisible = true;
					if (this.endUIButton) this.endUIButton.isVisible = true;
				}
			} catch (e) {
				// Fallback to individual control visibility
				if (this.endUIPanel) this.endUIPanel.isVisible = true;
				if (this.endUITitle) this.endUITitle.isVisible = true;
				if (this.endUIButton) this.endUIButton.isVisible = true;
			}
		}
	}

	public hideEndUI() {
		if (this.endUITexture) {
			try {
				if (this.endUITexture.layer && 'isEnabled' in this.endUITexture.layer) {
					this.endUITexture.layer.isEnabled = false;
				} else {
					if (this.endUIPanel) this.endUIPanel.isVisible = false;
					if (this.endUITitle) this.endUITitle.isVisible = false;
					if (this.endUIButton) this.endUIButton.isVisible = false;
				}
			} catch (e) {
				if (this.endUIPanel) this.endUIPanel.isVisible = false;
				if (this.endUITitle) this.endUITitle.isVisible = false;
				if (this.endUIButton) this.endUIButton.isVisible = false;
			}
		}
	}

	public resetUI() {
		this.gameEnded = false;
		this.scoreValue.set(0, 0);

		this.scoreUI.update();

		this.hideEndUI();
		this.enableUI();
	}

}
