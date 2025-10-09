import { get } from "http";
import { patchRequest, postRequest, deleteRequest, avatarRequest, getRequest } from "../networking/request";
import { Popup, PopupType } from "./Popup";

class classicStatsC {

	public gamesPlayed!: number;
	public gamesWined!: number;
	public gamesLoosed!: number;
	public winRate!: number;
	public bestWinStreak!: number;
	public goalsScored!: number;
	public goalsConceded!: number;

	constructor() {
		this.check();
	}

	public check(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			console.log("check classic stats");
			postRequest("stats/player", { uuid: User.uuid, mode: "classic" })
				.then((json: any) => {
					console.log("classicStats.ts -> postRequest stats/player", json);
					this.gamesPlayed = json.playerStats.stats.game_played;
					this.gamesWined = json.playerStats.stats.wins;
					this.gamesLoosed = json.playerStats.stats.losses;
					this.winRate = json.playerStats.stats.win_rate;
					this.bestWinStreak = json.playerStats.stats.best_win_streak;
					this.goalsScored = json.playerStats.stats.goals_scored;
					this.goalsConceded = json.playerStats.stats.goals_conceded;
					resolve(true);
				})
				.catch((err) => {
					reject(new Error(err));
				})
		})
	}
}

class UserC {
	public username!: string;
	public avatar!: string;
	public status!: string;
	public uuid!: string;
	public twofa!: number;

	public classicStats!: classicStatsC;
	
	constructor() {
	}
	
	public async init() {
		await this.check();
		this.classicStats = new classicStatsC();
	}
	
	public check(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			console.log("check User");
			getRequest("info/me", "no-cache")
				.then((json: any) => {
					console.log("User.ts -> getRequest info/me", json);
					this.username = json.userInfo.username;
					this.uuid = json.userInfo.uuid;
					this.status = json.userInfo.status;
					this.twofa = json.userInfo.two_fa_enabled;
					this.avatar = json.userInfo.avatar_path;
					resolve(true);
				})
				.catch((err) => {
					reject(new Error("not authentifiated User"));
				})
			})
	}
}
const User = new UserC();
User.init();

export class Ath {

	private container!: HTMLDivElement;
	private profileSection!: HTMLDivElement;
	private profileImage!: HTMLImageElement;
	private trigger!: HTMLSpanElement;
	private dropdown!: HTMLDivElement;

	private settings: athSettings;
	private profile: athProfile;
		
	private isOpen: boolean = false;

