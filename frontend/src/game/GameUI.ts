interface GameUIModules {
  scorevs?: ScoreVersusModule;
  score?: ScoreModule;
  timer?: TimerModule;
  buttons?: ButtonModule;
  countdown?: CountdownModule;
  ending?: EndingModule;
  images?: ImageModule;
  playercounter?: PlayerCounterModule;
}

interface ModulePosition {
  x?: "left" | "center" | "right" | number;
  y?: "top" | "center" | "bottom" | number;
  anchor?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  offset?: { x: number; y: number };
  zIndex?: number;
}

interface GameUIConfig {
  enabledModules: (keyof GameUIModules)[];
  theme?: "pong" | "br" | "brick";
  globalPosition?: "top" | "bottom" | "overlay";
  modulePositions?: {
    scorevs?: ModulePosition;
    score?: ModulePosition;
    timer?: ModulePosition;
    buttons?: ModulePosition;
    countdown?: ModulePosition;
    ending?: ModulePosition;
    images?: ModulePosition;
    playercounter?: ModulePosition;
  };
}

interface GameUIHtmlReference {
  container: HTMLDivElement;
  scorevsModule: HTMLDivElement;
  scoreModule: HTMLDivElement;
  timerModule: HTMLDivElement;
  buttonModule: HTMLDivElement;
  countdownModule: HTMLDivElement;
  endingModule: HTMLDivElement;
  imageModule: HTMLDivElement;
  playercounterModule: HTMLDivElement;
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
      scorevsModule: div.querySelector("#scorevs-module") as HTMLDivElement,
      scoreModule: div.querySelector("#score-module") as HTMLDivElement,
      timerModule: div.querySelector("#timer-module") as HTMLDivElement,
      buttonModule: div.querySelector("#button-module") as HTMLDivElement,
      countdownModule: div.querySelector("#countdown-module") as HTMLDivElement,
      endingModule: div.querySelector("#ending-module") as HTMLDivElement,
      imageModule: div.querySelector("#image-module") as HTMLDivElement,
      playercounterModule: div.querySelector(
        "#playercounter-module"
      ) as HTMLDivElement,
    };

    this.initializeModules();
  }

  private initializeModules() {
    this.config.enabledModules.forEach((moduleName) => {
      switch (moduleName) {
        case "scorevs":
          this.modules.scorevs = new ScoreVersusModule(this.ref.scorevsModule);
          break;
        case "score":
          this.modules.score = new ScoreModule(this.ref.scoreModule);
          break;
        case "timer":
          this.modules.timer = new TimerModule(this.ref.timerModule);
          break;
        case "buttons":
          this.modules.buttons = new ButtonModule(this.ref.buttonModule);
          break;
        case "countdown":
          this.modules.countdown = new CountdownModule(
            this.ref.countdownModule
          );
          break;
        case "ending":
          this.modules.ending = new EndingModule(this.ref.endingModule);
          break;
        case "images":
          this.modules.images = new ImageModule(this.ref.imageModule);
          break;
        case "playercounter":
          this.modules.playercounter = new PlayerCounterModule(
            this.ref.playercounterModule
          );
          break;
      }
    });
  }

  public load() {
    if (this.loaded) return;

    document.head.appendChild(this.css);

    this.ref.container.className += ` ${this.config.theme || "game"}`;
    if (this.config.globalPosition) {
      this.ref.container.className += ` ${this.config.globalPosition}`;
    }

    document.body.appendChild(this.ref.container);

    this.ref.container.style.display = "flex";

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

    Object.values(this.modules).forEach((module) => {
      module?.unload();
    });

    this.ref.container?.remove();

    this.loaded = false;
  }

  private applyModulePosition(moduleName: keyof GameUIModules) {
    const moduleElement = this.getModuleElement(moduleName);
    const position = this.config.modulePositions?.[moduleName];

    if (!moduleElement || !position) return;

    moduleElement.style.position = "absolute";
    moduleElement.style.top = "";
    moduleElement.style.bottom = "";
    moduleElement.style.left = "";
    moduleElement.style.right = "";
    moduleElement.style.transform = "";

    if (position.anchor) {
      this.applyAnchorPosition(moduleElement, position);
    } else {
      this.applyCoordinatePosition(moduleElement, position);
    }

    if (position.offset) {
      const currentTransform = moduleElement.style.transform || "";
      moduleElement.style.transform = `${currentTransform} translate(${position.offset.x}px, ${position.offset.y}px)`;
    }

    if (position.zIndex !== undefined) {
      moduleElement.style.zIndex = position.zIndex.toString();
    }
  }

  private applyAnchorPosition(element: HTMLElement, position: ModulePosition) {
    const anchor = position.anchor!;

    switch (anchor) {
      case "top-left":
        element.style.top = "20px";
        element.style.left = "20px";
        break;
      case "top-center":
        element.style.top = "20px";
        element.style.left = "50%";
        element.style.transform = "translateX(-50%)";
        break;
      case "top-right":
        element.style.top = "20px";
        element.style.left = "85%";
        break;
      case "center-left":
        element.style.top = "50%";
        element.style.left = "20px";
        element.style.transform = "translateY(-50%)";
        break;
      case "center":
        element.style.top = "50%";
        element.style.left = "50%";
        element.style.transform = "translate(-50%, -50%)";
        break;
      case "center-right":
        element.style.top = "50%";
        element.style.left = "85%";
        element.style.transform = "translateY(-50%)";
        break;
      case "bottom-left":
        element.style.top = "85%";
        element.style.left = "20px";
        break;
      case "bottom-center":
        element.style.top = "85%";
        element.style.left = "50%";
        element.style.transform = "translateX(-50%)";
        break;
      case "bottom-right":
        element.style.top = "85%";
        element.style.left = "85%";
        break;
    }
  }

  private applyCoordinatePosition(
    element: HTMLElement,
    position: ModulePosition
  ) {
    element.style.top = "";
    element.style.bottom = "";
    element.style.left = "";
    element.style.right = "";

    if (position.x !== undefined) {
      if (typeof position.x === "string") {
        switch (position.x) {
          case "left":
            element.style.left = "20px";
            break;
          case "center":
            element.style.left = "50%";
            element.style.transform = "translateX(-50%)";
            break;
          case "right":
            element.style.left = "85%";
            break;
        }
      } else {
        element.style.left = `${position.x}px`;
      }
    }

    if (position.y !== undefined) {
      const currentTransform = element.style.transform || "";
      if (typeof position.y === "string") {
        switch (position.y) {
          case "top":
            element.style.top = "20px";
            break;
          case "center":
            element.style.top = "50%";
            if (currentTransform.includes("translateX")) {
              element.style.transform = currentTransform.replace(
                "translateX(-50%)",
                "translate(-50%, -50%)"
              );
            } else {
              element.style.transform = "translateY(-50%)";
            }
            break;
          case "bottom":
            element.style.top = "85%";
            // Remove any top positioning that might conflict
            //element.style.top = '';
            break;
        }
      } else {
        element.style.top = `${position.y}px`;
        element.style.bottom = ""; // Clear bottom if using pixel value
      }
    }
  }

  public setModulePosition(
    moduleName: keyof GameUIModules,
    position: ModulePosition
  ) {
    if (!this.config.modulePositions) {
      this.config.modulePositions = {};
    }
    this.config.modulePositions[moduleName] = position;

    if (this.loaded) {
      this.applyModulePosition(moduleName);
    }
  }

  public getModulePosition(
    moduleName: keyof GameUIModules
  ): ModulePosition | undefined {
    return this.config.modulePositions?.[moduleName];
  }

  public resetModulePosition(moduleName: keyof GameUIModules) {
    if (this.config.modulePositions) {
      delete this.config.modulePositions[moduleName];

      const element = this.getModuleElement(moduleName);
      if (element) {
        element.style.position = "";
        element.style.top = "";
        element.style.bottom = "";
        element.style.left = "";
        element.style.right = "";
        element.style.transform = "";
        element.style.zIndex = "";
      }
    }
  }

  public animateModulePosition(
    moduleName: keyof GameUIModules,
    newPosition: ModulePosition,
    duration: number = 500
  ) {
    const element = this.getModuleElement(moduleName);
    if (!element) return;

    element.style.transition = `all ${duration}ms ease-in-out`;

    this.setModulePosition(moduleName, newPosition);

    setTimeout(() => {
      element.style.transition = "";
    }, duration);
  }

  private getModuleElement(
    moduleName: keyof GameUIModules
  ): HTMLElement | null {
    switch (moduleName) {
      case "scorevs":
        return this.ref.scorevsModule;
      case "score":
        return this.ref.scoreModule;
      case "timer":
        return this.ref.timerModule;
      case "buttons":
        return this.ref.buttonModule;
      case "countdown":
        return this.ref.countdownModule;
      case "ending":
        return this.ref.endingModule;
      case "images":
        return this.ref.imageModule;
      // case 'death': return this.ref.deathModule;
      case "playercounter":
        return this.ref.playercounterModule;
      // case 'spectate': return this.ref.spectateModule;
      default:
        return null;
    }
  }

  public updateScore(score: number) {
    this.modules.score?.updateScore(score);
  }

  public updateHighScore(score: number) {
    this.modules.score?.updateHighScore(score);
  }

  public updateScoreVersus(score1: number, score2: number) {
    this.modules.scorevs?.updateScore(score1, score2);
  }

  public hideScore() {
    this.modules.score?.unload();
  }

  public showScore() {
    this.modules.score?.load();
  }

  public startCountdown(initialValue: number) {
    this.modules.countdown?.start(initialValue);
  }

  public startTimer(duration?: number, onEnd?: () => void) {
    this.modules.timer?.start(duration, onEnd);
  }

  public stopTimer() {
    this.modules.timer?.stop();
  }

  public showEnd(
    mode: string,
    result: boolean,
    score1: number,
    score2?: number
  ) {
    this.modules.ending?.setResult(mode, result, score1, score2);
  }

  public hideEnd() {
    this.modules.ending?.unload();
  }

  public setLeaderboard(data: any, mode: string) {
    this.modules.ending?.setLeaderboard(data, mode);
  }

  public showButton(
    id: string,
    text: string,
    callback: () => void,
    style?: string
  ) {
    this.modules.buttons?.addButton(id, text, callback, style);
  }

  public hideButton(id: string) {
    this.modules.buttons?.removeButton(id);
  }

  public showImage(
    id: string,
    src: string,
    style?: string,
    position?: ImagePosition
  ) {
    this.modules.images?.addImage(id, src, style, position);
  }

  public hideImage(id: string) {
    this.modules.images?.removeImage(id);
  }

  public updatePlayerCount(playerLeft: number) {
    this.modules.playercounter?.update(playerLeft);
  }
}

