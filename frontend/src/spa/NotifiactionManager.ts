class NotificationManagerC {
	private container: HTMLDivElement;
	private defaultDiv: HTMLDivElement;

	private defaultDuration = 1000; //in millisecond

	private canceled!: Array<HTMLElement>;
	private state = false;

	private hover = false;

	constructor() {
		this.container = document.createElement("div");
		this.container.id = "notification-container";

		this.defaultDiv = document.createElement("div");
		this.defaultDiv.className = "notification";

		this.container.addEventListener("mouseenter", () => {
			this.canceled = new Array<HTMLElement>;
			this.hover = true;
		})

		this.container.addEventListener("mouseleave", () => {
			for (let i = 0; i < this.canceled.length; i++) {
				setTimeout(() => {
					if (this.hover) {
						this.canceled.push(this.canceled[i]);
					} else {
						this.canceled[i]?.remove();
					}
				}, this.defaultDuration)
			}
			this.hover = false;
		})

	}

	public addDiv() {

	}

	public setEnable(state: boolean) {
		if (state && !this.state) {
			document.body.appendChild(this.container);
		} else if (!state && this.state) {
			this.container.remove();
		}
		this.state = state;
	}

	public addText(str: string) {
		const n = this.defaultDiv.cloneNode() as HTMLDivElement;
		n.innerText = str;
		n.style.setProperty("--duration", `${this.defaultDuration + 10}ms`)
		this.container.insertBefore(n, this.container.firstChild);
		setTimeout(() => {
			if (this.hover) {
				this.canceled.push(n);
			} else {
				n.remove();
			}
		}, this.defaultDuration)
	}

}

export const NotifiactionManager = new NotificationManagerC();
