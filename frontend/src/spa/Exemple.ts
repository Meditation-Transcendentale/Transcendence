//faut utiliser "../babyImport.ts" plutot que  "@babylonImport" parce que nikBabylon  et nikEsbuild
import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { NotifiactionManager } from "./NotifiactionManager";
import { Popup } from "./Popup";

interface exempleHtmlReference {
	exempleDiv: { html: HTMLDivElement, id: number };
	popupDiv: HTMLDivElement;
	notifDiv: HTMLDivElement;
	exemple: HTMLInputElement,
	popup: HTMLInputElement,
	notif: HTMLInputElement
}

interface BootMessage {
	text: string;
	class: string;
	delay: number;
}

export default class Exemple {
	private div: HTMLDivElement;
	private ref: exempleHtmlReference;
	private css: HTMLLinkElement;
	private state: boolean;

	// Boot sequence properties
	private bootContent: HTMLDivElement | null = null;
	private bootMessages: BootMessage[] = [
		{ text: "Eclipse Systems BIOS v2.4.7", class: "system", delay: 100 },
		{ text: "Copyright (C) 2025 Eclipse Corp.", class: "", delay: 50 },
		{ text: "", class: "", delay: 200 },
		{ text: "Performing POST...", class: "", delay: 300 },
		{ text: "Memory Test: 16384MB OK", class: "success", delay: 400 },
		{ text: "CPU: Intel Core i9-9900K [OK]", class: "success", delay: 200 },
		{ text: "GPU: NVIDIA GeForce RTX 4090 [OK]", class: "success", delay: 200 },
		{ text: "Storage: NVMe SSD 1TB [OK]", class: "success", delay: 300 },
		{ text: "", class: "", delay: 100 },
		{ text: "Loading boot loader...", class: "", delay: 500 },
		{ text: "GRUB version 2.06", class: "system", delay: 200 },
		{ text: "", class: "", delay: 100 },
		{ text: "Loading Eclipse OS...", class: "", delay: 800 },
		{ text: "[    0.000000] Linux version 6.1.0-eclipse", class: "", delay: 100 },
		{ text: "[    0.001234] Command line: quiet splash", class: "", delay: 50 },
		{ text: "[    0.012345] KERNEL supported cpus:", class: "", delay: 50 },
		{ text: "[    0.023456] x86-64-v1", class: "", delay: 50 },
		{ text: "[    0.034567] Initializing cgroup subsys cpuset", class: "", delay: 100 },
		{ text: "[    0.045678] Initializing cgroup subsys cpu", class: "", delay: 100 },
		{ text: "[    0.156789] PID hash table entries: 4096", class: "", delay: 150 },
		{ text: "[    0.267890] Dentry cache hash table entries: 2097152", class: "", delay: 100 },
		{ text: "[    0.378901] Mount-cache hash table entries: 32768", class: "", delay: 100 },
		{ text: "[    0.489012] CPU: Physical Processor ID: 0", class: "", delay: 100 },
		{ text: "[    0.590123] ACPI: Core revision 20220331", class: "", delay: 100 },
		{ text: "[    0.701234] clocksource: hpet: mask: 0xffffffff", class: "", delay: 150 },
		{ text: "[    0.812345] NET: Registered protocol family 16", class: "", delay: 100 },
		{ text: "[    0.923456] audit: initializing netlink subsys", class: "", delay: 100 },
		{ text: "[    1.034567] PCI: Using configuration type 1", class: "", delay: 200 },
		{ text: "[    1.145678] ENERGY_PERF_BIAS: Set to 'normal'", class: "", delay: 100 },
		{ text: "[    1.256789] cryptd: max_cpu_qlen set to 1000", class: "", delay: 150 },
		{ text: "", class: "", delay: 300 },
		{ text: "WARNING: Anomalous energy signature detected", class: "warning", delay: 800 },
		{ text: "ERROR: Standard boot protocols failing", class: "error", delay: 600 },
		{ text: "Switching to emergency Eclipse Protocol...", class: "eclipse", delay: 1000 },
		{ text: "", class: "", delay: 200 },
		{ text: "ECLIPSE PROTOCOL INITIATED", class: "eclipse", delay: 500 },
		{ text: "Loading quantum drivers...", class: "eclipse", delay: 800 },
		{ text: "Establishing neural pathways...", class: "eclipse", delay: 700 },
		{ text: "Synchronizing with mainframe...", class: "eclipse", delay: 900 },
		{ text: "", class: "", delay: 300 },
		{ text: "System ready.", class: "success", delay: 1000 },
		{ text: "Welcome to Eclipse OS v2.4.7", class: "eclipse", delay: 500 }
	];
	private messageIndex: number = 0;
	private isEclipseMode: boolean = false;
	private bootTimeoutId: number | null = null;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.css = div.querySelector("link") as HTMLLinkElement;
		this.state = true;