interface GameUIModule {
  load(): void;
  unload(): void;
}

interface CountdownHtmlReference {
  countdownLabel: HTMLSpanElement;
  countdownValue: HTMLSpanElement;
}

class CountdownModule implements GameUIModule {
  private div: HTMLDivElement;
  private ref: CountdownHtmlReference;
  private delay = 1000;
  private countdownNumber = 3;
  private countdownInterval?: NodeJS.Timeout;

  constructor(div: HTMLDivElement) {
    this.div = div;
    this.ref = {
      countdownLabel: div.querySelector("#countdown-label") as HTMLSpanElement,
      countdownValue: div.querySelector("#countdown-value") as HTMLSpanElement,
    };
  }

  load() {
    this.div.style.display = "flex";
  }

  unload() {
    this.ref.countdownValue.textContent = "";
    this.div.style.display = "none";
    this.stop();
  }

  start(initialValue: number = 3) {
    this.countdownNumber = initialValue;

    this.updateDisplay();

    this.countdownInterval = setInterval(() => {
      this.countdownNumber--;
      this.updateDisplay();

      if (this.countdownNumber <= 0) {
        this.unload();
      }
    }, this.delay);
  }

  updateDisplay() {
    if (this.ref.countdownValue) {
      this.ref.countdownValue.textContent = this.countdownNumber.toString();
      this.ref.countdownValue.className = "countdown-number";
    }
  }

