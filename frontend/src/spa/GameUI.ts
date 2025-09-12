import { Popup } from "./Popup";

interface GameUIModules {
	score?: ScoreModule;
	timer?: TimerModule;
	buttons?: ButtonModule;
}

interface ModulePosition {
	x?: 'left' | 'center' | 'right' | number;
	y?: 'top' | 'center' | 'bottom' | number;
	anchor?: 'top-left' | 'top-center' | 'top-right' |
	'center-left' | 'center' | 'center-right' |
	'bottom-left' | 'bottom-center' | 'bottom-right';
	offset?: { x: number; y: number };
	zIndex?: number;
}

interface GameUIConfig {
	enabledModules: (keyof GameUIModules)[];
	theme?: 'pong' | 'br' | 'brick';
	globalPosition?: 'top' | 'bottom' | 'overlay';
	modulePositions?: {
		score?: ModulePosition;
		timer?: ModulePosition;
		buttons?: ModulePosition;
	};
}

interface GameUIHtmlReference {
	container: HTMLDivElement;
	scoreModule: HTMLDivElement;
	timerModule: HTMLDivElement;
	buttonModule: HTMLDivElement;
}

class GameUI {
	private div: HTMLDivElement;
	private modules: GameUIModules = {};
	private config: GameUIConfig;
	private loaded = false;
	private css: HTMLLinkElement;
	private ref: GameUIHtmlReference;

	constructor(div: HTMLDivElement, config: GameUIConfig) {
		this.div = div;
		this.config = config;
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.ref = {
			container: this.div,
			scoreModule: div.querySelector("#score-module") as HTMLDivElement,
			timerModule: div.querySelector("#timer-module") as HTMLDivElement,
			buttonModule: div.querySelector("#button-module") as HTMLDivElement
		};

		this.initializeModules();
	}

	private initializeModules() {
		this.config.enabledModules.forEach(moduleName => {
			switch (moduleName) {
				case 'score':
					this.modules.score = new ScoreModule(this.ref.scoreModule);
					break;
				case 'timer':
					this.modules.timer = new TimerModule(this.ref.timerModule);
					break;
				case 'buttons':
					this.modules.buttons = new ButtonModule(this.ref.buttonModule);
					break;
			}
		});
	}

	public load() {
		if (this.loaded) return;

		document.head.appendChild(this.css);

		this.ref.container.className += ` ${this.config.theme || 'game'}`;
		if (this.config.globalPosition) {
			this.ref.container.className += ` ${this.config.globalPosition}`;
		}

		document.body.appendChild(this.ref.container);

		this.ref.container.style.display = 'flex';

		Object.entries(this.modules).forEach(([moduleName, module]) => {
			if (module) {
				module.load();
				this.applyModulePosition(moduleName as keyof GameUIModules);
			}
		});

		this.loaded = true;
	}

	public unload() {
		if (!this.loaded) return;

		Object.values(this.modules).forEach(module => {
			module?.unload();
		});

		this.ref.container?.remove();

		this.loaded = false;
	}

	private applyModulePosition(moduleName: keyof GameUIModules) {
		const moduleElement = this.getModuleElement(moduleName);
		const position = this.config.modulePositions?.[moduleName];

		if (!moduleElement || !position) return;

		moduleElement.style.position = 'absolute';
		moduleElement.style.top = '';
		moduleElement.style.bottom = '';
		moduleElement.style.left = '';
		moduleElement.style.right = '';
		moduleElement.style.transform = '';

		if (position.anchor) {
			this.applyAnchorPosition(moduleElement, position);
		} else {
			this.applyCoordinatePosition(moduleElement, position);
		}

		if (position.offset) {
			const currentTransform = moduleElement.style.transform || '';
			moduleElement.style.transform = `${currentTransform} translate(${position.offset.x}px, ${position.offset.y}px)`;
		}

		if (position.zIndex !== undefined) {
			moduleElement.style.zIndex = position.zIndex.toString();
		}
	}

