import { User } from "../User";
import { patchRequest, postRequest, deleteRequest } from "../networking/request";
import { Popup, PopupType } from "./Popup";

export class Ath {

	private container!: HTMLDivElement;
	private profileSection!: HTMLDivElement;
	private profileImage!: HTMLImageElement;
	private trigger!: HTMLSpanElement;
	private dropdown!: HTMLDivElement;

    private settings: athSettings;
    
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
		this.profileImage.src = "default_avatar.jpg";
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

        this.settings = new athSettings();

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

// changer de Username
// Changer de mdp
// changer d avatar
// Activer 2fa || desactiver 2fa

class athSettings {

    private settingsPopup: Popup;
    private changeUsernamePopup!: Popup;
    private changePasswordPopup!: Popup;
    private updateTwoFAPopup!: Popup;
    private twoFAQrCodePopup!: Popup;

    private qrCodeSrc: string = "";
    private twoFAEnabled: boolean = false;

    constructor() { 

        console.log("twofa:", this.twoFAEnabled);
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
                    .then((json) => { User.check(), this.changeUsernamePopup.close() })
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
                    .then((json) => { User.check(), this.changePasswordPopup.close() })
                    .catch((err) => { })
                console.log("Change Password to:", input, "with password:", password, "and token:", token);
            },
            abort: () => {
                console.log("Change Password aborted");
            }
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
    
    private handle2FAToggle(password: string, token?: string) {

        
        
        
        if (this.twoFAEnabled) {
            deleteRequest("update-info/disable-2fa", { password, token })
            .then((json: any) => {User.check(), this.updateTwoFAPopup.close(), this.twoFAEnabled = false; })
            .catch((err: any) => { err.json() })
            
        } else {
            postRequest("update-info/enable-2fa", { password })
            .then((json: any) => {
                this.qrCodeSrc = json.qrCode,
                this.twoFAQrCodePopup = new Popup({
                    type: PopupType.custom,
                    title: "Scan this QR code with your authenticator app.",
                    div: this.createQrCodeDiv()
                });
                this.twoFAQrCodePopup.show(), 
                User.check(), 
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
        // const base64 = (this.qrCodeSrc as string).substring("data:image/png;base64,".length)
		// this.qrCodeSrc = "data:image/png;base64," + base64;;        
        img.src = this.qrCodeSrc;
        img.alt = "2FA QR Code";
        img.style.width = "150px";
        img.style.height = "150px";

        div.appendChild(img);

        return div;
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

        const toggle2FABtn = document.createElement("button");
        toggle2FABtn.textContent = "Enable/Disable 2FA";

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
            console.log("Change Avatar Clicked");
        });

        toggle2FABtn.addEventListener("click", () => {
            this.updateTwoFAPopup.show();
            console.log("Toggle 2FA Clicked");
        });

        div.appendChild(changeUsernameBtn);
        div.appendChild(changePasswordBtn);
        div.appendChild(changeAvatarBtn);
        div.appendChild(toggle2FABtn);
        
        return div;
    }
    
    public load () {
        this.twoFAEnabled = User.twofa === 1;
        this.settingsPopup.show();

    }
    
    public unload () {
        console.log("unload ath settings");
    }

    

}