  stop() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = undefined;
    }
  }
}

interface ScoreVersusHtmlReference {
  score1Value: HTMLSpanElement;
  score2Value: HTMLSpanElement;
}

class ScoreVersusModule implements GameUIModule {
  private div: HTMLDivElement;
  private ref: ScoreVersusHtmlReference;
  private score1 = 0;
  private score2 = 0;

  constructor(div: HTMLDivElement) {
    this.div = div;

    this.ref = {
      score1Value: div.querySelector("#score1-value") as HTMLSpanElement,
      score2Value: div.querySelector("#score2-value") as HTMLSpanElement,
    };
  }

  load() {
    this.div.style.display = "flex";
  }

  unload() {
    this.div.style.display = "none";
  }

  updateScore(score1: number, score2: number) {
    if (score1 == 5 || score2 == 5) this.unload();
    this.score1 = score1;
    this.score2 = score2;
    if (this.ref.score1Value && this.ref.score2Value) {
      this.ref.score1Value.textContent = score1.toString();
      this.ref.score2Value.textContent = score2.toString();
    }
  }
}

interface ScoreHtmlReference {
  scoreValue: HTMLSpanElement;
  scorePBValue: HTMLSpanElement;
}

class ScoreModule implements GameUIModule {
  private div: HTMLDivElement;
  private ref: ScoreHtmlReference;
  private scoreValue = 0;
  private pb = 0;