	private applyAnchorPosition(element: HTMLElement, position: ModulePosition) {
		const anchor = position.anchor!;

		switch (anchor) {
			case 'top-left':
				element.style.top = '20px';
				element.style.left = '20px';
				break;
			case 'top-center':
				element.style.top = '20px';
				element.style.left = '50%';
				element.style.transform = 'translateX(-50%)';
				break;
			case 'top-right':
				element.style.top = '20px';
				element.style.left = '85%';
				break;
			case 'center-left':
				element.style.top = '50%';
				element.style.left = '20px';
				element.style.transform = 'translateY(-50%)';
				break;
			case 'center':
				element.style.top = '50%';
				element.style.left = '50%';
				element.style.transform = 'translate(-50%, -50%)';
				break;
			case 'center-right':
				element.style.top = '50%';
				element.style.left = '85%';
				element.style.transform = 'translateY(-50%)';
				break;
			case 'bottom-left':
				element.style.top = '85%';
				element.style.left = '20px';
				break;
			case 'bottom-center':
				element.style.top = '85%';
				element.style.left = '50%';
				element.style.transform = 'translateX(-50%)';
				break;
			case 'bottom-right':
				element.style.top = '85%';
				element.style.left = '85%';
				break;
		}
	}

	private applyCoordinatePosition(element: HTMLElement, position: ModulePosition) {
		element.style.top = '';
		element.style.bottom = '';
		element.style.left = '';
		element.style.right = '';

		if (position.x !== undefined) {
			if (typeof position.x === 'string') {
				switch (position.x) {
					case 'left':
						element.style.left = '20px';
						break;
					case 'center':
						element.style.left = '50%';
						element.style.transform = 'translateX(-50%)';
						break;
					case 'right':
						element.style.left = '85%';
						break;
				}
			} else {
				element.style.left = `${position.x}px`;
			}
		}

		if (position.y !== undefined) {
			const currentTransform = element.style.transform || '';
			if (typeof position.y === 'string') {
				switch (position.y) {
					case 'top':
						element.style.top = '20px';
						break;
					case 'center':
						element.style.top = '50%';
						if (currentTransform.includes('translateX')) {
							element.style.transform = currentTransform.replace('translateX(-50%)', 'translate(-50%, -50%)');
						} else {
							element.style.transform = 'translateY(-50%)';
						}
						break;
					case 'bottom':
						element.style.top = '85%';
						// Remove any top positioning that might conflict
						//element.style.top = '';
						break;
				}
			} else {
				element.style.top = `${position.y}px`;
				element.style.bottom = ''; // Clear bottom if using pixel value
			}
		}
	}

	public setModulePosition(moduleName: keyof GameUIModules, position: ModulePosition) {
		if (!this.config.modulePositions) {
			this.config.modulePositions = {};
		}
		this.config.modulePositions[moduleName] = position;

		if (this.loaded) {
			this.applyModulePosition(moduleName);
		}
	}

	public getModulePosition(moduleName: keyof GameUIModules): ModulePosition | undefined {
		return this.config.modulePositions?.[moduleName];
	}

	public resetModulePosition(moduleName: keyof GameUIModules) {
		if (this.config.modulePositions) {
			delete this.config.modulePositions[moduleName];

			const element = this.getModuleElement(moduleName);
			if (element) {
				element.style.position = '';
				element.style.top = '';
				element.style.bottom = '';
				element.style.left = '';
				element.style.right = '';
				element.style.transform = '';
				element.style.zIndex = '';
			}
		}
	}

	public animateModulePosition(moduleName: keyof GameUIModules, newPosition: ModulePosition, duration: number = 500) {
		const element = this.getModuleElement(moduleName);
		if (!element) return;

		element.style.transition = `all ${duration}ms ease-in-out`;

		this.setModulePosition(moduleName, newPosition);

		setTimeout(() => {
			element.style.transition = '';
		}, duration);
	}

