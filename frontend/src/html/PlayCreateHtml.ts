import { Matrix } from "../babylon";
import { createGame } from "../networking/utils";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IHtml } from "./IHtml";

export class PlayCreateHtml implements IHtml {
	private css!: HTMLLinkElement;

	private window!: HTMLDivElement;
	private info!: HTMLDivElement;
	private createPong!: HTMLDivElement;
	private createTournament!: HTMLDivElement;
	private createBrickbreaker!: HTMLDivElement;
	private createBattleroyal!: HTMLDivElement;
	private form!: HTMLFormElement;
	private mapForm!: HTMLFormElement;
	private modeForm!: HTMLFormElement;
	private sizeForm!: HTMLFormElement;
	private difficultyForm!: HTMLFormElement;
	private createButton!: HTMLInputElement;

	private gameDescriptions = ["create-pong", "create-tournament", "create-brickbreaker", "create-battleroyal"];

	private selectedMap: string = "";
	private selectedMode: string = "";
	private selectedSize: string = "";
	private selectedDifficulty: string = "";

	constructor() { }

	public init(div: HTMLElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.window = div.querySelector(".create-window") as HTMLDivElement;
		this.info = div.querySelector("#create-info") as HTMLDivElement;
		this.createPong = div.querySelector("#create-pong") as HTMLDivElement;
		this.createTournament = div.querySelector("#create-tournament") as HTMLDivElement;
		this.createBrickbreaker = div.querySelector("#create-brickbreaker") as HTMLDivElement;
		this.createBattleroyal = div.querySelector("#create-battleroyal") as HTMLDivElement;
		this.form = div.querySelector("#create-form") as HTMLFormElement;
		this.mapForm = div.querySelector(".game-form--map") as HTMLFormElement;
		this.modeForm = div.querySelector(".game-form--mode") as HTMLFormElement;
		this.sizeForm = div.querySelector("#size-form") as HTMLFormElement;
		this.difficultyForm = div.querySelector("#difficulty-form") as HTMLFormElement;
		this.createButton = div.querySelector('input[name="create"]') as HTMLInputElement;
		this.createButton.disabled = true;
		this.createButton.classList.add("game-form__input--disabled");

		sceneManager.css3dRenderer.addObject("play-create", {
			html: this.window,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * 0.15).multiply(Matrix.Translation(-2, 5, -13.25)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("play-info", {
			html: this.info,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * 0.15).multiply(Matrix.Translation(-2, 7.5, -13.25)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("create-pong", {
			html: this.createPong,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * -0.1).multiply(Matrix.Translation(-2, 5, -17.5)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("create-tournament", {
			html: this.createTournament,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * -0.1).multiply(Matrix.Translation(-2, 5, -17.5)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("create-brickbreaker", {
			html: this.createBrickbreaker,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * -0.1).multiply(Matrix.Translation(-2, 5, -17.5)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("create-battleroyal", {
			html: this.createBattleroyal,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * -0.1).multiply(Matrix.Translation(-2, 5, -17.5)),
			enable: false
		})

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name")) {
				return;
			}
			const submitter = e.submitter.getAttribute("name") as string;
			const gameMap: { [key: string]: string } = {
				"pong": "create-pong",
				"tournament": "create-tournament",
				"brick": "create-brickbreaker",
				"br": "create-battleroyal"
			};

			if (gameMap[submitter]) {
				this.toggleGameDescription(gameMap[submitter]);
			}
		});


		this.modeForm.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name")) {
				return;
			}
			const submitter = e.submitter as HTMLInputElement;
			const modeName = submitter.getAttribute("name") as string;

			if (submitter.classList.contains("game-form__input--active")) {
				submitter.classList.remove("game-form__input--active");
				this.selectedMode = "";
			} else {
				this.modeForm.querySelectorAll(".game-form__input").forEach(btn => {
					btn.classList.remove("game-form__input--active");
				});
				submitter.classList.add("game-form__input--active");
				this.selectedMode = modeName;
			}

			this.checkCreateEnabled();
		});

		this.mapForm.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name")) {
				return;
			}
			const submitter = e.submitter as HTMLInputElement;
			const mapName = submitter.getAttribute("name") as string;

			if (submitter.classList.contains("game-form__input--active")) {
				submitter.classList.remove("game-form__input--active");
				this.selectedMap = "";
			} else {
				this.mapForm.querySelectorAll(".game-form__input").forEach(btn => {
					btn.classList.remove("game-form__input--active");
				});
				submitter.classList.add("game-form__input--active");
				this.selectedMap = mapName;
			}

			this.checkCreateEnabled();
		});

		this.difficultyForm.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name")) {
				return;
			}
			const submitter = e.submitter as HTMLInputElement;
			const difficulty = submitter.getAttribute("name") as string;

			if (submitter.classList.contains("game-form__input--active")) {
				submitter.classList.remove("game-form__input--active");
				this.selectedDifficulty = "";
			} else {
				this.difficultyForm.querySelectorAll(".game-form__input").forEach(btn => {
					btn.classList.remove("game-form__input--active");
				});
				submitter.classList.add("game-form__input--active");
				this.selectedDifficulty = difficulty;
			}