	constructor() {

		this.container = document.createElement("div");
		this.container.id = "ath-container";
		this.setupContainerStyles();

		this.profileSection = document.createElement("div");
		this.profileSection.id = "ath-profile-section";
		this.setupProfileSectionStyles();

		this.profileImage = document.createElement("img");
		this.profileImage.id = "ath-profile-image";
		this.profileImage.src = "https://localhost:3002/cdn/default_avatar.jpg";
		this.setupProfileImageStyles();

		this.trigger = document.createElement("span");
		this.trigger.id = "ath-trigger";
		this.trigger.innerText = "User";
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

		this.settings = new athSettings(this);
		this.profile = new athProfile(this);

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
			{ text: "Profile", action: () => this.profile.load() },
			{ text: "Settings", action: () => this.settings.load() },
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

	// private getUserInfo() {
	// 	getRequest("player/info", "no-cache")
	// 		.then((json: any) => {
	// 			User.username = json.data.username;
	// 			User.avatar = json.data.avatar;
	// 			User.status = json.data.status;
	// 			User.uuid = json.data.uuid;
	// 			User.twofa = json.data.twofa;
	// 		})
	// }

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
		const currentAvatar = User.avatar || "https://localhost:3002/cdn/default_avatar.jpg";

		console.log("Updating profile info:", currentUsername, currentAvatar);
		
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

		const quitPopup = new Popup({
			type: PopupType.accept,
			title: "Logout",
			text: "Are you sure you want to logout?",
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

class athSettings {

	private settingsPopup: Popup;
	private changeUsernamePopup!: Popup;
	private changePasswordPopup!: Popup;
	private changeAvatarPopup!: Popup;
	private updateTwoFAPopup!: Popup;
	private twoFAQrCodePopup!: Popup;

	private toggle2FABtn: HTMLButtonElement;
	private qrCodeSrc: string = "";
	private twoFAEnabled: boolean = false;
	private athInstance: Ath;

	constructor(athInstance: Ath) { 

		this.athInstance = athInstance;
		console.log("twofa:", this.twoFAEnabled);

		this.toggle2FABtn = document.createElement("button");

		this.settingsPopup = new Popup({
			type: PopupType.custom,
			title: "Settings",
			text: "",
			div: this.createSettingsDiv()
		});

		this.changeUsernamePopup = new Popup({
			type: PopupType.validation,
			title: "Change Username",
			input: "username",
			submit: (password: string, token?: string, input?: string) => {
				patchRequest("update-info/username", { username: input, password: password, token: token })
					.then(async (json) => { await User.check(), this.changeUsernamePopup.close() })
					.catch((err) => { })
				console.log("Change Username to:", input, "with password:", password, "and token:", token);
			},
			abort: () => {
				console.log("Change Username aborted");
			}
		});

		this.changePasswordPopup = new Popup({
			type: PopupType.validation,
			title: "Change Password",
			input: "password",
			submit: (password: string, token?: string, input?: string) => {
				patchRequest("update-info/password", { newPassword: input, password: password, token: token })
					.then(async (json) => { await User.check(), this.changePasswordPopup.close() })
					.catch((err) => { })
				console.log("Change Password to:", input, "with password:", password, "and token:", token);
			},
			abort: () => {
				console.log("Change Password aborted");
			}
		});

		this.changeAvatarPopup = new Popup({
			type: PopupType.custom,
			title: "Change Avatar",
			div: this.createAvatarDiv()
		});

		this.updateTwoFAPopup = new Popup({
			type: PopupType.validation,
			title: "Update 2FA",
			submit: (password: string, token?: string, input?: string) => {
				this.handle2FAToggle(password, token);
				console.log("Update 2FA with password:", password, "and token:", token);
			},
			abort: () => {
				console.log("Update 2FA aborted");
			}
		});
	}
		
	private createAvatarDiv(): HTMLDivElement {
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.gap = "10px";

		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";

		const previewImg = document.createElement("img");
		previewImg.style.width = "100px";
		previewImg.style.height = "100px";
		previewImg.style.objectFit = "cover";
		previewImg.style.borderRadius = "50%";
		previewImg.style.marginBottom = "10px";
		
		fileInput.addEventListener("change", () => {
			const file = fileInput.files ? fileInput.files[0] : null;

			const url = file ? URL.createObjectURL(file) : "https://localhost:3002/cdn/default_avatar.jpg";
			previewImg.src = url;
			
			div.appendChild(previewImg);
		});

		const uploadBtn = document.createElement("button");
		uploadBtn.textContent = "Upload";

		uploadBtn.addEventListener("click", () => {
			const file = fileInput.files ? fileInput.files[0] : null;
			if (file) {
				const formData = new FormData();
				formData.append("avatar", file);

				avatarRequest("update-info/avatar", formData)
					.then(async (json) => {
						await User.check();
						if (this.athInstance) {
							this.athInstance.updateProfileInfo();
						}
						this.changeAvatarPopup.close();
					})
					.catch((err) => { })
			}
		});

		div.appendChild(fileInput);
		div.appendChild(uploadBtn);

		return div;
	}

	private handle2FAToggle(password: string, token?: string) {

		if (this.twoFAEnabled) {
			deleteRequest("update-info/disable-2fa", { password, token })
			.then(async (json: any) => {
				this.toggle2FABtn.textContent = "Enable 2FA",
				await User.check(), 
				this.updateTwoFAPopup.close(), 
				this.twoFAEnabled = false; })
			.catch((err: any) => { err.json() })
			
		} else {
			postRequest("update-info/enable-2fa", { password })
			.then(async (json: any) => {
				this.qrCodeSrc = json.qrCode,
				this.twoFAQrCodePopup = new Popup({
					type: PopupType.custom,
					title: "Scan this QR code with your authenticator app.",
					div: this.createQrCodeDiv()
				});
				this.twoFAQrCodePopup.show(), 
				await User.check(), 
				this.toggle2FABtn.textContent = "Disable 2FA",
				this.updateTwoFAPopup.close(), 
				this.twoFAEnabled = true; })
			.catch((err: any) => { err.json() })
		}

	}

	private createQrCodeDiv(): HTMLDivElement {
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.alignItems = "center";
		div.style.gap = "10px";

		const img = document.createElement("img");
		img.src = this.qrCodeSrc;
		img.alt = "2FA QR Code";
		img.style.width = "150px";
		img.style.height = "150px";

		div.appendChild(img);

		return div;
	}

	private update2FAButton() {
		if (this.twoFAEnabled)
			this.toggle2FABtn.textContent = "Disable 2FA";
		else
			this.toggle2FABtn.textContent = "Enable 2FA";
	}
		
	private createSettingsDiv(): HTMLDivElement {
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.gap = "10px";

		const changeUsernameBtn = document.createElement("button");
		changeUsernameBtn.textContent = "Change Username";

		const changePasswordBtn = document.createElement("button");
		changePasswordBtn.textContent = "Change Password";

		const changeAvatarBtn = document.createElement("button");
		changeAvatarBtn.textContent = "Change Avatar";

		changeUsernameBtn.addEventListener("click", () => {
			this.changeUsernamePopup.show();
			console.log("Change Username Clicked");
		});

		changePasswordBtn.addEventListener("click", () => {
			this.changePasswordPopup.show();
			console.log("Change Password Clicked");
		});

		changeAvatarBtn.addEventListener("click", () => {
			this.changeAvatarPopup.show();
			console.log("Change Avatar Clicked");
		});

		this.toggle2FABtn.addEventListener("click", () => {
			this.updateTwoFAPopup.show();
			console.log("Toggle 2FA Clicked");
		});

		div.appendChild(changeUsernameBtn);
		div.appendChild(changePasswordBtn);
		div.appendChild(changeAvatarBtn);
		div.appendChild(this.toggle2FABtn);
		
		return div;
	}
		
	public load () {
		this.twoFAEnabled = User.twofa === 1;
		this.update2FAButton();
		this.settingsPopup.show();

	}
		
	public unload () {
		this.settingsPopup.close();
		console.log("unload ath settings");
	}
}

class athProfile {
	private athInstance: Ath;


	private div!: HTMLDivElement;
	private statsDiv!: HTMLDivElement;
	private profileImg!: HTMLImageElement;
	private usernameElem!: HTMLHeadingElement;
	private statusElem!: HTMLParagraphElement;
	private profilePopup: Popup;
	
	private classicTable!: HTMLTableElement;
	
	// private gamesPlayedClassicTd!: HTMLTableCellElement;
	// private gamesWinedClassicTd!: HTMLTableCellElement;
	// private gamesLoosedClassicTd!: HTMLTableCellElement;
	// private winRateClassicTd!: HTMLTableCellElement;
	// private bestWinStreakClassicTd!: HTMLTableCellElement;
	// private goalsScoredClassicTd!: HTMLTableCellElement;
	// private goalsConcededClassicTd!: HTMLTableCellElement;
	
	private classicTdElements!: { [key: string]: HTMLTableCellElement };
	
	
	constructor(athInstance: Ath) {
		this.athInstance = athInstance;
		
		this.classicTdElements = {};
		
		this.createProfileDiv();

		this.profilePopup = new Popup({
			type: PopupType.custom,
			title: "",
			div: this.div
		});
	}
	
	private createProfileDiv() {
		this.div = document.createElement("div");
		this.div.style.display = "flex";
		this.div.style.flexDirection = "column";
		this.div.style.alignItems = "center";
		this.div.style.gap = "10px";

		this.profileImg = document.createElement("img");
		this.profileImg.alt = "Profile Image";
		this.profileImg.style.width = "100px";
		this.profileImg.style.height = "100px";
		this.profileImg.style.objectFit = "cover";
		this.profileImg.style.borderRadius = "50%";

		this.usernameElem = document.createElement("h2");

		this.statusElem = document.createElement("p");
		this.statusElem.style.fontSize = "12px";

		this.createStatDiv();
		// this.getPlayerClassicStats();

		this.div.appendChild(this.usernameElem);
		this.div.appendChild(this.profileImg);
		this.div.appendChild(this.statusElem);
		this.div.appendChild(this.statsDiv);
	}

	private async getPlayerClassicStats() {

		await User.classicStats.check()
			.then(() => {this.updateClassicStatsTable(User.classicStats) })
			.catch((err) => { });
	}

	private updateClassicStatsTable(stats: any) {

		if (!stats) return;

		this.classicTdElements["Game Played"].textContent = stats.gamesPlayed;
		this.classicTdElements["Wined"].textContent = stats.gamesWined;
		this.classicTdElements["Loosed"].textContent = stats.gamesLoosed;
		this.classicTdElements["Win Rate"].textContent = stats.winRate + "%";
		this.classicTdElements["Best Win Streak"].textContent = stats.bestWinStreak;
		this.classicTdElements["Goals Scored"].textContent = stats.goalsScored;
		this.classicTdElements["Goals Conceded"].textContent = stats.goalsConceded;
	}

	private createStatDiv() {
		
		const classicPlayerStatsName = ["Game Played", "Wined", "Loosed", "Win Rate", "Best Win Streak", "Goals Scored", "Goals Conceded"];
		const brPlayerStatsName = ["Game Played", 'Wined', "Win Rate", "Beast Placement", "Average Placement"];
		
		this.statsDiv = document.createElement("div");
		this.statsDiv.id = "profile-stats";
		this.statsDiv.style.display = "flex";
		this.statsDiv.style.flexDirection = "column";
		this.statsDiv.style.gap = "5px";
		this.statsDiv.style.marginTop = "10px";

		this.classicTable = document.createElement("table");
		this.classicTable.id = "classic-stats";
		this.classicTable.style.width = "100%";
		this.classicTable.style.borderCollapse = "collapse";
		this.classicTable.style.marginTop = "10px";

		const classicHeader = document.createElement("thead");

		classicPlayerStatsName.forEach(statName => {
			const classicHeaderCell = document.createElement("tr");
			const classicValuesCell = document.createElement("tr");
			this.classicTdElements[statName] = document.createElement("td");

			classicValuesCell.appendChild(this.classicTdElements[statName]);
			classicHeaderCell.textContent = statName;
			classicHeaderCell.style.border = "1px solid black";
			classicHeader.appendChild(classicHeaderCell);
			classicHeader.appendChild(classicValuesCell);
		});






		this.classicTable.appendChild(classicHeader);
		this.statsDiv.appendChild(this.classicTable);
	}

	private updateProfileInfo() {
		User.check();
		this.profileImg.src = User.avatar || "https://localhost:3002/cdn/default_avatar.jpg";
		this.usernameElem.textContent = User.username || "User";
		this.statusElem.textContent = `Status: ${User.status || "offline"}`;
		this.statusElem.style.color = User.status === "online" ? "green" : User.status === "offline" ? "orange" : "red";
	}


	public load() {
		this.updateProfileInfo();
		this.getPlayerClassicStats();
		this.profilePopup.show();
		console.log("load ath profile");
	}

	public unload() {
		this.profilePopup.close();
		console.log("unload ath profile");
	}
}

// class athStat {

// 	private athInstance: Ath;

// 	private div!: HTMLDivElement;

// 	constructor( athInstance: Ath) {
		
// 		this.athInstance = athInstance;
// 		this.createStatDiv();
	
// 	}

// 	private createStatDiv() {
// 		this.div = document.createElement("div");
// 		this.div.style.display = "flex";
// 		this.div.style.flexDirection = "column";
// 		this.div.style.gap = "5px";
// 		this.div.style.marginTop = "10px";
		

	
// 	}


// 	load() {

// 	}
	
// 	unload() {
// 	}

// }

