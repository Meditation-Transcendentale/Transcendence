import { postRequest } from "../networking/request";
import { User } from "../User";
import { htmlManager } from "./HtmlManager";
import { Popup, PopupType } from "./Popup";

export class Ath {

	private css!: HTMLLinkElement;

	private container!: HTMLDivElement;
	private profileSection!: HTMLDivElement;
	private profileImage!: HTMLImageElement;
	private trigger!: HTMLSpanElement;
	private dropdown!: HTMLDivElement;


	private isOpen: boolean = false;

	private _loaded = false;

	constructor() {

		this.container = document.createElement("div");
		this.container.id = "ath-container";

		this.profileSection = document.createElement("div");
		this.profileSection.id = "ath-profile-section";

		this.profileImage = document.createElement("img");
		this.profileImage.id = "ath-profile-image";
		this.profileImage.src = "/cdn/default_avatar.jpg";
		// this.setupProfileImageStyles();

		this.trigger = document.createElement("span");
		this.trigger.id = "ath-trigger";
		this.trigger.innerText = "User";
		// this.setupTriggerStyles();

		this.dropdown = document.createElement("div");
		this.dropdown.id = "ath-dropdown";
		// this.setupDropdownStyles();
		this.createMenuItems();

		this.profileSection.appendChild(this.trigger);
		this.profileSection.appendChild(this.profileImage);
		this.container.appendChild(this.profileSection);
		this.container.appendChild(this.dropdown);

		this.setupEventListeners();

		// this.settings = new athSettings(this);

		this.css = document.createElement("link");
		this.css.rel = "stylesheet";
		this.css.href = "../../css/ath2.css";
		document.head.appendChild(this.css);
	}

	private createMenuItems() {
		const menuItems = [
			{ text: "Profile", action: () => htmlManager.profile.load(User.uuid) },
			{ text: "Settings", action: () => htmlManager.settings.load() },
			{ text: "Logout", action: () => this.quitFunction() }
		];

		menuItems.forEach((item) => {
			const menuItem = document.createElement("div");
			menuItem.id = `ath-menu-item-${item.text.toLowerCase()}`;
			menuItem.textContent = item.text;
			menuItem.style.padding = "10px 15px";
			menuItem.style.fontSize = "14px";
			menuItem.style.color = "#dda8fc";
			menuItem.style.cursor = "pointer";
			menuItem.style.transition = "background-color 0.2s ease";


			menuItem.addEventListener("click", () => {
				item.action();
				this.close();
			});

			this.dropdown.appendChild(menuItem);
		});
	}

	private setupEventListeners() {
		this.profileSection.addEventListener("click", (e) => {
			e.stopPropagation();
			this.toggle();
		});

		document.addEventListener("click", (e) => {
			this.close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && this.isOpen) {
				this.close();
			}
		});
	}

	private toggle() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	private open() {
		this.isOpen = true;
		this.dropdown.style.visibility = "visible";
		this.dropdown.style.opacity = "1";
		this.dropdown.style.transform = "translateY(0)";
	}

	private close() {
		this.isOpen = false;
		this.profileSection.style.transform = "scale(1)";
		this.dropdown.style.visibility = "hidden";
		this.dropdown.style.opacity = "0";
		this.dropdown.style.transform = "translateY(-10px)";
	}

	public updateProfileInfo() {
		this.trigger.innerText = User.username;
		this.profileImage.src = User.avatar;
	}

	private async initProfile() {
		this.trigger.innerText = User.username;
		this.profileImage.src = User.avatar;
	}

	public load() {
		this.initProfile();
		if (this._loaded)
			return;
		this._loaded = true;
		document.body.appendChild(this.container);
	}

	public unload() {
		this._loaded = false;
		this.container.remove();
	}

	private quitFunction() {

		const quitPopup = new Popup({
			type: PopupType.accept,
			title: "Logout",
			id: "logout-popup",
			text: "Are you sure you want to logout ?",
			accept: () => {
				postRequest("auth/logout", {})
					.then(() => { window.location.reload() })
					.catch(() => { window.location.reload() })
			},
			decline: () => { }
		});
		quitPopup.show();
	}
}