		this.ref = {
			exempleDiv: { html: div.querySelector("#exemple-exemple") as HTMLDivElement, id: -1 },
			popupDiv: div.querySelector("#exemple-popup") as HTMLDivElement,
			notifDiv: div.querySelector("#exemple-notif") as HTMLDivElement,
			exemple: div.querySelector("#exemple-exemple-input") as HTMLInputElement, // This might be null after boot terminal init
			popup: div.querySelector("#exemple-popup-input") as HTMLInputElement,
			notif: div.querySelector("#exemple-notif-input") as HTMLInputElement,
		}

		this.ref.exempleDiv.id = App3D.addCSS3dObject({
			html: this.ref.exempleDiv.html,
			width: 1, // Normal 1:1 scaling
			height: 1, // Normal 1:1 scaling
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 6, 30)), // Position at camera target
			enable: false
		})

		this.setupEventListeners();
		this.initializeBootTerminal();
	}

	private setupEventListeners(): void {

		if (this.ref.popup) {
			this.ref.popup.addEventListener("click", () => {
				NotifiactionManager.addText("ouai, ca va?");
				this.state = !this.state;
				App3D.setVue((this.state ? "exemple1" : "exemple2"));
			});
		}

		if (this.ref.notif) {
			this.ref.notif.addEventListener("click", () => {
				const n = this.ref.notifDiv.cloneNode(true) as HTMLDivElement;
				n.addEventListener("click", () => {
					Popup.addPopup(this.ref.popupDiv);
				});
				NotifiactionManager.addDiv(n);
			});
		}
	}
	private addCursor(): void {
		if (!this.bootContent) return;

		const cursorLine = document.createElement('div');
		cursorLine.className = 'boot-line';
		cursorLine.innerHTML = 'root@eclipse:~# <span class="cursor"></span>';
		this.bootContent.appendChild(cursorLine);
		this.bootContent.scrollTop = this.bootContent.scrollHeight;

		setTimeout(() => {
			this.showLoginPage();
		}, 1000);
	}
	private initializeBootTerminal(): void {
		const windowBar = this.div.querySelector('.window-bar');
		if (windowBar) {
			windowBar.textContent = 'System Boot Terminal';
		}

		this.bootContent = this.ref.exempleDiv.html.querySelector('#boot-content');

		if (this.bootContent) {
			this.bootContent.innerHTML = '';
			this.bootContent.classList.remove('hidden');
		} else {
			this.bootContent = document.createElement('div');
			this.bootContent.id = 'boot-content';
			this.bootContent.className = 'boot-terminal';
			this.ref.exempleDiv.html.appendChild(this.bootContent);
		}

		const loginContent = this.ref.exempleDiv.html.querySelector('#login-content');
		if (loginContent) {
			loginContent.classList.add('hidden');
		}

		this.updateElementDimensions();
		window.addEventListener('resize', () => this.updateElementDimensions());
	}
	private typeBootMessage(): void {
		if (this.messageIndex < this.bootMessages.length && this.bootContent) {
			const message = this.bootMessages[this.messageIndex];
			const line = document.createElement('div');
			line.className = `boot-line ${message.class}`;
			line.textContent = message.text || '\u00A0'; // Non-breaking space for empty lines

			this.bootContent.appendChild(line);

			this.bootContent.scrollTop = this.bootContent.scrollHeight;

			const progress = Math.round((this.messageIndex / this.bootMessages.length) * 100);
			this.ref.popup.value = `Progress: ${progress}%`;

			if (message.class === 'eclipse' && !this.isEclipseMode) {
				this.isEclipseMode = true;
				this.ref.notif.value = 'Boot Status: Eclipse Protocol Active';
				const windowBar = this.div.querySelector('.window-bar');
				if (windowBar) {
					windowBar.textContent = 'Eclipse Terminal - QUANTUM MODE';
				}
			}

			if (message.text.includes('Loading') || message.text.includes('Initializing')) {
				setTimeout(() => {
					this.addProgressBar(message.class === 'eclipse');
				}, 200);
			}

			this.messageIndex++;
			this.bootTimeoutId = setTimeout(() => this.typeBootMessage(), message.delay) as any;
		} else {
			this.addCursor();
			this.ref.notif.value = 'Boot Complete - System Ready';
			this.ref.popup.value = 'Status: Online';
		}
	}

	private addProgressBar(eclipseMode: boolean = false): void {
		if (!this.bootContent) return;

		const progressLine = document.createElement('div');
		progressLine.className = 'progress-line';
		progressLine.innerHTML = `Loading... <div class="progress-bar"><div class="progress-fill ${eclipseMode ? 'eclipse-mode' : ''}"></div></div>`;

		this.bootContent.appendChild(progressLine);

		const progressFill = progressLine.querySelector('.progress-fill') as HTMLDivElement;
		let progress = 0;
		const interval = setInterval(() => {
			progress += Math.random() * 15 + 5;
			if (progress > 100) progress = 100;
			progressFill.style.width = progress + '%';

			if (progress >= 100) {
				clearInterval(interval);
			}
		}, 100);

		this.bootContent.scrollTop = this.bootContent.scrollHeight;
	}

	private calculateScreenDimensions(): { width: number, height: number, left: number, top: number } {
		const distance = 10;

		const cam = App3D.scene.getCameraByName("fieldCamera");

		const visibleHeight = 2 * Math.tan(cam?.fov / 2) * distance;

		const canvasWidth = document.documentElement.clientWidth;
		const canvasHeight = document.documentElement.clientHeight;
		const aspectRatio = canvasWidth / canvasHeight;
		const visibleWidth = visibleHeight * aspectRatio;

		//const width = canvasWidth;
		//const height = canvasHeight;
		const width = (visibleWidth + 0.01) * 100;
		const height = visibleHeight * 100;

		return {
			width,
			height,
			left: -width / 2,
			top: -height / 2
		};
	}

	private updateElementDimensions(): void {
		const dimensions = this.calculateScreenDimensions();

		if (this.ref.exempleDiv.html) {
			this.ref.exempleDiv.html.style.width = `${dimensions.width}px`;
			this.ref.exempleDiv.html.style.height = `${dimensions.height}px`;
			this.ref.exempleDiv.html.style.left = `${dimensions.left}px`;
			this.ref.exempleDiv.html.style.top = `${dimensions.top}px`;
		}
	}

	private startBootSequence(): void {
		this.messageIndex = 0;
		this.isEclipseMode = false;

		this.ref.notif.value = 'Boot Status: Initializing...';
		this.ref.popup.value = 'Progress: 0%';

		if (this.bootContent) {
			this.bootContent.innerHTML = '';
		}

		this.bootTimeoutId = setTimeout(() => this.typeBootMessage(), 1000) as any;
	}

	private stopBootSequence(): void {
		if (this.bootTimeoutId) {
			clearTimeout(this.bootTimeoutId);
			this.bootTimeoutId = null;
		}
	}
	private handleLogin(e: Event): void {
		e.preventDefault();
		const form = e.target as HTMLFormElement;

		this.ref.notif.value = 'Authentication Successful';
		this.ref.popup.value = 'Status: Access Granted';

		const statusItems = document.querySelectorAll('.status-item');
		statusItems.forEach(item => {
			if (item.textContent?.includes('STATUS')) {
				item.textContent = 'STATUS: AUTHENTICATED';
				item.classList.remove('warning');
				item.classList.add('active');
			}
		});

		const commandLine = document.querySelector('.command-line');
		if (commandLine) {
			commandLine.textContent = 'access_granted - initializing_3d_interface';
		}

		setTimeout(() => {
			this.animateLoginOut();
		}, 1500);
	}

	private animateLoginOut(): void {
		const loginContent = this.ref.exempleDiv.html.querySelector('#login-content') as HTMLDivElement;

		if (loginContent) {
			loginContent.classList.add('glitch-out');

			setTimeout(() => {
				loginContent.classList.add('hidden');

				App3D.setCSS3dObjectEnable(this.ref.exempleDiv.id, false);
				App3D.setVue('main_interface');

				this.ref.notif.value = '3D Interface Loaded - Welcome';
				this.ref.popup.value = 'Status: 3D Active';

			}, 2000);
		}
	}


	private showLoginPage(): void {
		if (this.bootContent) {
			this.bootContent.classList.add('hidden');
		}

		const loginContent = this.ref.exempleDiv.html.querySelector('#login-content') as HTMLDivElement;
		if (loginContent) {
			loginContent.classList.remove('hidden');
		}

		const windowBar = this.div.querySelector('.window-bar');
		if (windowBar) {
			windowBar.textContent = 'Eclipse Terminal - Login';
		}

		const loginForm = this.ref.exempleDiv.html.querySelector('#loginForm') as HTMLFormElement;
		if (loginForm && !loginForm.dataset.listenerAdded) {
			loginForm.addEventListener('submit', (e) => this.handleLogin(e));
			loginForm.dataset.listenerAdded = 'true';
		}

		this.ref.notif.value = 'Login Required - Enter Credentials';
		this.ref.popup.value = 'Status: Awaiting Login';
	}

	public load(param: URLSearchParams): void {
		document.head.appendChild(this.css);
		App3D.setVue((this.state ? "exemple1" : "exemple2"));
		App3D.setCSS3dObjectEnable(this.ref.exempleDiv.id, true);

		this.startBootSequence();
		//this.showLoginPage();
	}

	public unload(): void {
		this.stopBootSequence();

		App3D.setCSS3dObjectEnable(this.ref.exempleDiv.id, false);
		this.css.remove();
	}
}
