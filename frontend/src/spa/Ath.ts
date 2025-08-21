import { Popup } from "./Popup";
import { cdnRequest, meRequest, patchRequest, postRequest } from "./requests";
import { User } from "./User";

interface athHtmlReference {
	menu: HTMLDivElement,
	setting: HTMLInputElement,
	quit: HTMLInputElement,
	notifDiv: HTMLDivElement,
	popup: HTMLInputElement,
	notif: HTMLInputElement
}


class Ath {
	private div: HTMLDivElement;
	private ref: athHtmlReference;
	private css: HTMLElement;

	private quit: AthQuit;
	private setting: AthSetting;
	// private notifs: AthNotifications;

	private loaded = false;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			menu: div.querySelector("#menu") as HTMLDivElement,
			setting: div.querySelector("#setting-btn") as HTMLInputElement,
			quit: div.querySelector("#quit-btn") as HTMLInputElement,
			notifDiv: div.querySelector("#notif") as HTMLDivElement,
			popup: div.querySelector("#popup-input") as HTMLInputElement,
			notif: div.querySelector("#notif-input") as HTMLInputElement,
		}
		this.css = div.querySelector("link") as HTMLElement;

		this.quit = new AthQuit(div);
		this.setting = new AthSetting(div);

		this.ref.setting.addEventListener('click', () => {
			this.setting.load();
		})


		this.ref.quit.addEventListener("click", () => {
			this.quit.load();
		})



		// this.ref.settingEdit.addEventListener("click", () => { //FOR Username
		// })


		console.log("USER", User);
	}

	public load(params: URLSearchParams) {
		if (this.loaded) { return; }
		document.head.appendChild(this.css);
		document.body.appendChild(this.ref.menu);
		this.loaded = true;
	}

	public async unload() {
		this.ref.menu.remove();
		this.loaded = false;
	}

	// private settingUpdate() {
	// 	if (this.avatarChange) {
	// 		const body = new FormData();
	// 		body.append('avatar', this.ref.avatarChange.files[0]);
	// 		patchRequest("update-info/avatar", body, false)
	// 			.then(() => {
	// 				this.ref.settingEdit.toggleAttribute("off", true);
	// 				this.avatarChange = false;
	// 				meRequest()
	// 					.then(() => { console.log(User) })
	// 					.catch((err) => { console.log(err) })
	// 				cdnRequest(User.avatar as string)
	// 					.then((json) => { console.log(json) })
	// 					.catch((err) => { console.log(err) })
	// 			})
	// 			.catch(() => {
	// 				console.error("Error changing avatar");
	// 			})
	// 	}
	// }
}

interface notifsHtmlReference {
	friendRequest: HTMLInputElement,
	gameInvite: HTMLInputElement
}

// class AthNotifications {
// 	private div: HTMLDivElement;
// 	private ref: notifsHtmlReference;

// 	constructor (div: HTMLDivElement) {
// 		this.div = div.querySelector("#notif") as HTMLDivElement;

// 		this.ref = {

// 		}


// 	}
// }

interface quitHtmlReference {
	quitY: HTMLInputElement,
	quitN: HTMLInputElement,
}

class AthQuit {
	private div: HTMLDivElement;
	private ref: quitHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div.querySelector("#quit-window") as HTMLDivElement;

		this.ref = {
			quitY: div.querySelector("#quit-yes") as HTMLInputElement,
			quitN: div.querySelector("#quit-no") as HTMLInputElement,
		}

		this.ref.quitY.addEventListener("click", () => {
			postRequest("auth/logout", {})
				.then(() => { window.location.reload() })
				.catch(() => { window.location.reload() })
		})

		this.ref.quitN.addEventListener("click", () => {
			this.unload();
		})
	}

	public load() {
		Popup.addPopup(this.div);
	}

	public unload() {
		Popup.removePopup();
	}
}


interface settingHtmlReference {
	username: HTMLInputElement,
	twofa: HTMLInputElement,
	password: HTMLInputElement,
	editUsername: HTMLInputElement,
	editAvatar: HTMLInputElement,
	avatarImg: HTMLImageElement,
	avatarChange: HTMLInputElement,
	passwordWindow: HTMLDivElement,
	passwordInput: HTMLInputElement,
	passwordSubmit: HTMLInputElement,
	passwordChangeWindow: HTMLDivElement,
	passwordOls: HTMLInputElement,
	passwordNew: HTMLInputElement,
	passwordChangeSubmit: HTMLInputElement,
	twofaWindow: HTMLDivElement,
	twofaInput: HTMLInputElement,
	twofaSubmit: HTMLInputElement

}

enum verifyState {
	username,
	password,
	twofa
}

class AthSetting {
	private div: HTMLDivElement;
	private ref: settingHtmlReference;

	private state!: verifyState;

	constructor(div: HTMLDivElement) {
		this.div = div.querySelector("#setting-window") as HTMLDivElement;

		this.ref = {
			username: div.querySelector("#username-change") as HTMLInputElement,
			twofa: div.querySelector("#twofa-change") as HTMLInputElement,
			password: div.querySelector('#password-change') as HTMLInputElement,
			editUsername: div.querySelector("#username-edit") as HTMLInputElement,
			editAvatar: div.querySelector("#avatar-edit") as HTMLInputElement,
			avatarImg: div.querySelector("#avatar-img") as HTMLImageElement,
			avatarChange: div.querySelector("#avatar-change") as HTMLInputElement,
			passwordWindow: div.querySelector("#password-window") as HTMLDivElement,
			passwordInput: div.querySelector("#password-input") as HTMLInputElement,
			passwordSubmit: div.querySelector("#password-submit") as HTMLInputElement,
			passwordChangeWindow: div.querySelector("#password-change-window") as HTMLDivElement,
			passwordOls: div.querySelector("#password-old-input") as HTMLInputElement,
			passwordNew: div.querySelector("#password-new-input") as HTMLInputElement,
			passwordChangeSubmit: div.querySelector("#password-change-submit") as HTMLInputElement,
			twofaWindow: div.querySelector("#twofa-window") as HTMLDivElement,
			twofaInput: div.querySelector("#twofa-input") as HTMLInputElement,
			twofaSubmit: div.querySelector("#twofa-submit") as HTMLInputElement
		}

		this.ref.avatarChange.addEventListener('change', () => {
			this.ref.avatarImg.src = URL.createObjectURL(this.ref.avatarChange.files[0]);
			this.ref.editAvatar.removeAttribute('off');
		})

		this.ref.editAvatar.addEventListener("click", () => {
			alert("fix cdn");
		})

		this.ref.username.addEventListener("keydown", () => {
			this.ref.editUsername.removeAttribute("off");
		})

		this.ref.editUsername.addEventListener("click", () => {
			this.state = verifyState.username;
			//this.setVerifyPopup();
		})


	}

	public load() {
		this.ref.username.value = User.username as string;
		this.ref.twofa.value = (User.twofa as number > 0 ? "2FA Enabled" : "2FA Disabled");
		this.ref.editUsername.toggleAttribute("off", true);
		this.ref.editAvatar.toggleAttribute("off", true);
		Popup.addPopup(this.div);
	}

	public unload() {
		Popup.removePopup();
	}

	//private setVerifyPopup() {
	//	switch (this.state) {
	//		case verifyState.username: {
	//			this.ref.passwordInput.value = "";
	//			Popup.addPopup(this.ref.passwordWindow);
	//			break;
	//		}
	//		case verifyState.password: {
	//			break;
	//		}
	//	}
	//}


}

export default Ath;