			this.checkCreateEnabled();
		});

		this.sizeForm.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name")) {
				return;
			}
			const submitter = e.submitter as HTMLInputElement;
			const size = submitter.getAttribute("name") as string;

			if (submitter.classList.contains("game-form__input--active")) {
				submitter.classList.remove("game-form__input--active");
				this.selectedSize = "";
			} else {
				this.sizeForm.querySelectorAll(".game-form__input").forEach(btn => {
					btn.classList.remove("game-form__input--active");
				});
				submitter.classList.add("game-form__input--active");
				this.selectedSize = size;
			}

			this.checkCreateEnabled();
		});

		const allCreateButtons = div.querySelectorAll('input[name="create"]') as NodeListOf<HTMLInputElement>;
		allCreateButtons.forEach(button => {
			button.addEventListener("click", () => {
				console.log(`mode =${this.selectedMode}, map=${this.selectedMap}, diff=${this.selectedDifficulty}`);

				if (this.selectedMode === "br") {
					stateManager.gameMode = this.selectedMode;
					createGame();
				}
				else if (this.selectedMap && this.selectedMode) {
					stateManager.gameMap = this.selectedMap;
					stateManager.gameMode = this.selectedMode;
					createGame();
				}
				else if (this.selectedMode === "brick" && this.selectedDifficulty) {
					stateManager.gameMode = this.selectedDifficulty;
					routeManager.nav("/brick");
				}
				else if (this.selectedMode === "tournament" && this.selectedSize) {
					stateManager.gameMap = "grass";
					stateManager.gameMode = this.selectedMode;
					stateManager.tournamentSize = this.selectedSize;
					createGame();
				}
			});
		});
	}

	private toggleGameDescription(panelName: string) {
		const isCurrentlyEnabled = sceneManager.css3dRenderer.getObjectEnable(panelName);

		if (isCurrentlyEnabled) {
			sceneManager.css3dRenderer.setObjectEnable(panelName, false);
			this.resetSelections();
		} else {
			this.gameDescriptions.forEach(desc => {
				sceneManager.css3dRenderer.setObjectEnable(desc, false);
			});
			sceneManager.css3dRenderer.setObjectEnable(panelName, true);
			this.resetSelections();
			if (panelName === "create-battleroyal") {
				this.selectedMode = "br";
			}
			if (panelName === "create-brickbreaker") {
				this.selectedMode = "brick";
			}
			if (panelName === "create-tournament") {
				this.selectedMode = "tournament";
			}
		}
		this.updateCreateButton();
	}


	private checkCreateEnabled() {
		const createButton = this.getActiveCreateButton();

		if (!createButton) return;

		if ((this.selectedMap && this.selectedMode) || this.selectedDifficulty || this.selectedSize) {
			createButton.disabled = false;
			createButton.classList.remove("game-form__input--disabled");
			createButton.classList.add("game-form__input--enabled");
		} else {
			createButton.disabled = true;
			createButton.classList.add("game-form__input--disabled");
			createButton.classList.remove("game-form__input--enabled");
		}
	}

	private resetSelections() {
		this.selectedMap = "";
		this.selectedMode = "";
		this.selectedDifficulty = "";
		this.selectedSize = "";

		document.querySelectorAll(".game-form__input--active").forEach(btn => {
			btn.classList.remove("game-form__input--active");
		});

		this.updateCreateButton();
	}

	private updateCreateButton() {
		const activePanel = this.getActivePanel();
		const createButton = this.getActiveCreateButton();

		if (!createButton) return;

		let isEnabled = false;

		if (activePanel === "create-pong") {
			isEnabled = !!(this.selectedMap && this.selectedMode);
		} else if (activePanel === "create-tournament") {
			isEnabled = !!this.selectedMap;
		} else if (activePanel === "create-brickbreaker") {
			isEnabled = !!this.selectedDifficulty;
		} else if (activePanel === "create-battleroyal") {
			isEnabled = true;
		}

		if (isEnabled) {
			createButton.disabled = false;
			createButton.classList.remove("game-form__input--disabled");
			createButton.classList.add("game-form__input--enabled");
		} else {
			createButton.disabled = true;
			createButton.classList.add("game-form__input--disabled");
			createButton.classList.remove("game-form__input--enabled");
		}
	}

	private getActivePanel(): string | null {
		return this.gameDescriptions.find(desc =>
			sceneManager.css3dRenderer.getObjectEnable(desc)
		) || null;
	}

	private getActiveCreateButton(): HTMLInputElement | null {
		const activePanel = this.getActivePanel();
		if (!activePanel) return null;

		const panelElement = document.querySelector(`#${activePanel}`) as HTMLDivElement;
		return panelElement?.querySelector('input[name="create"]') as HTMLInputElement;
	}

	public load(): void {
		stateManager.gameMap = "";
		stateManager.gameMode = "";
		stateManager.gameId = "";
		document.head.appendChild(this.css);
		sceneManager.css3dRenderer.setObjectEnable("play-create", true);
		sceneManager.css3dRenderer.setObjectEnable("play-info", true);
		sceneManager.css3dRenderer.setObjectEnable("create-pong", false);
		sceneManager.css3dRenderer.setObjectEnable("create-tournament", false);
		sceneManager.css3dRenderer.setObjectEnable("create-brickbreaker", false);
		sceneManager.css3dRenderer.setObjectEnable("create-battleroyal", false);
	}

	public unload(): void {
		sceneManager.css3dRenderer.setObjectEnable("play-create", false);
		sceneManager.css3dRenderer.setObjectEnable("play-info", false);
		sceneManager.css3dRenderer.setObjectEnable("create-pong", false);
		sceneManager.css3dRenderer.setObjectEnable("create-tournament", false);
		sceneManager.css3dRenderer.setObjectEnable("create-brickbreaker", false);
		sceneManager.css3dRenderer.setObjectEnable("create-battleroyal", false);
		this.css.remove();
	}
}