	private getModuleElement(moduleName: keyof GameUIModules): HTMLElement | null {
		switch (moduleName) {
			case 'score': return this.ref.scoreModule;
			case 'timer': return this.ref.timerModule;
			case 'buttons': return this.ref.buttonModule;
			default: return null;
		}
	}

	public updateScore(score: number) {
		this.modules.score?.updateScore(score);
	}

	public startTimer(duration?: number, onEnd?: () => void) {
		this.modules.timer?.start(duration, onEnd);
	}

	public stopTimer() {
		this.modules.timer?.stop();
	}

	public showButton(id: string, text: string, callback: () => void, style?: string) {
		this.modules.buttons?.addButton(id, text, callback, style);
	}

	public hideButton(id: string) {
		this.modules.buttons?.removeButton(id);
	}
}

interface GameUIModule {
	load(): void;
	unload(): void;
}

interface ScoreHtmlReference {
	scoreLabel: HTMLSpanElement;
	scoreValue: HTMLSpanElement;
}

class ScoreModule implements GameUIModule {
	private div: HTMLDivElement;
	private ref: ScoreHtmlReference;
	private scoreValue = 0;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			scoreLabel: div.querySelector("#score-label") as HTMLSpanElement,
			scoreValue: div.querySelector("#score-value") as HTMLSpanElement
		};
	}

	load() {
		this.div.style.display = 'flex';
	}

	unload() {
		this.div.style.display = 'none';
	}

	updateScore(score: number) {
		this.scoreValue = score;
		if (this.ref.scoreValue) {
			this.ref.scoreValue.textContent = score.toString();
		}
	}
}

interface TimerHtmlReference {
	timerLabel: HTMLSpanElement;
	timerValue: HTMLSpanElement;
}

class TimerModule implements GameUIModule {
	private div: HTMLDivElement;
	private ref: TimerHtmlReference;
	private timeLeft = 0;
	private timerInterval?: NodeJS.Timeout;
	private onTimerEnd?: () => void;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			timerLabel: div.querySelector("#timer-label") as HTMLSpanElement,
			timerValue: div.querySelector("#timer-value") as HTMLSpanElement
		};
	}

	load() {
		this.div.style.display = 'flex';
	}

	unload() {
		this.div.style.display = 'none';
		this.stop();
	}

	start(duration: number = 60, onEnd?: () => void) {
		this.timeLeft = duration;
		this.onTimerEnd = onEnd;
		this.updateDisplay();

		this.timerInterval = setInterval(() => {
			this.timeLeft--;
			this.updateDisplay();

			if (this.timeLeft <= 0) {
				this.stop();
				this.onTimerEnd?.();
			}
		}, 1000);
	}

	stop() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
			this.timerInterval = undefined;
		}
	}

	private updateDisplay() {
		const minutes = Math.floor(this.timeLeft / 60);
		const seconds = this.timeLeft % 60;
		if (this.ref.timerValue) {
			this.ref.timerValue.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
		}
	}
}

interface ButtonHtmlReference {
	buttonContainer: HTMLDivElement;
}

class ButtonModule implements GameUIModule {
	private div: HTMLDivElement;
	private ref: ButtonHtmlReference;
	private buttons: Map<string, HTMLButtonElement> = new Map();

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			buttonContainer: div.querySelector("#button-container") as HTMLDivElement
		};
	}

	load() {
		this.div.style.display = 'flex';
	}

	unload() {
		this.div.style.display = 'none';
		this.buttons.clear();
		if (this.ref.buttonContainer) {
			this.ref.buttonContainer.innerHTML = '';
		}
	}

	addButton(id: string, text: string, callback: () => void, style?: string) {
		this.removeButton(id);

		const button = document.createElement('button');
		button.textContent = text;
		button.className = `game-button ${style || ''}`;
		button.id = `game-btn-${id}`;
		button.addEventListener('click', callback);

		this.buttons.set(id, button);
		this.ref.buttonContainer.appendChild(button);
	}

	removeButton(id: string) {
		const button = this.buttons.get(id);
		if (button) {
			button.remove();
			this.buttons.delete(id);
		}
	}
}

export default GameUI;