  constructor(div: HTMLDivElement) {
    this.div = div;

    this.ref = {
      scoreValue: div.querySelector("#score-value") as HTMLSpanElement,
      scorePBValue: div.querySelector("#scorepb-value") as HTMLSpanElement,
    };
  }

  load() {
    this.div.style.display = "flex";
  }

  unload() {
    this.div.style.display = "none";
  }

  updateScore(score: number) {
    this.scoreValue = score;
    if (this.ref.scoreValue) {
      this.ref.scoreValue.textContent = score.toString();
    }
    if (this.scoreValue > this.pb) {
      this.updateHighScore(this.scoreValue);
    }
  }

  updateHighScore(score: number) {
    this.pb = score;
    if (this.ref.scorePBValue) {
      this.ref.scorePBValue.textContent = score.toString();
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
      timerValue: div.querySelector("#timer-value") as HTMLSpanElement,
    };
  }

  load() {
    this.div.style.display = "flex";
  }

  unload() {
    this.div.style.display = "none";
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
      this.ref.timerValue.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
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
      buttonContainer: div.querySelector("#button-container") as HTMLDivElement,
    };
  }

  load() {
    this.div.style.display = "flex";
  }

  unload() {
    this.div.style.display = "none";
    this.buttons.clear();
    if (this.ref.buttonContainer) {
      this.ref.buttonContainer.innerHTML = "";
    }
  }

  addButton(id: string, text: string, callback: () => void, style?: string) {
    this.removeButton(id);

    const button = document.createElement("button");
    button.textContent = text;
    button.className = `game-button ${style || ""}`;
    button.id = `game-btn-${id}`;
    button.addEventListener("click", callback);

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

interface EndingHtmlReference {
  score1Value: HTMLSpanElement;
  score2Value: HTMLSpanElement;
  scoreSolo: HTMLSpanElement;
  dualModeContainer: HTMLDivElement;
  soloModeContainer: HTMLDivElement;
  result: HTMLSpanElement;
  leaderboard: HTMLDivElement;
  players: HTMLDivElement;
}

type Player = {
  username: string;
  highscore: number;
};

class EndingModule implements GameUIModule {
  private div: HTMLDivElement;
  private ref: EndingHtmlReference;
  private leaderboard: Player[] = [];

  constructor(div: HTMLDivElement) {
    this.div = div;
    this.ref = {
      score1Value: div.querySelector("#end-score1-value") as HTMLSpanElement,
      score2Value: div.querySelector("#end-score2-value") as HTMLSpanElement,
      scoreSolo: div.querySelector("#end-score-solo") as HTMLSpanElement,
      dualModeContainer: div.querySelector(".dual-mode") as HTMLDivElement,
      soloModeContainer: div.querySelector(".solo-mode") as HTMLDivElement,
      result: div.querySelector("#result-label") as HTMLSpanElement,
      leaderboard: div.querySelector("#leaderboard") as HTMLDivElement,
      players: div.querySelector("#players-list") as HTMLDivElement,
    };
  }

  load() {
    this.div.style.display = "none";
  }

  unload() {
    this.div.style.display = "none";
  }

  setResult(mode: string, result: boolean, score: number, score2?: number) {
    if (mode === "brick") {
      this.ref.dualModeContainer.style.display = "none";
      this.ref.soloModeContainer.style.display = "flex";

      if (this.ref.scoreSolo) this.ref.scoreSolo.textContent = score.toString();

      if (result === true) this.ref.result.innerHTML = "New High Score!";
      else this.ref.result.innerHTML = "";

      // this.ref.leaderboard.style.display = 'flex';
      this.ref.players.innerHTML = "";

      for (let i = 0; i < this.leaderboard.length; i++) {
        const row = document.createElement("tr");

        const positionCell = document.createElement("td");
        positionCell.textContent = (i + 1).toString();
        row.appendChild(positionCell);

        const usernameCell = document.createElement("td");
        usernameCell.textContent = this.leaderboard[i].username;
        row.appendChild(usernameCell);

        const scoreCell = document.createElement("td");
        scoreCell.textContent = this.leaderboard[i].highscore.toString();
        row.appendChild(scoreCell);

        this.ref.players.appendChild(row);
      }
    } else {
      this.ref.leaderboard.style.display = "none";
      this.ref.dualModeContainer.style.display = "flex";
      this.ref.soloModeContainer.style.display = "none";

      if (this.ref.score1Value)
        this.ref.score1Value.textContent = score.toString();
      if (this.ref.score2Value && score2 !== undefined)
        this.ref.score2Value.textContent = score2.toString();

      if (mode == "local") {
        if (result)
          this.ref.result.innerHTML = 'Player 1 <span class="win">Win</span>';
        else
          this.ref.result.innerHTML = 'Player 2 <span class="win">Win</span>';
      } else if (mode == "ai" || mode == "online") {
        if (result)
          this.ref.result.innerHTML = 'You <span class="win">Win</span>';
        else this.ref.result.innerHTML = 'You <span class="lose">Lose</span>';
      }
    }

    this.div.style.display = "flex";
  }

  setLeaderboard(data: any, mode: string) {
    this.leaderboard = [];
    for (let i = 0; i < data.length; i++) {
      let score = 0;
      switch (mode) {
        case "easy":
          score = data[i].easy_mode_hscore;
          break;
        case "normal":
          score = data[i].normal_mode_hscore;
          break;
        case "hard":
          score = data[i].hard_mode_hscore;
          break;
      }

      this.leaderboard.push({
        username: data[i].username,
        highscore: score,
      });
    }
  }
}

interface ImageHtmlReference {
  imageContainer: HTMLDivElement;
}

interface ImagePosition {
  x?: "left" | "center" | "right" | number;
  y?: "top" | "center" | "bottom" | number;
  anchor?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  offset?: { x: number; y: number };
}

class ImageModule implements GameUIModule {
  private div: HTMLDivElement;
  private ref: ImageHtmlReference;
  private images: Map<string, HTMLImageElement> = new Map();
  private positions: Map<string, ImagePosition> = new Map();

  constructor(div: HTMLDivElement) {
    this.div = div;
    this.ref = {
      imageContainer: div.querySelector("#image-container") as HTMLDivElement,
    };
  }

  load() {
    this.div.style.display = "flex";
    this.ref.imageContainer.style.position = "relative";
  }

  unload() {
    this.div.style.display = "none";
    this.images.clear();
    this.positions.clear();
    if (this.ref.imageContainer) {
      this.ref.imageContainer.innerHTML = "";
    }
  }

  addImage(id: string, src: string, style?: string, position?: ImagePosition) {
    this.removeImage(id);

    const img = document.createElement("img");
    img.src = src;
    img.className = `game-image ${style || ""}`;
    img.id = `game-img-${id}`;

    this.images.set(id, img);
    this.ref.imageContainer.appendChild(img);

    if (position) this.setImagePosition(id, position);
  }

  removeImage(id: string) {
    const img = this.images.get(id);
    if (img) {
      img.remove();
      this.images.delete(id);
      this.positions.delete(id);
    }
  }

  setImagePosition(id: string, position: ImagePosition) {
    const img = this.images.get(id);
    if (!img) return;

    this.positions.set(id, position);

    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";

    if (position.offset) {
      img.style.transform += ` translate(${position.offset.x}vh, ${position.offset.y}vh)`;
    }
  }
}

// interface DeathHtmlReference{
// 	deathContainer: HTMLDivElement;
// }

// class DeathModule implements GameUIModule{
// 	private div: HTMLDivElement;
// 	private ref: DeathHtmlReference;

// 	constructor(div: HTMLDivElement) {
// 		this.div = div;
// 		this.ref = {
// 			deathContainer: div.querySelector("#death-container") as HTMLDivElement
// 		};
// 	}

// 	load() {
// 		this.div.style.display = 'flex';
// 	}

// 	unload() {
// 		this.div.style.display = 'none';
// 	}

// }

interface PlayerCounterHtmlReference {
  playerCounterValue: HTMLSpanElement;
}

class PlayerCounterModule implements GameUIModule {
  private div: HTMLDivElement;
  private ref: PlayerCounterHtmlReference;

  constructor(div: HTMLDivElement) {
    this.div = div;
    this.ref = {
      playerCounterValue: div.querySelector(
        "#playercounter-value"
      ) as HTMLSpanElement,
    };
  }

  load() {
    this.div.style.display = "flex";
  }

  unload() {
    this.div.style.display = "none";
  }

  update(playerLeft: number) {
    this.ref.playerCounterValue.textContent = playerLeft.toString();
  }
}

// interface SpectateHtmlReference{
// 	spectateContainer: HTMLDivElement;
// }

// class SpectateModule implements GameUIModule{
// 	private div: HTMLDivElement;
// 	private ref: SpectateHtmlReference;

// 	constructor(div: HTMLDivElement) {
// 		this.div = div;
// 		this.ref = {
// 			spectateContainer: div.querySelector("#spectate-container") as HTMLDivElement
// 		};
// 	}

// 	load() {
// 		this.div.style.display = 'flex';
// 	}

// 	unload() {
// 		this.div.style.display = 'none';
// 	}

// }

export default GameUI;
