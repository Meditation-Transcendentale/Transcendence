import { User } from "../User";
import { postRequest } from "../networking/request";

export class Ath {

	container!: HTMLDivElement;
	profileSection!: HTMLDivElement;
	profileImage!: HTMLImageElement;
	trigger!: HTMLSpanElement;
	dropdown!: HTMLDivElement;
	isOpen: boolean = false;

	constructor() {

		this.container = document.createElement("div");
		this.container.id = "ath-container";
		this.setupContainerStyles();

		this.profileSection = document.createElement("div");
		this.profileSection.id = "ath-profile-section";
		this.setupProfileSectionStyles();

		this.profileImage = document.createElement("img");
		this.profileImage.id = "ath-profile-image";
		this.profileImage.src = User.avatar || "default_avatar.jpg";
		this.setupProfileImageStyles();

		this.trigger = document.createElement("span");
		this.trigger.id = "ath-trigger";
		this.trigger.innerText = `${User.username || "User"}`;
		this.setupTriggerStyles();

		this.dropdown = document.createElement("div");
		this.dropdown.id = "ath-dropdown";
		this.setupDropdownStyles();
		this.createMenuItems();
		
		this.profileSection.appendChild(this.trigger);
		this.profileSection.appendChild(this.profileImage);
		this.container.appendChild(this.profileSection);
		this.container.appendChild(this.dropdown);

		this.setupEventListeners();

	}

	private setupContainerStyles() {
		this.container.style.position = "fixed";
		this.container.style.top = "10px";
		this.container.style.right = "10px";
		this.container.style.zIndex = "1000";
		this.container.style.fontFamily = "Arial, sans-serif";
	}

	private setupProfileSectionStyles() {
		this.profileSection.style.display = "flex";
		this.profileSection.style.alignItems = "center";
		this.profileSection.style.gap = "8px";
		this.profileSection.style.backgroundColor = "rgba(255, 192, 203, 0.8)";
		this.profileSection.style.padding = "6px";
		this.profileSection.style.borderRadius = "25px";
		this.profileSection.style.cursor = "pointer";
		this.profileSection.style.transition = "all 0.2s ease";
		this.profileSection.style.border = "1px solid rgba(255, 255, 255, 0.3)";
	}

	private setupProfileImageStyles() {
		this.profileImage.style.width = "32px";
		this.profileImage.style.height = "32px";
		this.profileImage.style.borderRadius = "50%";
		this.profileImage.style.objectFit = "cover";
		this.profileImage.style.border = "2px solid rgba(255, 255, 255, 0.5)";
		this.profileImage.style.flexShrink = "0";
		this.profileImage.style.pointerEvents = "none";
	}

	private setupTriggerStyles() {
		this.trigger.style.fontSize = "12px";
		this.trigger.style.color = "white";
		this.trigger.style.userSelect = "none";
		this.trigger.style.pointerEvents = "none";
		this.trigger.style.fontWeight = "500";
		this.trigger.style.whiteSpace = "nowrap";
	}

	private setupDropdownStyles() {
		this.dropdown.style.position = "absolute";
		this.dropdown.style.top = "100%";
		this.dropdown.style.right = "0";
		this.dropdown.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
		this.dropdown.style.border = "1px solid rgba(0, 0, 0, 0.2)";
		this.dropdown.style.borderRadius = "5px";
		this.dropdown.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
		this.dropdown.style.minWidth = "150px";
		this.dropdown.style.overflow = "hidden";
		this.dropdown.style.transform = "translateY(-10px)";
		this.dropdown.style.opacity = "0";
		this.dropdown.style.visibility = "hidden";
		this.dropdown.style.transition = "all 0.3s ease";
		this.dropdown.style.marginTop = "5px";
	}
		

	private createMenuItems() {
		const menuItems = [
			{ text: "Profile", action: () => console.log(User) },
			{ text: "Parameters", action: () => console.log(User.username) },
			{ text: "Quit", action: () => this.quitFunction() }
		];

		menuItems.forEach((item, index) => {
			const menuItem = document.createElement("div");
			menuItem.textContent = item.text;
			menuItem.style.padding = "10px 15px";
			menuItem.style.fontSize = "13px";
			menuItem.style.color = "#333";
			menuItem.style.cursor = "pointer";
			menuItem.style.borderBottom = index < menuItems.length - 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none";
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
		this.trigger.innerText = `${User.username || "User"}`;
		this.profileSection.style.backgroundColor = "rgba(255, 192, 203, 1)";
		
		this.dropdown.style.visibility = "visible";
		this.dropdown.style.opacity = "1";
		this.dropdown.style.transform = "translateY(0)";
	}

	private close() {
		this.isOpen = false;
		this.trigger.innerText = `${User.username || "User"}`;
		this.profileSection.style.backgroundColor = "rgba(255, 192, 203, 0.8)";
		this.profileSection.style.transform = "scale(1)";
		
		this.dropdown.style.visibility = "hidden";
		this.dropdown.style.opacity = "0";
		this.dropdown.style.transform = "translateY(-10px)";
	}

	public updateProfileInfo() {
		const currentUsername = User.username || "User";
		const currentAvatar = User.avatar || "default_avatar.jpg";
		
		this.trigger.innerText = `${currentUsername}`;
		this.profileImage.src = currentAvatar;
	}

	public load() {
		document.body.appendChild(this.container);
		this.updateProfileInfo();
	}

	public unload() {
		this.container.remove();
	}


	private quitFunction() {
		postRequest("auth/logout", {})
				.then(() => { window.location.reload() })
				.catch(() => { window.location.reload() })
	}
}
